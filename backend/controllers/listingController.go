package controllers

import (
	"gymday/initializers"
	"gymday/models"
	"net/http"
	"log"
	"github.com/gin-gonic/gin"
	decimal "github.com/shopspring/decimal"
	"path/filepath"
	"gymday/utils"
	"github.com/google/uuid"
	"fmt"
	"strings"
	"strconv"
)

func CreateListing(c *gin.Context) {
    println(string(c.Request.Header.Get("Content-Type")))

	var body struct {
		ImageAmount int
		Title       string
		Description string
		Price       string
		Location    string
		City        string
		Private     bool
		Tags		string
	}

	user, _ := c.Get("user")
	userID := user.(models.User).ID

	c.Bind(&body)
	log.Println(c.Request.MultipartForm)

	realprice, _ := decimal.NewFromString(body.Price)

	listing := models.Listing{
		Title:       body.Title,
		Description: body.Description,
		Price:    realprice,
		Location: body.Location,
		City:     body.City,
		Private:  body.Private,
		UserID:   userID,
	}

	initializers.DB.Create(&listing)

	Tags := strings.SplitN(body.Tags, ",", -1)

	log.Println(body.ImageAmount)

	for _, tag := range Tags {
		var listingTag models.ListingTag
		listingTag.ListingID = listing.ID
		listingTag.Name = tag
		initializers.DB.Create(&listingTag)
	}

	for i := 1; i <= body.ImageAmount; i++ {
		var fullfilename string = ""
		file, err := c.FormFile("file" + fmt.Sprint(i))
		if err != nil {
			log.Println(err)
			log.Println("no file found")
		} else {
			blobFile, err := file.Open()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"file open error": err.Error(),
				})
				return
			}
			randomfilename := uuid.New().String()
			extension := filepath.Ext(file.Filename)
			prefix := "https://storage.googleapis.com/tapsaveevents.appspot.com/imagestore/"
			fullfilename = prefix + randomfilename + extension
	
			result := utils.UploadImage(blobFile, randomfilename, extension)
		
			if result != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"upload error": err.Error(),
				})
				return
			}
		}

		var listingImage models.ListingImage
		listingImage.ImageURL = fullfilename
		listingImage.ListingID = listing.ID
		listingImage.ImageNR = i
		initializers.DB.Create(&listingImage)
	}	

	c.JSON(http.StatusOK, gin.H{
		"listing": listing,
	})
}


func UpdateListing(c *gin.Context) {

	id := c.Param("id")
	var body struct {
		Title       string
		Description string
		Price       string
		Location    string
		City        string
		Private     bool
		ImageAmount int
		ImagesToBeDeleted string
		Tags		string
	}
	
	user, _ := c.Get("user")
	userID := user.(models.User).ID

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}

	realprice, _ := decimal.NewFromString(body.Price)

	var listing models.Listing
	initializers.DB.Where("user_id = ?", userID).First(&listing, id)

	if listing.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Listing not found",
		})
		return
	}

	listing.Title = body.Title
	listing.Description = body.Description
	listing.Price = realprice
	listing.Location = body.Location
	listing.City = body.City
	listing.Private = body.Private
	listing.UserID = userID

	Tags := strings.SplitN(body.Tags, ",", -1)

	initializers.DB.Where("listing_id = ?", id).Delete(&models.ListingTag{})

	for _, tag := range Tags {
		var listingTag models.ListingTag
		listingTag.ListingID = listing.ID
		listingTag.Name = tag
		initializers.DB.Create(&listingTag)
	}

	log.Println("dsasadas", body.ImagesToBeDeleted)
	to_be_deleted := strings.SplitN(body.ImagesToBeDeleted, ",", -1)

	for _, imageID := range to_be_deleted {
		int_imageID, _ := strconv.Atoi(imageID)
		initializers.DB.Where("id = ?", int_imageID).Delete(&models.ListingImage{})
	}


	for i := 1; i <= body.ImageAmount; i++ {
		var fullfilename string = ""
		file, err := c.FormFile("file" + fmt.Sprint(i))
		if err != nil {
			log.Println("no file found")
		} else {
			blobFile, err := file.Open()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"file open error": err.Error(),
				})
				return
			}
			randomfilename := uuid.New().String()
			extension := filepath.Ext(file.Filename)
			prefix := "https://storage.googleapis.com/tapsaveevents.appspot.com/imagestore/"
			fullfilename = prefix + randomfilename + extension
	
			log.Println(fullfilename)

			result := utils.UploadImage(blobFile, randomfilename, extension)
		
			if result != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"upload error": err.Error(),
				})
				return
			}
		}
		var listingImage models.ListingImage
		// initializers.DB.Where("listing_id = ? AND image_nr = ?", id, i).First(&listingImage)
		if listingImage.ImageURL != fullfilename {
			listingImage.ImageURL = fullfilename
			listingImage.ListingID = listing.ID
			listingImage.ImageNR = 3
			initializers.DB.Save(&listingImage)
		}
	}	

	initializers.DB.Save(&listing)

	c.JSON(http.StatusOK, gin.H{
		"listing": listing,
	})

}

func DeleteListing(c *gin.Context) {

	id := c.Param("id")
	var listing models.Listing

	user, _ := c.Get("user")
	userID := user.(models.User).ID

	initializers.DB.Where("user_id = ?", userID).First(&listing, id)
	if listing.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Listing not found",
		})
		return
	}

	initializers.DB.Delete(&listing)
	// delete images
	initializers.DB.Where("listing_id = ?", id).Delete(&models.ListingImage{})
	// delete reviews
	initializers.DB.Where("listing_id = ?", id).Delete(&models.Review{})
	// delete bookings
	// todo

	c.JSON(http.StatusOK, gin.H{
		"succes": "listing deleted",
	})

}

func GetListings(c *gin.Context) {

	var listings []models.Listing

	tag := c.Param("tag")

	// base query
	query := initializers.DB.Preload("User").Preload("Tags").Preload("Images")
	// add tag to query
	if tag != "none" {
		query = query.Joins("JOIN listing_tags on listing_tags.listing_id = listings.id AND listing_tags.name = ?", tag)
	}	
	// count amount of reviews and calculate average rating
	query = query.Select("listings.*, count(reviews.id) as amount_of_reviews, avg(reviews.rating) as average_rating").Joins("left join reviews on reviews.listing_id = listings.id").Group("listings.id")

	// order by a combination of the amount of reviews and the average rating
	query = query.Order("amount_of_reviews desc, average_rating desc")
	

	// execute query and check for errors
    if err := query.Find(&listings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "No listings found or there is an error.",
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"listings": listings,
	})

}


func GetListingsByUser(c *gin.Context) {
		
	userID := c.Param("id")
	var listings []models.Listing

	initializers.DB.Preload("Images").Preload("Tags").Where("user_id = ?", userID).Order("created_at desc").Find(&listings)

	c.JSON(http.StatusOK, gin.H{
		"listings": listings,
	})
}


func GetListingsBySearch(c *gin.Context) {

	query := c.Param("query")

	var listings []models.Listing
	
	initializers.DB.Joins("left join users on users.id = listings.user_id").Preload("User").Preload("Tags").Preload("Images").Where("concat(city, country, province, title, users.first_name) like ?", "%"+query+"%").Find(&listings)

	c.JSON(http.StatusOK, gin.H{
		"listings": listings,
	})

}


func GetListing(c *gin.Context) {
	id := c.Param("id")

	var listing models.Listing

	initializers.DB.Preload("User").Preload("Tags").Preload("Images").Preload("Reviews.User").First(&listing, id)

	c.JSON(http.StatusOK, gin.H{
		"listing": listing,
	})

}

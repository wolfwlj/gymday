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
)


func CreateListing(c *gin.Context) {

	var body struct {
		Title       string
		Description string
		Price       string
		Location    string
		City        string
		Province    string
		Country     string
		Private     bool
	}

	user, _ := c.Get("user")
	userID := user.(models.User).ID

	c.Bind(&body)

	realprice, _ := decimal.NewFromString(body.Price)

	listing := models.Listing{
		Title:       body.Title,
		Description: body.Description,
		Price:    realprice,
		Location: body.Location,
		City:     body.City,
		Province: body.Province,
		Country:  body.Country,
		Private:  body.Private,
		UserID:   userID,
	}

	initializers.DB.Create(&listing)

	// loop over 5 images
	for i := 1; i <= 5; i++ {
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
			prefix := "https://gymdayfilestore.s3.eu-central-1.amazonaws.com/"
			fullfilename = prefix + randomfilename + extension
	
			result := utils.UploadImage(blobFile, randomfilename + extension)
		
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
		Province    string
		Country     string
		Private     bool
		Images      []models.ListingImage
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
	listing.Province = body.Province
	listing.Country = body.Country
	listing.Private = body.Private
	listing.UserID = userID

	for i := 1; i <= 5; i++ {
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
			prefix := "https://gymdayfilestore.s3.eu-central-1.amazonaws.com/"
			fullfilename = prefix + randomfilename + extension
	
			result := utils.UploadImage(blobFile, randomfilename + extension)
		
			if result != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"upload error": err.Error(),
				})
				return
			}
		}

		var listingImage models.ListingImage
		initializers.DB.Where("listing_id = ? AND image_nr = ?", id, i).First(&listingImage)

		if listingImage.ImageURL != fullfilename {
			listingImage.ImageURL = fullfilename
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
		"listing": listing,
	})

}


func GetListings(c *gin.Context) {

	var listings []models.Listing

	initializers.DB.Preload("User").Preload("Images").Find(&listings)

	c.JSON(http.StatusOK, gin.H{
		"listings": listings,
	})

}


func GetListingsByUser(c *gin.Context) {
		
	userID := c.Param("id")
	var listings []models.Listing


	initializers.DB.Preload("Images").Where("user_id = ?", userID).Order("created_at desc").Find(&listings)

	c.JSON(http.StatusOK, gin.H{
		"listings": listings,
	})
}


func GetListingsBySearch(c *gin.Context) {

	query := c.Param("query")

	var listings []models.Listing
	
	initializers.DB.Joins("left join users on users.id = listings.user_id").Preload("User").Preload("Images").Where("concat(city, country, province, title, users.first_name) like ?", "%"+query+"%").Find(&listings)

	c.JSON(http.StatusOK, gin.H{
		"listings": listings,
	})

}


func GetListing(c *gin.Context) {
	id := c.Param("id")

	var listing models.Listing

	initializers.DB.Preload("User").Preload("Images").Preload("Reviews.User").First(&listing, id)

	c.JSON(http.StatusOK, gin.H{
		"listing": listing,
	})

}

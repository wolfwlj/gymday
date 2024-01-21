package controllers

import (
	"github.com/gin-gonic/gin"
	"gymday/initializers"
	"gymday/models"
	"net/http"
)


func CreateListing(c *gin.Context) {

	var body struct {
		Title       string
		Description string
		Price       float64
		Location    string
		City        string
		Province    string
		Country     string
		Images      []models.ListingImage
	}

	user, _ := c.Get("user")
	userID := user.(models.User).ID

	c.Bind(&body)

	// realprice, _ := strconv.ParseFloat(body.Price, 64)
	listing := models.Listing{
		Title:       body.Title,
		Description: body.Description,
		// Price: realprice,
		Price:    body.Price,
		Location: body.Location,
		City:     body.City,
		Province: body.Province,
		Country:  body.Country,
		UserID:   userID,
	}

	initializers.DB.Create(&listing)

	for _, image := range body.Images {

		var listingImage models.ListingImage
		listingImage.ImageURL = image.ImageURL
		listingImage.ListingID = listing.ID
		listingImage.ImageNR = image.ImageNR
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
		Price       float64
		Location    string
		Images      []string
		UserID      uint
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}

	var listing models.Listing
	initializers.DB.First(&listing, id)

	listing.Title = body.Title
	listing.Description = body.Description
	listing.Price = body.Price
	listing.Location = body.Location
	listing.UserID = body.UserID

	for i, image := range body.Images {

		var listingImage models.ListingImage
		listingImage.ListingID = listing.ID
		initializers.DB.First(&listingImage, listingImage.ID)
		listingImage.ImageNR = i + 1
		listingImage.ImageURL = image
		initializers.DB.Save(&listingImage)

	}

	initializers.DB.Save(&listing)

	c.JSON(http.StatusOK, gin.H{
		"listing": listing,
	})

}


func DeleteListing(c *gin.Context) {

	id := c.Param("id")
	var listing models.Listing

	initializers.DB.First(&listing, id)
	initializers.DB.Delete(&listing)

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


func GetListingsBySearch(c *gin.Context) {

	query := c.Param("query")

	var listings []models.Listing

	initializers.DB.Preload("User").Preload("Images").Where("concat(city, country, province) like ?", "%"+query+"%").Find(&listings)

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

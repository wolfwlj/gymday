package controllers

import (
	"gymday/initializers"
	"gymday/models"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	// decimal "github.com/shopspring/decimal"
)


func CreateBooking(c *gin.Context) {

	var body struct {
		StartDate   string
		ListingID   string
	}
	
	c.Bind(&body)

	user, _ := c.Get("user")
	log.Println(user)

	userID := user.(models.User).ID


	listingid, err3 := strconv.Atoi(body.ListingID)
	if err3 != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Listing ID not found",
		})
		return
	}

	var listing models.Listing
	initializers.DB.First(&listing, listingid)

	booking := models.Booking{
		Title:       listing.Title,
		Price:    listing.Price,
		StartDate: body.StartDate,
		EndDate: body.StartDate,
		UserID:   userID,
		ListingID: uint(listingid),
		Status: "Pending",
	}

	initializers.DB.Create(&booking)

	c.JSON(http.StatusOK, gin.H{
		"booking": booking,
	})
}

func GetBookings(c *gin.Context) {
	
	user, _ := c.Get("user")

	userID := user.(models.User).ID

	var bookings []models.Booking
	// get bookings from listings that belong to the user. This requires a join
	initializers.DB.Joins("JOIN listings ON listings.id = bookings.listing_id").Preload("User").Where("listings.user_id = ?", userID).Find(&bookings)
	// initializers.DB.Where("user_id = ?", userID).Find(&bookings)

	c.JSON(http.StatusOK, gin.H{
		"bookings": bookings,
	})
}
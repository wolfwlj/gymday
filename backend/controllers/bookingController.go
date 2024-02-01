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


func ManualCreateBooking(c *gin.Context) {

	var body struct {
		FirstName   string
		LastName   string
		Email   string
		Phone   string
		StartDate   string
		EndDate   string
		ListingID   string
	}
	
	c.Bind(&body)

	log.Println(body.ListingID)

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
		FirstName: body.FirstName,
		LastName: body.LastName,
		Email: body.Email,
		Phone: body.Phone,
		Title:       listing.Title,
		Price:    listing.Price,
		StartDate: body.StartDate,
		EndDate: body.EndDate,
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
	initializers.DB.Joins("JOIN listings ON listings.id = bookings.listing_id").Preload("User").Where("listings.user_id = ?", userID).Order("start_date DESC").Find(&bookings)
	// initializers.DB.Where("user_id = ?", userID).Find(&bookings)

	c.JSON(http.StatusOK, gin.H{
		"bookings": bookings,
	})
}


func UpdateBooking(c *gin.Context) {

	var body struct {
		Status   string
	}
	
	c.Bind(&body)
	user, _ := c.Get("user")
	userID := user.(models.User).ID

	bookingID := c.Param("id")

	var booking models.Booking
	initializers.DB.First(&booking, bookingID)

	//check if user is the owener of the liting that the booking belongs to
	
	initializers.DB.Joins("JOIN listings ON listings.id = bookings.listing_id").Preload("User").Where("listings.user_id = ?", userID).Find(&booking)

	// this means that the user is not the owner of the listing that the booking belongs to. so security error i geuss.
	// someone messing with the frontend to try to update a booking that they dont own
	if booking.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Booking not found",
		})
		return
	}

	booking.Status = body.Status

	initializers.DB.Save(&booking)

	c.JSON(http.StatusOK, gin.H{
		"booking": booking,
	})
}
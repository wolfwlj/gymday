package controllers

import (
	"gymday/initializers"
	"gymday/models"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	decimal "github.com/shopspring/decimal"
)


func CreateBooking(c *gin.Context) {

	var body struct {
		Title       string
		Price       string
		StartDate   string
		EndDate     string
		ListingID   string
	}
	
	c.Bind(&body)

	user, err := c.Get("user")
	if err {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User not found",
		})
		return
	}

	userID := user.(models.User).ID

	realprice, err2 := decimal.NewFromString(body.Price)
	if err2 != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Price not found",
		})
		return
	}

	listingid, err3 := strconv.Atoi(body.ListingID)
	if err3 != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Listing ID not found",
		})
		return
	}

	booking := models.Booking{
		Title:       body.Title,
		Price:    realprice,
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
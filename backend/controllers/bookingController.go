package controllers

import (
	"gymday/initializers"
	"gymday/models"
	"net/http"

	"github.com/gin-gonic/gin"
	decimal "github.com/shopspring/decimal"
)


func CreateBooking(c *gin.Context) {

	var body struct {
		Title       string
		Price       string
		StartDate string
		EndDate string
		ListingID uint
	}
	c.Bind(&body)

	user, _ := c.Get("user")
	userID := user.(models.User).ID
	var Status string = "Pending"
	realprice, _ := decimal.NewFromString(body.Price)

	booking := models.Booking{
		Title:       body.Title,
		Price:    realprice,
		StartDate: body.StartDate,
		EndDate: body.EndDate,
		UserID:   userID,
		ListingID: body.ListingID,
		Status: Status,
	}

	initializers.DB.Create(&booking)

	c.JSON(http.StatusOK, gin.H{
		"booking": booking,
	})
}
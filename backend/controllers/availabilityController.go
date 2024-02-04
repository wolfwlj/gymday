package controllers

import (
	"gymday/initializers"
	"gymday/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	// decimal "github.com/shopspring/decimal"
)


func CreateTimeSlot(c *gin.Context) {

	var body struct {
		Title   string
		StartDate   string
		EndDate   string
	}
	
	c.Bind(&body)

	user, _ := c.Get("user")
	log.Println(user)

	userID := user.(models.User).ID

	var timeslot models.Timeslot

	timeslot = models.Timeslot{
		Title:       body.Title,
		StartDate: body.StartDate,
		EndDate: body.EndDate,
		Available: true,
		OwnerID: userID,
	}

	initializers.DB.Create(&timeslot)

	c.JSON(http.StatusOK, gin.H{
		"timeslot": timeslot,
	})
}

func GetTimeSlotsByUserOwner(c *gin.Context) {

	startDate := c.Param("startdate")
	endDate := c.Param("enddate")

	user, _ := c.Get("user")

	OwnerID := user.(models.User).ID
	log.Println(startDate, endDate, OwnerID)

	var timeslots []models.Timeslot

	initializers.DB.Find(&timeslots, "owner_id = ? AND start_date >= ? AND end_date <= ?", OwnerID, startDate, endDate)

	c.JSON(http.StatusOK, gin.H{
		"timeslots": timeslots,
	})
}
func GetTimeSlotsByUserClient(c *gin.Context) {
	startDate := c.Param("startdate")
	endDate := c.Param("enddate")

	user, _ := c.Get("user")

	userID := user.(models.User).ID

	var timeslots []models.Timeslot

	initializers.DB.Find(&timeslots, "user_id = ? AND start_date >= ? AND end_date <= ?", userID, startDate, endDate)

	c.JSON(http.StatusOK, gin.H{
		"timeslots": timeslots,
	})
}
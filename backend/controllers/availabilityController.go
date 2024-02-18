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
		StartTime   string
		EndTime   string
	}
	
	c.Bind(&body)

	combinedStartDate := body.StartDate + " " + body.StartTime
	combinedEndDate := body.StartDate + " " + body.EndTime

	user, _ := c.Get("user")
	log.Println(user)

	userID := user.(models.User).ID

	var timeslot models.Timeslot

	timeslot = models.Timeslot{
		Title:       body.Title,
		StartDate: combinedStartDate,
		EndDate: combinedEndDate,
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

func UpdateTimeSlot(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		Title   string
		StartDate   string
		StartTime   string
		EndTime   string
	}

	c.Bind(&body)

	combinedStartDate := body.StartDate + " " + body.StartTime
	combinedEndDate := body.StartDate + " " + body.EndTime

	var timeslot models.Timeslot

	check := initializers.DB.First(&timeslot, id)

	if check.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Timeslot not found",
		})
		return
	}
	


	timeslot.Title = body.Title
	timeslot.StartDate = combinedStartDate
	timeslot.EndDate = combinedEndDate
	timeslot.Available = true

	initializers.DB.Save(&timeslot)

	c.JSON(http.StatusOK, gin.H{
		"timeslot": timeslot,
	})
}

func DeleteTimeSlot(c *gin.Context) {
	id := c.Param("id")

	var timeslot models.Timeslot

	initializers.DB.First(&timeslot, id)

	initializers.DB.Delete(&timeslot)

	c.JSON(http.StatusOK, gin.H{
		"timeslot": timeslot,
	})
}

func FillTimeSlot(UserID uint, BookingID uint, TimeSlotID uint) (error) {
	var timeslot models.Timeslot

	initializers.DB.First(&timeslot, TimeSlotID)

	timeslot.UserID = &UserID
	timeslot.BookingID = &BookingID
	timeslot.Available = false

	err := initializers.DB.Save(&timeslot)

	if err.Error != nil {
		return err.Error
	}
	return nil
}
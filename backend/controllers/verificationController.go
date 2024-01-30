package controllers

import (
	"gymday/initializers"
	"gymday/models"
	"log"

	"github.com/gin-gonic/gin"
)


func CreateVerificationRequest(c *gin.Context) {
	log.Println("CreateVerificationRequest")

	var body struct {
		Reason string `gorm:"type:text"`
	}
	c.Bind(&body)
	log.Println(body.Reason)

	userauth, _ := c.Get("user")
	user := userauth.(models.User)
	
	verificationRequest := models.VerificationRequest{
		Status: "pending",
		Reason: body.Reason,
		UserID: user.ID,
	}

	initializers.DB.Create(&verificationRequest)

	c.JSON(200, gin.H{
		"verificationRequest": verificationRequest,
	})
}


func GetVerificationRequest(c *gin.Context) {
	
	id := c.Param("id")

	var verificationRequest models.VerificationRequest

	initializers.DB.First(&verificationRequest, "id = ?", id)
	// check for error

	if verificationRequest.ID == 0 {
		c.JSON(404, gin.H{
			"error": "VerificationRequest not found",
		})
		return
	}
	

	c.JSON(200, gin.H{
		"verificationRequest": verificationRequest,
	})
}


func UpdateVerificationRequest(c *gin.Context) {
	
	id := c.Param("id")

	var verificationRequest models.VerificationRequest

	initializers.DB.First(&verificationRequest, "id = ?", id)
	// check for error

	if verificationRequest.ID == 0 {
		c.JSON(404, gin.H{
			"error": "VerificationRequest not found",
		})
		return
	}

	var body struct {
		Status string `gorm:"type:text"`
		Reply string `gorm:"type:text"`
	}
	c.Bind(&body)

	verificationRequest.Status = body.Status
	verificationRequest.Reply = body.Reply

	initializers.DB.Save(&verificationRequest)

	if verificationRequest.Status == "approved" {
		// update the user to tier 99

		var user models.User

		initializers.DB.First(&user, "id = ?", verificationRequest.UserID)
		// check for error

		if user.ID == 0 {
			c.JSON(404, gin.H{
				"error": "User not found",
			})
			return
		}

		user.Tier = 99

		initializers.DB.Save(&user)
	} else if verificationRequest.Status == "rejected" {
		// update the user to tier 1

		var user models.User

		initializers.DB.First(&user, "id = ?", verificationRequest.UserID)

		if user.ID == 0 {
			c.JSON(404, gin.H{
				"error": "User not found",
			})
			return
		}

		user.Tier = 1

		initializers.DB.Save(&user)
	}


	// send email if approved
	// send email if rejected

	c.JSON(200, gin.H{
		"verificationRequest": verificationRequest,
	})
}

func GetVerificationRequests(c *gin.Context) {
	
	var verificationRequests []models.VerificationRequest

	// where := "status = ?"
	// whereArgs := "pending"

	initializers.DB.Preload("User").Where("status = ?", "pending").Limit(10).Find(&verificationRequests)

	c.JSON(200, gin.H{
		"verificationrequests": verificationRequests,
	})
}
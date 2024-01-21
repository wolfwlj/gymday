package controllers
// router.GET("/trainers", controllers.GetTrainers)
// router.GET("/trainers/:id", controllers.GetTrainer)
// router.POST("/trainers", middleware.UserAuth, controllers.CreateTrainer)
// router.PUT("/trainers/:id", middleware.UserAuth, controllers.UpdateTrainer)
// router.DELETE("/trainers/:id", middleware.UserAuth, controllers.DeleteTrainer)	

import (
	"net/http"
	"gymday/initializers"
	"gymday/models"

	"github.com/gin-gonic/gin"
)	


func GetTrainers(c *gin.Context) {
	var trainers []models.Trainer
	
	initializers.DB.Find(&trainers)
	
	c.JSON(http.StatusOK, gin.H{
		"trainers": trainers,
	})

}


func GetTrainer(c *gin.Context) {
	
	id := c.Param("id")

	var trainer models.Trainer

	initializers.DB.First(&trainer, id)

	if trainer.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Trainer not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"trainer": trainer,
	})

}


func CreateTrainer(c *gin.Context) {
	var body struct {
		BusinessPhoneNumber string 
		BusinessEmail string 
		TrainerImageURL string 
	}

	user, _ := c.Get("user")
	userID := user.(models.User).ID

	if c.Bind(&body) != nil {
		
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}

	trainer := models.Trainer{
		BusinessPhoneNumber: body.BusinessPhoneNumber,
		BusinessEmail: body.BusinessEmail,
		TrainerImageURL: body.TrainerImageURL,
		UserID: userID,
	}

	initializers.DB.Create(&trainer)

	c.JSON(http.StatusOK, gin.H{
		"trainer": trainer,
	})

}


func UpdateTrainer(c *gin.Context) {

	id := c.Param("id")

	var body struct {
		BusinessPhoneNumber string 
		BusinessEmail string 
		TrainerImageURL string 
	}

	user, _ := c.Get("user")
	userID := user.(models.User).ID

	if c.Bind(&body) != nil {
		
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}

	var trainer models.Trainer

	initializers.DB.First(&trainer, id)

	if trainer.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Trainer not found",
		})
		return
	}

	if trainer.UserID != userID {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Not authorized",
		})
		return
	}

	trainer.BusinessPhoneNumber = body.BusinessPhoneNumber
	trainer.BusinessEmail = body.BusinessEmail
	trainer.TrainerImageURL = body.TrainerImageURL

	initializers.DB.Save(&trainer)

	c.JSON(http.StatusOK, gin.H{
		"trainer": trainer,
	})

}


func DeleteTrainer(c *gin.Context) {
	id := c.Param("id")

	var trainer models.Trainer

	initializers.DB.First(&trainer, id)

	if trainer.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Trainer not found",
		})
		return
	}

	user, _ := c.Get("user")
	userID := user.(models.User).ID

	if trainer.UserID != userID {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Not authorized",
		})
		return
	}

	initializers.DB.Delete(&trainer)

	c.JSON(http.StatusOK, gin.H{
		"message": "Trainer deleted",
	})

}
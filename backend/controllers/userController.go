package controllers

import (
	"net/http"
	"gymday/initializers"
	"gymday/models"
	"github.com/gin-gonic/gin"
	"log"
	"path/filepath"
	"gymday/utils"
	"github.com/google/uuid"
)

func GetUser(c *gin.Context) {

	id := c.Param("id")

	var user models.User

	initializers.DB.First(&user, "id = ?", id)
	// check for error

	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}
	

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func UpdateUser(c *gin.Context) {
	
	userauth, _ := c.Get("user")
	user := userauth.(models.User)
	id := user.ID

	if id == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	var body struct {
		FirstName 	  string `gorm:"type:text"`
		LastName  string `gorm:"type:text"`
		Bio string `gorm:"type:text"`
	}
	c.Bind(&body)

	var fullfilename string = ""
	file, err := c.FormFile("file")
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
		prefix := "https://storage.googleapis.com/tapsaveevents.appspot.com/imagestore/"
		fullfilename = prefix + randomfilename + extension

		result := utils.UploadImage(blobFile, randomfilename, extension)
	
		if result != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"upload error": err.Error(),
			})
			return
		}
	}
	user = models.User{FirstName: body.FirstName, LastName: body.LastName, Bio: body.Bio, ProfilePicture: fullfilename}

	initializers.DB.Where("id = ?", id).Updates(&user)

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})

}	

func GetProfileImages(c *gin.Context) {

	id := c.Param("id")

	var user models.User

	initializers.DB.First(&user, id)

	var profileImages []models.ProfileImage

	initializers.DB.Where("user_id = ?", user.ID).Find(&profileImages)

	c.JSON(http.StatusOK, gin.H{
		"profileImages": profileImages,
	})
}

func CreateProfileImage(c *gin.Context) {

	userauth, _ := c.Get("user")
	user := userauth.(models.User)
	id := user.ID

	var body struct {
		ImageURL string `gorm:"type:text"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}

	profileImage := models.ProfileImage{ImageURL: body.ImageURL, UserID: id}

	initializers.DB.Create(&profileImage)

	c.JSON(http.StatusOK, gin.H{
		"profileImage": profileImage,
	})
}

func DeleteProfileImage(c *gin.Context) {
	
	userauth, _ := c.Get("user")
	user := userauth.(models.User)
	id := user.ID

	profileImageID := c.Param("profileImageID")

	var profileImage models.ProfileImage

	initializers.DB.First(&profileImage, profileImageID)

	if profileImage.UserID != id {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	initializers.DB.Delete(&profileImage)

	c.JSON(http.StatusOK, gin.H{
		"message": "Profile image deleted",
	})
}


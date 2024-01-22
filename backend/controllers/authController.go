package controllers

import (
	// "fmt"
	"log"
	// mrand "math/rand"
	"net/http"
	"os"
	"gymday/initializers"
	"gymday/models"
	// "strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	// "github.com/thanhpk/randstr"
	"golang.org/x/crypto/bcrypt"
	// "gopkg.in/gomail.v2"
)


func Signup(c *gin.Context) {

	var body struct {
		Email      string
		Password   string 
		FirstName 	  string `gorm:"type:text"`
		LastName  string `gorm:"type:text"`
		PhoneNumber string `gorm:"type:text"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}

	//Find the user by email
	var checkexist models.User

	initializers.DB.First(&checkexist, "email= ?", body.Email)
	//Check if the user exists

	if checkexist.ID != 0 {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Een account met dit emailadres bestaat al",
		})
		return
	}

	//has password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}
	//Create a new user

	user := models.User{
		Email:      body.Email,
		Password:   string(hash),
		FirstName:  body.FirstName,
		LastName:   body.LastName,
		PhoneNumber: body.PhoneNumber,
	}
	//Save the user to the database
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
		return
	}
	//Send a response with the user data
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}


func Login(c *gin.Context) {

	var body struct {
		Email string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}

	//Find the user by email
	var user models.User

	initializers.DB.First(&user, "email= ?", body.Email)
	//Check if the user exists

	if user.ID == 0 {
		log.Println("User not found")

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Verkeerde email of wachtwoord",
		})
		return
	}

	//Check if the password is correct
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		log.Println("Wachtwoord is niet correct")

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Verkeerde email of wachtwoord",
		})
		return
	}

	//jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to sign token",
		})
		return
	}

	//Send a response with the user data
	c.SetSameSite(http.SameSiteNoneMode)
	//secure flag moet true staan voor production, false zodat je het kan testen in postman

	c.SetCookie("gymdaytoken", tokenString, 3600*24*30, "", "", true, true)

	c.JSON(http.StatusOK, gin.H{
		"user":   user,
		"cookie" : tokenString,
		"message" : "Logged in successfully",
	},
	)

}


func Validate(c *gin.Context) {

	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"user": user,
		"message": "Validated successfully",
	})

}


func Logout(c *gin.Context) {
	c.SetSameSite(http.SameSiteNoneMode)

	c.SetCookie("gymdaytoken", "", -1, "", "", true, true)
	c.JSON(http.StatusOK, gin.H{

		"message": "Logged out successfully",
	})
}



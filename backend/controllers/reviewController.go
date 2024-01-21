package controllers


import (
	"net/http"
	"gymday/initializers"
	"gymday/models"
	"strconv"
	"github.com/gin-gonic/gin"
)


func GetReviews(c *gin.Context) {

	listingid := c.Param("id")
	
	var reviews []models.Review
	
	initializers.DB.Where("listing_id = ?", listingid).Find(&reviews)
	
	c.JSON(http.StatusOK, gin.H{
		"reviews": reviews,
	})

}


func GetReview(c *gin.Context) {
	id := c.Param("id")
	var review models.Review
	initializers.DB.First(&review, id)
	c.JSON(http.StatusOK, gin.H{
		"review": review,
	})
}


func CreateReview(c *gin.Context) {
	var body struct {
		Body string 
		Rating string
		ListingID   string
	}

	user, _ := c.Get("user")
	userID := user.(models.User).ID

	c.Bind(&body) 
	
	ratingtoint, _  := strconv.Atoi(body.Rating)
	jemoeder, _  :=   strconv.Atoi(body.ListingID)
	listingidtoint := uint(jemoeder)
	// to unint 

	review := models.Review{
		Body: body.Body,
		ListingID: listingidtoint,
		Rating: ratingtoint,
		UserID: userID,
	}

	initializers.DB.Create(&review)

	c.JSON(http.StatusOK, gin.H{
		"review": review,
	})
}


func UpdateReview(c *gin.Context) {

	user, _ := c.Get("user")
	userID := user.(models.User).ID
	id := c.Param("id")

	var body struct {
		Body string 
		Rating int
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse request body",
		})
		return
	}

	review := models.Review{
		Body: body.Body,
		Rating: body.Rating,
	}

	initializers.DB.Model(&review).Where("id = ? AND user_id", id, userID).Updates(&review)

	c.JSON(http.StatusOK, gin.H{
		"review": review,
	})
}


func DeleteReview(c *gin.Context) {

	user, _ := c.Get("user")
	userID := user.(models.User).ID
	id := c.Param("id")

	var review models.Review

	initializers.DB.Where("id = ? AND user_id = ?", id, userID).Delete(&review)

	c.JSON(http.StatusOK, gin.H{
		"review": review,
	})
}
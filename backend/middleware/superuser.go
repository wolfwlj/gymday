package middleware

import (
	"fmt"
	"gymday/initializers"
	"gymday/models"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func SuperUser(c *gin.Context) {

	tokenString, err := c.Cookie("gymdaytoken")
	log.Println(tokenString)
	if err != nil {
		if err == http.ErrNoCookie {

			c.AbortWithStatus(400)
			return
		}
		c.AbortWithStatus(http.StatusForbidden)

		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//check if exp
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		//find user
		var user models.User
		// initializers.DB.First(&user, claims["sub"])
		initializers.DB.First(&user, claims["sub"])

		if user.ID == 0 {
			log.Println("not found")

			c.AbortWithStatus(http.StatusUnauthorized)
		}
		// check if superuser
		if user.Tier != 999 {

			log.Println("not superuser")
			log.Println(user.Tier)
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		//attach to req
		c.Set("user", user)

		//move on
		c.Next()
	} else {
		fmt.Println(err)

		c.AbortWithStatus(http.StatusUnauthorized)
	}

}

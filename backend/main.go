package main

import (
	"gymday/initializers"
	"gymday/routes"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"

)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectDB()
	initializers.SyncDatabase()
}

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://10.0.2.2", "https://gymday.nl", "https://www.gymday.nl"},
		AllowMethods:     []string{"GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type", "X-Requested-With", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	v1 := router.Group("/api/v1")

	{   
		routes.UserRoutes(v1.Group("/user"))
		routes.WarmupRoutes(v1.Group("/_ah"))
	}
	router.Run(":9090") //development
	// router.Run() //production
}


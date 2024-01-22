package routes

import (
	"github.com/gin-gonic/gin"
	"gymday/controllers"
	"gymday/middleware"
)

func UserRoutes(router *gin.RouterGroup) {

	//base user auth
	router.POST("/login",  controllers.Login)
	router.POST("/signup",  controllers.Signup)

	router.GET("/validate", middleware.UserAuth, controllers.Validate)
	router.POST("/logout", middleware.UserAuth, controllers.Logout)

	//user routers
	router.GET("/user/:id", controllers.GetUser)
	router.PUT("/user/:id", middleware.UserAuth, controllers.UpdateUser)


	// profile related
	router.GET("/listingsbyuser/:id", controllers.GetListingsByUser)

	
	//listing routers
	router.GET("/listings", controllers.GetListings)
	router.GET("/listingssearch/:query", controllers.GetListingsBySearch)
	router.GET("/listing/:id", controllers.GetListing)
	router.POST("/listing", controllers.CreateListing)
	router.PUT("/listing/:id", controllers.UpdateListing)
	router.DELETE("/listing/:id", controllers.DeleteListing)

	// review routers
	router.GET("/reviews/:listingid", controllers.GetReviews)
	router.GET("/review/:id", controllers.GetReview)
	router.POST("/review", middleware.UserAuth, controllers.CreateReview)
	router.PUT("/review/:id", middleware.UserAuth, controllers.UpdateReview)
	router.DELETE("/review/:id", middleware.UserAuth, controllers.DeleteReview)

	// trainer routers
	router.GET("/trainers", controllers.GetTrainers)
	router.GET("/trainer/:id", controllers.GetTrainer)
	router.POST("/trainer", middleware.UserAuth, controllers.CreateTrainer)
	router.PUT("/trainer/:id", middleware.UserAuth, controllers.UpdateTrainer)
	router.DELETE("/trainer/:id", middleware.UserAuth, controllers.DeleteTrainer)	
	//

}
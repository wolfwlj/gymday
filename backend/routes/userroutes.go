package routes

import (
	"github.com/gin-gonic/gin"
	"gymday/controllers"
	"gymday/middleware"
)

func UserRoutes(router *gin.RouterGroup) {

	//base user auth
	router.POST("/login",  controllers.Login)
	router.POST("/register",  controllers.Signup)

	router.GET("/validate", middleware.UserAuth, controllers.Validate)
	router.POST("/logout", middleware.UserAuth, controllers.Logout)

	//user routers
	router.GET("/user/:id", controllers.GetUser)
	router.PUT("/user", middleware.UserAuth, controllers.UpdateUser)

	// profile related
	router.GET("/listingsbyuser/:id", controllers.GetListingsByUser)
	router.GET("/profileimages/:id", controllers.GetProfileImages)
	router.POST("/profileimage", middleware.UserAuth, controllers.CreateProfileImage)
	router.DELETE("/profileimage/:id", middleware.UserAuth, controllers.DeleteProfileImage)

	//listing routers
	router.GET("/listings/:tag", controllers.GetListings)
	router.GET("/listingssearch/:query", controllers.GetListingsBySearch)
	router.GET("/listing/:id", controllers.GetListing)
	router.POST("/listing",  middleware.UserAuth, controllers.CreateListing)
	router.PUT("/listing/:id",  middleware.UserAuth, controllers.UpdateListing)
	router.DELETE("/listing/:id",  middleware.UserAuth, controllers.DeleteListing)

	// review routers
	router.GET("/reviews/:id", controllers.GetReviews)
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

	// verification routers
	router.GET("/verificationrequest/:id", controllers.GetVerificationRequest)
	router.GET("/verificationrequests", middleware.SuperUser, controllers.GetVerificationRequests)
	router.POST("/verificationrequest", middleware.UserAuth, controllers.CreateVerificationRequest)
	router.PUT("/verificationrequest/:id", middleware.SuperUser, controllers.UpdateVerificationRequest)

	// booking routers
	router.POST("/booking", middleware.UserAuth, controllers.CreateBooking)
	router.POST("/manualbooking", middleware.UserAuth, controllers.ManualCreateBooking)
	router.GET("/bookings", middleware.UserAuth, controllers.GetBookings)
	router.PUT("/booking/:id", middleware.UserAuth, controllers.UpdateBooking)

	// timeslot routers
	router.POST("/timeslot", middleware.UserAuth, controllers.CreateTimeSlot)
	router.POST("/timeslotfourweeks", middleware.UserAuth, controllers.CreateTimeslotFourWeeks)
	router.GET("/timeslotsbyuserowner/:startdate/:enddate", middleware.UserAuth, controllers.GetTimeSlotsByUserOwner)
	router.GET("/timeslotsbyuserclient/:startdate/:enddate", middleware.UserAuth, controllers.GetTimeSlotsByUserClient)
	router.GET("/availableslots/:ownerid/:startdate/:enddate", controllers.GetAvailableTimeSlots)
	router.GET("/timeslotsbyday/:ownerid/:date", controllers.GetTimeSlotsByDay)
	router.PUT("/timeslot/:id", middleware.UserAuth, controllers.UpdateTimeSlot)
	router.DELETE("/timeslot/:id", middleware.UserAuth, controllers.DeleteTimeSlot)


}
package initializers

import (
	"gymday/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
	// DB.AutoMigrate(&models.Trainer{})
	DB.AutoMigrate(&models.Listing{})
	DB.AutoMigrate(&models.Review{})
	DB.AutoMigrate(&models.ListingImage{})
	DB.AutoMigrate(&models.ListingTag{})
	DB.AutoMigrate(&models.ProfileImage{})
	DB.AutoMigrate(&models.Booking{})
	DB.AutoMigrate(&models.VerificationRequest{})
}

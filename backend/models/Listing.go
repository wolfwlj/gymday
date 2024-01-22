package models

import (
	"gorm.io/gorm"
)



type Listing struct {
	gorm.Model
	Title string `gorm:"type:text"`
	Description string `gorm:"type:text"`
	Price float64 `gorm:"type:float"`
	Location string `gorm:"type:text"`
	Country string `gorm:"type:text"`
	Province string `gorm:"type:text"`
	City string `gorm:"type:text"`
	Public bool `gorm:"type:bool;default:false"`
	Images []ListingImage 
	Reviews []Review 
	UserID uint 
	User User `gorm:"foreignKey:UserID"`
	
}
package models

import (
	"gorm.io/gorm"
	decimal "github.com/shopspring/decimal"

)



type Listing struct {
	gorm.Model
	Title string `gorm:"type:text"`
	Description string `gorm:"type:text"`
	Price decimal.Decimal `gorm:"type:decimal(10,2)"`
	Location string `gorm:"type:text"`
	Country string `gorm:"type:text"`
	Province string `gorm:"type:text"`
	City string `gorm:"type:text"`
	Private bool `gorm:"type:bool;default:false"`
	Images []ListingImage 
	Reviews []Review 
	UserID uint 
	User User `gorm:"foreignKey:UserID"`
	
}
package models

import (
	"gorm.io/gorm"
	decimal "github.com/shopspring/decimal"

)

type Booking struct {
	gorm.Model
	Title string `gorm:"type:text"`
	Price decimal.Decimal `gorm:"type:decimal(10,2)"`
	Status string `gorm:"type:ENUM('Pending', 'Accepted', 'Declined', 'Cancelled', 'Completed');default:'Pending'"`
	StartDate string `gorm:"type:text"`
	EndDate string `gorm:"type:text"`
	UserID uint 
	User User `gorm:"foreignKey:UserID"`
	ListingID uint
	Listing Listing `gorm:"foreignKey:ListingID"`
}
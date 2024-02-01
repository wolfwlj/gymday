package models

import (
	"gorm.io/gorm"
	decimal "github.com/shopspring/decimal"

)

type Booking struct {
	gorm.Model
	// if user does not have a account, here are some fields that can be used
	FirstName string `gorm:"type:text;default:null"`
	LastName string `gorm:"type:text;default:null"`
	Email string `gorm:"type:text;default:null"`
	Phone string `gorm:"type:text;default:null"`
	// ignore the above fields if user has an account
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
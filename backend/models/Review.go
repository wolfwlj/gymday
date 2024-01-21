package models

import (
	"gorm.io/gorm"
)



type Review struct {
	gorm.Model
	Title string `gorm:"type:text"`
	Body string `gorm:"type:text"`
	Rating int
	ListingID uint 
	UserID uint 
	User User `gorm:"foreignKey:UserID"`
}
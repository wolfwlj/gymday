package models

import (
	"gorm.io/gorm"
)

type ListingTag struct {
	gorm.Model
	Name string `gorm:"type:text"`
	ListingID uint
	Listing Listing `gorm:"foreignKey:ListingID"`
}
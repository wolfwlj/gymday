package models

import (
	"gorm.io/gorm"
)

type ListingImage struct {
	gorm.Model
	ImageURL string `gorm:"type:text"`
	ImageNR int
	ListingID uint
	Listing Listing `gorm:"foreignKey:ListingID"`
}
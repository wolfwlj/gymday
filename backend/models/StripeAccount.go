package models


import (
	"gorm.io/gorm"
)


type StripeAccount struct {
	gorm.Model
	UserID uint
	User User `gorm:"foreignKey:UserID"`
	// uniqueIndex for stripe account id
	StripeAccountID string `gorm:"type:text;uniqueIndex"`
	ChargesEnabled bool `gorm:"default:false"`
	TransfersEnabled bool `gorm:"default:false"`
	DetailsSubmitted bool `gorm:"default:false"`
}


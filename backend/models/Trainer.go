package models

import (
	"gorm.io/gorm"
)

type Trainer struct {
	gorm.Model
	BusinessPhoneNumber string `gorm:"type:text"`
	BusinessEmail string `gorm:"type:text"`
	TrainerImageURL string `gorm:"type:text"`
	UserID uint 
	User User `gorm:"foreignKey:UserID"`
}
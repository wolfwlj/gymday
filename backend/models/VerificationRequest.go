package models

import (
	"gorm.io/gorm"
)

type VerificationRequest struct {
	gorm.Model
	Status string `gorm:"type:text"`
	Reason string `gorm:"type:text"`
	Reply string `gorm:"type:text"`
	UserID uint 
	User User `gorm:"foreignKey:UserID"`
}
package models

import (
	"gorm.io/gorm"
)

type ProfileImage struct {
	gorm.Model
	ImageURL string `gorm:"type:text"`
	UserID uint
	User User `gorm:"foreignKey:UserID"`
}
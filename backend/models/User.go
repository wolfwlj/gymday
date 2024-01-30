package models

import (
	"gorm.io/gorm"
)


type User struct {
	gorm.Model
	Email string `gorm:"type:text"`
	Password string `gorm:"type:text" json:"-"`
	FirstName string `gorm:"type:text"`
	LastName string `gorm:"type:text"`
	PhoneNumber string `gorm:"type:text"`
	EmailVerifiedAt string `gorm:"type:text;default:null"`
	Token string `gorm:"type:text;default:null" json:"-"`
	ProfilePicture string `gorm:"type:text;default:null"`
	Bio string `gorm:"type:text;default:null"`
	Tier int `gorm:"default:1"`
	Approved bool `gorm:"default:false"`
}
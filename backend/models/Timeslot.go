package models

import (
	"gorm.io/gorm"

)

type Timeslot struct {
	gorm.Model
	Title string `gorm:"type:text"`
	StartDate string `gorm:"type:text"`
	EndDate string `gorm:"type:text"`
	Available bool `gorm:"type:boolean"`
	BookingID *uint `gorm:"type:integer;default:null"`
	Booking Booking `gorm:"foreignKey:BookingID"`
	UserID *uint `gorm:"type:integer;default:null"`
	User User `gorm:"foreignKey:UserID"`
	OwnerID uint `gorm:"type:integer;default:null"`
	UserOwner User `gorm:"foreignKey:OwnerID"`

}
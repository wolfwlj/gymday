package controllers

import (
	"gymday/initializers"
	"gymday/models"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	decimal "github.com/shopspring/decimal"
)


func CreateBooking(c *gin.Context) {

	var body struct {
		StartDate   string
		ListingID   string
		TimeslotID   int
	}
	
	c.Bind(&body)

	user, _ := c.Get("user")
	log.Println(user)

	getuser := user.(models.User)


	listingid, err3 := strconv.Atoi(body.ListingID)
	if err3 != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Listing ID not found",
		})
		return
	}

	var listing models.Listing
	initializers.DB.First(&listing, listingid)

	booking := models.Booking{
		Title:       listing.Title,
		Price:    listing.Price,
		StartDate: body.StartDate,
		EndDate: body.StartDate,
		UserID:   getuser.ID,
		ListingID: uint(listingid),
		Status: "Pending",
		FirstName: getuser.FirstName,
		LastName: getuser.LastName,
		Email: getuser.Email,
		Phone: getuser.PhoneNumber,

	}

	initializers.DB.Create(&booking)
	// get the booking id
	BookingID := booking.ID
	// now fill the timeslot userId, timeslotid, bookingid
	err, allerror := FillTimeSlot(getuser.ID, BookingID, uint(body.TimeslotID))

	if err != nil || allerror != 1 {
		// delete the booking
		initializers.DB.Delete(&booking)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Timeslot not found",
		})
		return
	}

	// Send email to the owner of the listing
	// send email to the person who made the booking

	c.JSON(http.StatusOK, gin.H{
		"booking": booking,
	})
}


func ManualCreateBooking(c *gin.Context) {

	var body struct {
		FirstName   string
		LastName   string
		Email   string
		Phone   string
		StartDate   string
		EndDate   string
		ListingID   string
	}
	
	c.Bind(&body)
	user, _ := c.Get("user")

	userID := user.(models.User).ID

	listingid, err3 := strconv.Atoi(body.ListingID)
	if err3 != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Listing ID not found",
		})
		return
	}

	var listing models.Listing
	initializers.DB.First(&listing, listingid)

	booking := models.Booking{
		FirstName: body.FirstName,
		LastName: body.LastName,
		Email: body.Email,
		Phone: body.Phone,
		Title:       listing.Title,
		Price:    listing.Price,
		StartDate: body.StartDate,
		EndDate: body.EndDate,
		UserID:   userID,
		ListingID: uint(listingid),
		Status: "Pending",
	}

	initializers.DB.Create(&booking)

	c.JSON(http.StatusOK, gin.H{
			"booking": booking,
	})
}


func GetBookings(c *gin.Context) {
	
	user, _ := c.Get("user")

	userID := user.(models.User).ID



	var bookings []Booking
	// get bookings from listings that belong to the user. This requires a join
	// initializers.DB.Table("bookings").Select("bookings.*, timeslots.start_date as timeslot_start_date, timeslots.end_date as timeslot_end_date").Preload("User").Joins("JOIN listings ON listings.id = bookings.listing_id").Joins("JOIN timeslots ON timeslots.booking_id = bookings.id").Where("listings.user_id = ?", userID).Scan(&bookings)
	// initializers.DB.Select("bookings.*, listings.title as listing_title, timeslots.start_date as timeslot_start_date, timeslots.end_date as timeslot_end_date").Joins("JOIN listings ON listings.id = bookings.listing_id").Joins("JOIN timeslots ON timeslots.booking_id = bookings.id").Preload("User").Where("listings.user_id = ?", userID).Order("start_date DESC").Find(&bookings)
	initializers.DB.Select("bookings.*, listings.title as listing_title, timeslots.start_date as timeslot_start_date, timeslots.end_date as timeslot_end_date").Joins("JOIN listings ON listings.id = bookings.listing_id").Joins("JOIN timeslots ON timeslots.booking_id = bookings.id").Preload("User").Preload("Listing").Where("listings.user_id = ?", userID).Order("start_date DESC").Find(&bookings)
	// initializers.DB.Where("user_id = ?", userID).Find(&bookings)

	// initializers.DB.Preload("Booking.Listing").Preload("User").Where("owner_id = ?", userID).Find(&bookings)

	c.JSON(http.StatusOK, gin.H{
		"bookings": bookings,
	})
}

func GetMyOrders(c *gin.Context){
	// this one is very simple, do same as above but dont check listing. Just check the user id of the booking, the person that placed the order.
	user, _ := c.Get("user")

	userID := user.(models.User).ID

	var bookings []Booking

	initializers.DB.Select("bookings.*, listings.title as listing_title, timeslots.start_date as timeslot_start_date, timeslots.end_date as timeslot_end_date").Joins("JOIN listings ON listings.id = bookings.listing_id").Joins("JOIN timeslots ON timeslots.booking_id = bookings.id").Preload("User").Preload("Listing").Where("bookings.user_id = ?", userID).Order("start_date DESC").Find(&bookings)

	c.JSON(http.StatusOK, gin.H{
		"bookings": bookings,
	})
}




func UpdateBooking(c *gin.Context) {

	var body struct {
		Status   string
	}
	
	c.Bind(&body)
	user, _ := c.Get("user")
	userID := user.(models.User).ID

	bookingID := c.Param("id")

	var booking models.Booking
	initializers.DB.First(&booking, bookingID)

	//check if user is the owener of the liting that the booking belongs to
	
	initializers.DB.Joins("JOIN listings ON listings.id = bookings.listing_id").Preload("User").Where("listings.user_id = ?", userID).Find(&booking)

	// this means that the user is not the owner of the listing that the booking belongs to. so security error i geuss.
	// someone messing with the frontend to try to update a booking that they dont own
	if booking.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Booking not found",
		})
		return
	}

	booking.Status = body.Status
	if body.Status == "Declined" {
		// get the timeslot and set it to available
		var timeslot models.Timeslot
		initializers.DB.First(&timeslot, "booking_id = ?", booking.ID)
		timeslot.Available = true
		timeslot.BookingID = nil
		initializers.DB.Save(&timeslot)
	}


	initializers.DB.Save(&booking)

	c.JSON(http.StatusOK, gin.H{
		"booking": booking,
	})
}


type Booking struct {
	gorm.Model
	FirstName string `gorm:"type:text;default:null"`
	LastName string `gorm:"type:text;default:null"`
	Email string `gorm:"type:text;default:null"`
	Phone string `gorm:"type:text;default:null"`
	Title string `gorm:"type:text"`
	Price decimal.Decimal `gorm:"type:decimal(10,2)"`
	Status string `gorm:"type:ENUM('Pending', 'Accepted', 'Declined', 'Cancelled', 'Completed');default:'Pending'"`
	StartDate string `gorm:"type:text"`
	EndDate string `gorm:"type:text"`
	UserID uint 
	User models.User `gorm:"foreignKey:UserID"`
	ListingID uint
	Listing models.Listing `gorm:"foreignKey:ListingID"`
	// these are not part of the booking model but we need them for the frontend
	TimeslotStartDate string `gorm:"column:timeslot_start_date"`
	TimeslotEndDate string `gorm:"column:timeslot_end_date"`
}
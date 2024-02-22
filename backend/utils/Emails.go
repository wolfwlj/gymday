package utils
import (
	"gymday/initializers"
	"gymday/models"
	"log"

	"os"
	"net/smtp"
)

func SendBookingConfirmationOwner(OwnerEmail string, UserEmail string, BookingTijd string, BookingDatum string) {

	var owner models.User
	var user models.User
	initializers.DB.First(&owner, "email= ?", OwnerEmail)
	initializers.DB.First(&user, "email= ?", UserEmail)

	


	username := os.Getenv("EMAIL_HOST_USER")
	password := os.Getenv("EMAIL_HOST_PASSWORD")
	
	smtpHost := "sandbox.smtp.mailtrap.io"
	
	// Choose auth method and set it up
	
	auth := smtp.PlainAuth("", username, password, smtpHost)
	
	// Message data
	
	from := "noreply@gymday.nl"
	
	to := []string{owner.Email}
	
	message := []byte("To: "+ owner.Email+"\r\n" +
	
	"From: noreply@gymday.nl\r\n" +
	
	"\r\n"+
	
	"Subject: Booking ontvangen!\r\n" +
	
	"\r\n"+
	
	"Here's the space for your great sales pitch\r\n")
	
	
	smtpUrl := smtpHost + ":2525"
	
	err := smtp.SendMail(smtpUrl, auth, from, to, message)
	
	if err != nil {
		log.Fatal(err)
	}

}
package utils

import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/s3/s3manager"
    "fmt"
    "os"
	"mime/multipart"

) 


func UploadImage(blobFile multipart.File, filename string) error{

	// this is a public bucket, do not store sensitive data here
	bucket := "gymdayfilestore"
	
	// file, err := os.Open(filename)
	// if err != nil {
	// 	exitErrorf("Unable to open file %q, %v", err)
	// }
	
	// defer file.Close()

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("eu-central-1")},
	)
	uploader := s3manager.NewUploader(sess)
	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key: aws.String(filename),
		Body: blobFile,
	})
	if err != nil {
		// Print the error and exit.
		exitErrorf("Unable to upload %q to %q, %v", filename, bucket, err)
		return err

	}
	
	fmt.Printf("Successfully uploaded %q to %q\n", filename, bucket)
	return nil
}
func exitErrorf(msg string, args ...interface{}) {
    fmt.Fprintf(os.Stderr, msg+"\n", args...)
    os.Exit(1)
}
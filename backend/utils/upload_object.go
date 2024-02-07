package utils

import (
	"cloud.google.com/go/storage"
	"context"
	"mime/multipart"
	"io"
	"fmt"
	"time"
	"log"
)

const (
	projectID  = "tapsaveevents"  // FILL IN WITH YOURS
	bucketName = "tapsaveevents.appspot.com" // FILL IN WITH YOURS
)

type ClientUploader struct {
	cl         *storage.Client
	projectID  string
	bucketName string
	uploadPath string
}

var uploader *ClientUploader

func UploadImage(blobFile multipart.File, randomfilename, extension string) error{


	client, err := storage.NewClient(context.Background())
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	uploader = &ClientUploader{
		cl:         client,
		bucketName: bucketName,
		projectID:  projectID,
		uploadPath: "imagestore/",
	}

	err = uploader.UploadFile(blobFile, randomfilename + extension)
	if err != nil {

		return err
	}

	return nil
}


func (c *ClientUploader) UploadFile(file multipart.File, object string) error {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	// Upload an object with storage.Writer.
	wc := c.cl.Bucket(c.bucketName).Object(c.uploadPath + object).NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}

	return nil
}
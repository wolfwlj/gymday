package routes

import (
	"github.com/gin-gonic/gin"
)


func WarmupRoutes(router *gin.RouterGroup) {


	router.GET("/warmup",  func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "Hello World",
		})
	})

}
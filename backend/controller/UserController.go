package controller

import (
	"backend/common"
	"backend/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Register(ctx *gin.Context) {
	db := common.GetDB()
	newStu := model.StudentInfo{
		StudentNumber: ctx.PostForm("student_number"),
		Password:      ctx.PostForm("password"),
		AvatorURL:     "http://localhost:8080/imgs/initAvator.jpg",
	}
	var stu model.StudentInfo
	res := db.First(&stu, "student_number = ?", ctx.PostForm("student_number"))
	if res.RowsAffected == 0 {
		db.Create(&newStu)
		ctx.JSON(http.StatusOK, gin.H{
			"respMessage": "success",
		})
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"respMessage": "fail",
		})
	}
}

func Login(ctx *gin.Context) {
	db := common.GetDB()
	stu := model.StudentInfo{}
	res := db.First(&stu, "student_number = ?", ctx.PostForm("student_number"))
	if res.RowsAffected == 1 && stu.Password == ctx.PostForm("password") {
		ctx.JSON(http.StatusOK, gin.H{
			"avatorURL":   stu.AvatorURL,
			"respMessage": "success",
		})
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"avatorURL":   "",
			"respMessage": "fail",
		})
	}
}

func UploadAvator(ctx *gin.Context) {
	avator, err := ctx.FormFile("avator")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"avatorURL":   "",
			"respMessage": "fail",
		})
	} else {
		stuNum := ctx.PostForm("studentNumber")
		filepath := "../imgs/avator_" + stuNum + ".jpg"
		avator_url := "http://localhost:8080/imgs/avator_" + stuNum + ".jpg"
		ctx.SaveUploadedFile(avator, filepath)

		db := common.GetDB()
		db.Model(&model.StudentInfo{}).Where("student_number = ?", stuNum).Update("avator_url", avator_url)

		ctx.JSON(http.StatusOK, gin.H{
			"avatorURL":   avator_url,
			"respMessage": "success",
		})
	}
}

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
			"respMessage": "success",
		})
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"respMessage": "fail",
		})
	}
}

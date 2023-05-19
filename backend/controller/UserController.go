package controller

import (
	"backend/common"
	"backend/model"

	"github.com/gin-gonic/gin"
)

func Register(ctx *gin.Context) {
	db := common.GetDB()
	newStu := model.StudentInfo{
		StudentNumber: ctx.PostForm("studentNumber"),
		Department:    ctx.PostForm("department"),
	}
	db.Create(&newStu)
	ctx.JSON(200, gin.H{
		"message": "注册成功",
	})
}

package controller

import (
	"backend/common"
	"backend/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func TodoCreate(ctx *gin.Context) {
	db := common.GetDB()
	studentNumber := ctx.PostForm("student_number")
	content := ctx.PostForm("content")
	status := ctx.PostForm("status")
	priority, _ := strconv.Atoi(ctx.PostForm("priority"))

	result := db.Create(&model.Todo{
		StudentNumber: studentNumber,
		Content:       content,
		Status:        status,
		Priority:      priority,
	})

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"respMessage": "fail",
		})
	} else {
		ctx.JSON(http.StatusOK, gin.H{
			"respMessage": "success",
		})
	}
}

func TodoQueryAll(ctx *gin.Context) {
	db := common.GetDB()
	studentNumber := ctx.PostForm("student_number")
	todoList := []model.Todo{}

	result := db.Where("student_number = ?", studentNumber).Find(&todoList)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"respMessage": "fail",
		})
	} else {
		ctx.JSON(http.StatusOK, gin.H{
			"respMessage": "success",
			"todoList":    todoList,
		})
	}
}

func TodoUpdate(ctx *gin.Context) {
	db := common.GetDB()
	id := ctx.PostForm("todoId")
	studentNumber := ctx.PostForm("student_number")
	content := ctx.PostForm("content")
	status := ctx.PostForm("status")
	priority, _ := strconv.Atoi(ctx.PostForm("priority"))
	pre_todo := model.Todo{}
	db.Where("id = ?", id).Find(&pre_todo)
	result := db.Model(&pre_todo).Updates(&model.Todo{
		StudentNumber: studentNumber,
		Content:       content,
		Status:        status,
		Priority:      priority,
	})

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"respMessage": "fail",
		})
	} else {
		ctx.JSON(http.StatusOK, gin.H{
			"respMessage": "success",
		})
	}
}

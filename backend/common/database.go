package common

import (
	"backend/model"
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() *gorm.DB {
	host := "localhost"
	port := "3306"
	database := "mydb"
	username := "root"
	password := "010420"
	charset := "utf8"
	args := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=True&loc=Local",
		username,
		password,
		host,
		port,
		database,
		charset)
	db, err := gorm.Open(mysql.Open(args), &gorm.Config{})
	if err != nil {
		panic("failed to connect database,err: " + err.Error())
	}
	//自动创建数据表
	db.AutoMigrate(&model.StudentInfo{})
	db.AutoMigrate(&model.TreeholePost{})
	db.AutoMigrate(&model.PostComment{})
	db.AutoMigrate(&model.FavourPost{})
	db.AutoMigrate(&model.Todo{})

	DB = db
	return db
}

func GetDB() *gorm.DB {
	return DB
}

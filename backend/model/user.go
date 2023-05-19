package model

import "gorm.io/gorm"

// 定义一个Model
type StudentInfo struct {
	gorm.Model
	// Name      string `gorm:"type:varchar(20);not null"`
	// Telephone string `gorm:"varchar(11);not null;unique"`
	// Password  string `gorm:"size:255;not null"`
	StudentNumber string `gorm:"varchar(255)"`
	Department    string `gorm:"varchar(255)"`
}

package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model

	Name     string
	CodeID   string
	Password string

	Teachers []Teacher `gorm:"foreignKey:AdminID"`
	Students []Student `gorm:"foreignKey:AdminID"`
}

type Teacher struct {
	gorm.Model

	Picture string

	First_Name string

	Last_Name string

	Full_Name string

	Email string

	Address string

	Province string

	ZipCode string

	PhoneNumber string

	CodeID string `gorm:"uniqueIndex"`

	ID_Card string

	Password string

	BirthDay uint

	BirthMonthID uint
	BirthMonth   BirthMonth

	BirthYear uint

	AdminID *uint
	Admin   Admin

	//1 teacher to many teacherrecord
	TeacherRecords []TeacherRecord `gorm:"foreignKey:TeacherID"`
}

type Article struct {
	gorm.Model

	Name string

	Students []Student `gorm:"foreignKey:ArticleID"`
}

type BirthMonth struct {
	gorm.Model

	Name string

	Students []Student `gorm:"foreignKey:BirthMonthID"`
	Teachers []Teacher `gorm:"foreignKey:BirthMonthID"`
}

type StatusFamily struct {
	gorm.Model

	Name string

	Students []Student `gorm:"foreignKey:StatusFamilyID"`
}

type Student struct {
	gorm.Model

	Picture string

	First_Name string

	Last_Name string

	Full_Name string

	ID_Card string

	Email string

	Address string

	Province string

	ZipCode string

	PhoneNumber string

	CodeID string `gorm:"uniqueIndex"`

	BirthDay uint

	BirthYear uint

	Father_Name string

	Father_Career string

	Father_Phone string

	Father_income uint

	Mother_Name string

	Mother_Career string

	Mother_Phone string

	Mother_income uint

	Parent_About string

	Parent_Name string

	Parent_Career string

	Parent_Phone string

	Family_income uint

	Number_brother uint

	Status uint

	AdminID *uint
	Admin   Admin

	StatusFamilyID *uint
	StatusFamily   StatusFamily

	ArticleID *uint
	Article   Article

	BirthMonthID *uint
	BirthMonth   BirthMonth

	//1 student to many studentrecord
	StudentRecords []StudentRecord `gorm:"foreignKey:StudentID"`

	Physical_Fitness *Physical_Fitness `gorm: "foreignKey:StudentID"`
}

type ClassRoom struct {
	gorm.Model
	Room uint8
	//1 ClassRoom to many teacherrecord
	TeacherRecords []TeacherRecord `gorm:"foreignKey:ClassRoomID"`

	StudentRecords []StudentRecord `gorm:"foreignKey:ClassRoomID"`
}

type Grade struct {
	gorm.Model
	Grade uint8

	//1 ClassRoom to many teacherrecord
	TeacherRecords []TeacherRecord `gorm:"foreignKey:GradeID"`

	StudentRecords []StudentRecord `gorm:"foreignKey:GradeID"`
}

type TeacherRecord struct {
	gorm.Model

	TeacherRecordYear uint

	TeacherID *uint
	Teacher   Teacher

	GradeID *uint
	Grade   Grade

	ClassRoomID *uint
	ClassRoom   ClassRoom

	Physical_Fitnesses []Physical_Fitness `gorm:"foreignKey:TeacherRecordID"`
}

type StudentRecord struct {
	gorm.Model

	StudentRecordYear uint

	StudentID *uint
	Student   Student

	GradeID *uint
	Grade   Grade

	ClassRoomID *uint
	ClassRoom   ClassRoom
}

type Physical_Fitness struct {
	gorm.Model

	Run50 float32

	BMI float32

	Longjump float32

	SitUp uint

	GripStrength float32

	Wieght float32

	Height uint

	Created_date string

	TeacherRecordID *uint
	TeacherRecord   TeacherRecord

	StudentID *uint
	Student   Student
}

type Physical_Fitness_Backup struct {
	gorm.Model

	Run50 float32

	BMI float32

	Longjump float32

	SitUp uint

	GripStrength float32

	Wieght float32

	Height float32

	Created_date string

	TeacherRecordID *uint
	TeacherRecord   TeacherRecord

	StudentID *uint
	Student   Student
}

package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /students

func CreateStudent(c *gin.Context) {

	var student entity.Student

	if err := c.ShouldBindJSON(&student); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&student).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": student})

}

// GET /student/:id

func GetStudent(c *gin.Context) {

	var student entity.Student

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM students WHERE id = ?", id).Scan(&student).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": student})

}

// GET /students

func ListStudents(c *gin.Context) {

	var students []entity.Student

	if err := entity.DB().Raw("SELECT * FROM students").Scan(&students).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": students})

}

func ListStudentStatus(c *gin.Context) {

	var students []entity.Student

	if err := entity.DB().Raw("SELECT * FROM students where status = 0").Scan(&students).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": students})

}

// DELETE /students/:id

func DeleteStudent(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

//PATCH /students

func UpdateStudent(c *gin.Context) {
	var student entity.Student
	var newStudent entity.Student
	id := c.Param("id")
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", id).Find(&newStudent); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "New data student not found"})
		return
	}

	newStudent.Picture = student.Picture
	newStudent.ArticleID = student.ArticleID
	newStudent.First_Name = student.First_Name
	newStudent.Last_Name = student.Last_Name
	newStudent.Full_Name = student.Full_Name
	newStudent.ID_Card = student.ID_Card
	newStudent.PhoneNumber = student.PhoneNumber
	newStudent.Email = student.Email
	newStudent.Address = student.Address
	newStudent.Province = student.Province
	newStudent.ZipCode = student.ZipCode
	newStudent.PhoneNumber = student.PhoneNumber
	newStudent.BirthDay = student.BirthDay
	newStudent.BirthMonthID = student.BirthMonthID
	newStudent.BirthYear = student.BirthYear
	newStudent.Father_Name = student.Father_Name
	newStudent.Father_Career = student.Father_Career
	newStudent.Father_Phone = student.Father_Phone
	newStudent.Father_income = student.Father_income
	newStudent.Mother_Name = student.Mother_Name
	newStudent.Mother_Career = student.Mother_Career
	newStudent.Mother_Phone = student.Mother_Phone
	newStudent.Mother_income = student.Mother_income
	newStudent.Parent_About = student.Parent_About
	newStudent.Parent_Name = student.Parent_Name
	newStudent.Parent_Career = student.Parent_Career
	newStudent.Parent_Phone = student.Parent_Phone
	newStudent.Family_income = student.Family_income
	newStudent.Number_brother = student.Number_brother
	newStudent.StatusFamilyID = student.StatusFamilyID
	newStudent.Status = student.Status

	updates := entity.Student{
		Picture:        newStudent.Picture,
		ArticleID:      newStudent.ArticleID,
		First_Name:     newStudent.First_Name,
		Last_Name:      newStudent.Last_Name,
		Full_Name:      newStudent.Full_Name,
		ID_Card:        newStudent.ID_Card,
		PhoneNumber:    newStudent.PhoneNumber,
		Email:          newStudent.Email,
		Address:        newStudent.Address,
		Province:       newStudent.Province,
		ZipCode:        newStudent.ZipCode,
		BirthDay:       newStudent.BirthDay,
		BirthMonthID:   newStudent.BirthMonthID,
		BirthYear:      newStudent.BirthYear,
		Father_Name:    newStudent.Father_Name,
		Father_Career:  newStudent.Father_Career,
		Father_Phone:   newStudent.Father_Phone,
		Father_income:  newStudent.Father_income,
		Mother_Name:    newStudent.Mother_Name,
		Mother_Career:  newStudent.Mother_Career,
		Mother_Phone:   newStudent.Mother_Phone,
		Mother_income:  newStudent.Mother_income,
		Parent_About:   newStudent.Parent_About,
		Parent_Name:    newStudent.Parent_Name,
		Parent_Career:  newStudent.Parent_Career,
		Parent_Phone:   newStudent.Parent_Phone,
		Family_income:  newStudent.Family_income,
		Number_brother: newStudent.Number_brother,
		StatusFamilyID: newStudent.StatusFamilyID,
		Status:         newStudent.Status,
	}

	if _, err := govalidator.ValidateStruct(updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&newStudent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newStudent})
}

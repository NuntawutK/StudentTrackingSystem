package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/bankvery007/dashboard/entity"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /teachers

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func CreateTeacher(c *gin.Context) {

	var teacher entity.Teacher
	var birthmonth entity.BirthMonth

	if err := c.ShouldBindJSON(&teacher); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", teacher.BirthMonthID).First(&birthmonth); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	password := teacher.Password
	hash, _ := HashPassword(password)

	payload := entity.Teacher{
		Picture:     teacher.Picture,
		First_Name:  teacher.First_Name,
		Last_Name:   teacher.Last_Name,
		Full_Name:   teacher.First_Name + " " + teacher.Last_Name,
		CodeID:      teacher.CodeID,
		Password:    hash,
		Email:       teacher.Email,
		Address:     teacher.Address,
		Province:    teacher.Province,
		ZipCode:     teacher.ZipCode,
		PhoneNumber: teacher.PhoneNumber,
		BirthDay:    teacher.BirthDay,
		BirthMonth:  birthmonth,
		BirthYear:   teacher.BirthYear,
		ID_Card:     teacher.ID_Card,
	}

	if err := entity.DB().Create(&payload).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": payload})

}

// GET /teacher/:id

func GetTeacher(c *gin.Context) {

	var teacher entity.Teacher

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM teachers WHERE id = ?", id).Scan(&teacher).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teacher})

}

// GET /teachers

func ListTeachers(c *gin.Context) {

	var teachers []entity.Teacher

	if err := entity.DB().Raw("SELECT * FROM teachers").Scan(&teachers).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teachers})

}

// DELETE /teachers/:id

func DeleteTeacher(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM teachers WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /teachers

func UpdateTeacher(c *gin.Context) {
	var teacher entity.Teacher
	var newteacher entity.Teacher
	id := c.Param("id")
	if err := c.ShouldBindJSON(&teacher); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", id).Find(&newteacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "New data teacher not found"})
		return
	}

	newteacher.Picture = teacher.Picture
	newteacher.First_Name = teacher.First_Name
	newteacher.Last_Name = teacher.Last_Name
	newteacher.Full_Name = teacher.First_Name + " " + teacher.Last_Name
	newteacher.Email = teacher.Email
	newteacher.Address = teacher.Address
	newteacher.CodeID = teacher.CodeID
	newteacher.Province = teacher.Province
	newteacher.ZipCode = teacher.ZipCode
	newteacher.PhoneNumber = teacher.PhoneNumber
	newteacher.BirthDay = teacher.BirthDay
	newteacher.BirthMonth = teacher.BirthMonth
	newteacher.BirthYear = teacher.BirthYear
	newteacher.ID_Card = teacher.ID_Card

	updates := entity.Student{
		Picture:     newteacher.Picture,
		First_Name:  newteacher.First_Name,
		Last_Name:   newteacher.Last_Name,
		Full_Name:   newteacher.First_Name + " " + newteacher.Last_Name,
		PhoneNumber: newteacher.PhoneNumber,
		Email:       newteacher.Email,
		CodeID:      newteacher.CodeID,
		Address:     newteacher.Address,
		Province:    newteacher.Province,
		ZipCode:     newteacher.ZipCode,
		BirthDay:    newteacher.BirthDay,
		BirthMonth:  newteacher.BirthMonth,
		ID_Card:     newteacher.ID_Card,
		BirthYear:   newteacher.BirthYear,
	}

	if _, err := govalidator.ValidateStruct(updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&newteacher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newteacher})
}

package controller

import (
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /teachers

func CreateTeacherRecord(c *gin.Context) {
	var teacher entity.Teacher
	var classroom entity.ClassRoom
	var grade entity.Grade
	var teacherrecord entity.TeacherRecord

	if err := c.ShouldBindJSON(&teacherrecord); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", teacherrecord.TeacherID).First(&teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", teacherrecord.GradeID).First(&grade); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", teacherrecord.ClassRoomID).First(&classroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "classroom not found"})
		return
	}

	tr := entity.TeacherRecord{
		Teacher:           teacher,
		Grade:             grade,
		ClassRoom:         classroom,
		TeacherRecordYear: teacherrecord.TeacherRecordYear,
	}

	if err := entity.DB().Create(&tr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tr})

}

// GET /teacher/:id

func GetTeacherRecord(c *gin.Context) {

	var teacherrecord []entity.TeacherRecord

	id := c.Param("id")

	if err := entity.DB().Preload("Teacher").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM teacher_records WHERE teacher_id = ?", id).Find(&teacherrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teacherrecord})

}

func GetTeacherRecordfromTeacherDetail(c *gin.Context) {

	var teacherrecord entity.TeacherRecord

	id := c.Param("id")

	if err := entity.DB().Preload("Teacher").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM teacher_records WHERE teacher_id = ? ORDER BY id desc limit 1", id).Find(&teacherrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teacherrecord})

}

func ListGradeNotINTeacherRecord(c *gin.Context) {
	var teacherrecord []entity.TeacherRecord
	teacher := c.Param("teacherid")

	if err := entity.DB().Preload("Teacher").Preload("Grade").Raw("SELECT * FROM grades WHERE grade NOT IN (SELECT DISTINCT grade_id FROM teacher_records where teacher_id = ?)", teacher).Find(&teacherrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorishere": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teacherrecord})
}

// GET /teachers

func ListTeacherRecords(c *gin.Context) {

	var teacherrecord []entity.TeacherRecord

	if err := entity.DB().Preload("Teacher").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM teacher_records ORDER BY teacher_record_year, class_room_id ASC ").Find(&teacherrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teacherrecord})

}

// DELETE /teachers/:id

func DeleteTeacherRecord(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM teacher_records WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher_records not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /teachers

func UpdateTeacherRecord(c *gin.Context) {

	var teacherrecord entity.TeacherRecord

	if err := c.ShouldBindJSON(&teacherrecord); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", teacherrecord.ID).First(&teacherrecord); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})

		return

	}

	if err := entity.DB().Save(&teacherrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": teacherrecord})

}

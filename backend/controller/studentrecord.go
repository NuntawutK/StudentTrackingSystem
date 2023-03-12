package controller

import (
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Students

func CreateStudentRecord(c *gin.Context) {
	var student entity.Student
	var classroom entity.ClassRoom
	var grade entity.Grade
	// var status entity.Student
	var studentrecord entity.StudentRecord

	if err := c.ShouldBindJSON(&studentrecord); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", studentrecord.StudentID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	// if tx := entity.DB().Where("status = ?", studentrecord.Student.Status).First(&status); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
	// 	return
	// }

	if tx := entity.DB().Where("id = ?", studentrecord.GradeID).First(&grade); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", studentrecord.ClassRoomID).First(&classroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "classroom not found"})
		return
	}

	tr := entity.StudentRecord{
		Student:           student,
		Grade:             grade,
		ClassRoom:         classroom,
		StudentRecordYear: studentrecord.StudentRecordYear,
		// status:            status,
	}

	if err := entity.DB().Create(&tr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tr})

}

func CreateStudentRecordArray(c *gin.Context) {

	var payload struct {
		GradeID           uint
		ClassRoomID       uint
		StudentRecordYear uint
	}

	if err := c.ShouldBindJSON(&payload); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// var student []string
	var studentrecords []entity.StudentRecord

	if err := entity.DB().Model(&entity.StudentRecord{}).Where("student_record_year = ? AND grade_id = ? AND class_room_id = ?", payload.StudentRecordYear, payload.GradeID, payload.ClassRoomID).
		Preload("Student").Find(&studentrecords).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// c.JSON(http.StatusOK, gin.H{"data": studentrecords})

	var resultStudentRecord []entity.StudentRecord

	for _, studentrecord := range studentrecords {
		var grade entity.Grade
		if tx := entity.DB().Where("id = ?", payload.GradeID).First(&grade); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
			return
		}
		grade.Grade++
		var newgrade entity.Grade
		if tx := entity.DB().Where("grade = ?", grade.Grade).First(&newgrade); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
			return
		}
		studentrecord.StudentRecordYear++
		newstudentRecord := entity.StudentRecord{
			Student:           studentrecord.Student,
			Grade:             newgrade,
			ClassRoomID:       studentrecord.ClassRoomID,
			StudentRecordYear: studentrecord.StudentRecordYear,
		}
		if err := entity.DB().Create(&newstudentRecord).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		resultStudentRecord = append(resultStudentRecord, newstudentRecord)
	}
	c.JSON(http.StatusOK, gin.H{"data": resultStudentRecord})

}

func GetStudentRecordArray(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	id := c.Param("id")

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records WHERE student_id = ? ", id).Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

func GetStudentRecord(c *gin.Context) {

	var studentrecord entity.StudentRecord

	id := c.Param("id")

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records WHERE student_id = ? ", id).Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

func GetStudentRecordfromyearandclassroom(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	year := c.Param("year")

	gradeid := c.Param("grade")

	classroomid := c.Param("classroom")

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records WHERE student_record_year = ? AND grade_id = ? AND class_room_id = ?", year, gradeid, classroomid).Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

func GetStudentRecordwithYear(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	year := c.Param("year")

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records WHERE student_record_year = ?", year).Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

// GET /studentrecord

func ListStudentRecords(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT * FROM student_records ORDER BY student_record_year, class_room_id ASC").Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

func ListStudentRecordYear(c *gin.Context) {

	var studentrecord []entity.StudentRecord

	if err := entity.DB().Preload("Student").Preload("Grade").Preload("ClassRoom").Raw("SELECT DISTINCT Max(student_record_year) FROM student_records").Find(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

// DELETE /studentrecord/:id

func DeleteStudentRecord(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM student_records WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "student_records not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /studentrecord

func UpdateStudentRecord(c *gin.Context) {

	var studentrecord entity.StudentRecord

	if err := c.ShouldBindJSON(&studentrecord); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", studentrecord.ID).First(&studentrecord); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "studentrecord not found"})

		return

	}

	if err := entity.DB().Save(&studentrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": studentrecord})

}

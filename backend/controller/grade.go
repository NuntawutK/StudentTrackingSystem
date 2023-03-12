package controller

import (
	"net/http"

	"github.com/bankvery007/dashboard/entity"
	"github.com/gin-gonic/gin"
)

// POST /classroom
func CreateGrade(c *gin.Context) {
	var grade entity.Grade
	if err := c.ShouldBindJSON(&grade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&grade).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": grade})
}

// GET /classroom/:id
func GetGrade(c *gin.Context) {
	var grade entity.Grade
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM grades WHERE id = ?", id).Scan(&grade).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": grade})
}

// GET /ClassRooms
func ListGrades(c *gin.Context) {
	var grades []entity.Grade
	if err := entity.DB().Raw("SELECT * FROM grades").Scan(&grades).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": grades})
}

// DELETE /classrooms/:id
func DeleteGrade(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM grades WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /classroom
func UpdateGrade(c *gin.Context) {
	var grade entity.ClassRoom
	if err := c.ShouldBindJSON(&grade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", grade.ID).First(&grade); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "grade not found"})
		return
	}

	if err := entity.DB().Save(&grade).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": grade})
}

// func ListGradeNotINTeacherRecord(c *gin.Context) {
// 	var grade []entity.Grade
// 	teacher := c.Param("teacherid")

// 	if err := entity.DB().Preload("Teacher").Preload("TeacherRecord").Raw("SELECT * FROM grades WHERE grade NOT IN (SELECT DISTINCT grade_id FROM teacher_records where teacher_id = ?)", teacher).Find(&grade).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"errorishere": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": grade})
// }

// func ListRecieptHistoryNotINWorkReceive(c *gin.Context) {
// 	var workrecive []entity.WorkReceive

// 	// ค้นหา work receive ทั้งหมดที่ไม่มีในข้อมูล reciepthistory
// 	if err := entity.DB().Preload("RepairRequest").Preload("Employee").Raw("SELECT * FROM work_receives WHERE id NOT IN (SELECT DISTINCT work_receive_id FROM reciept_histories)").Find(&workrecive).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"errorishere": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": workrecive})
// }

// GET /classroom/:id
func GetGradenodis(c *gin.Context) {
	var grade entity.Grade
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT DISTINCT * FROM grades WHERE id = ?", id).Scan(&grade).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": grade})
}

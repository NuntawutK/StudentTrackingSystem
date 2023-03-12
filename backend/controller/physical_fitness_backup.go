package controller

import (
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /teachers

func Createphysical_fitness_Backup(c *gin.Context) {
	var student entity.Student
	var teacher entity.TeacherRecord
	var physicalfiness entity.Physical_Fitness_Backup

	if err := c.ShouldBindJSON(&physicalfiness); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", physicalfiness.StudentID).First(&student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", physicalfiness.TeacherRecordID).First(&teacher); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	pf := entity.Physical_Fitness_Backup{

		Wieght:        physicalfiness.Wieght,
		Height:        physicalfiness.Height,
		SitUp:         physicalfiness.SitUp,
		GripStrength:  physicalfiness.GripStrength,
		Run50:         physicalfiness.Run50,
		Longjump:      physicalfiness.Longjump,
		Created_date:  physicalfiness.Created_date,
		BMI:           physicalfiness.BMI,
		Student:       student,
		TeacherRecord: teacher,
	}

	if err := entity.DB().Create(&pf).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pf})

}

// GET /teacher/:id

func Getphysical_fitness_Backup(c *gin.Context) {

	var physicalfiness entity.Physical_Fitness_Backup

	studentID := c.Param("studentid")

	if err := entity.DB().Preload("TeacherRecord").Preload("Student").Raw("SELECT * FROM physical_fitness_backups WHERE student_id = ? ORDER BY id DESC LIMIT 1", studentID).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Deletephysical_fitness_Backup(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM physical_fitness_backups WHERE student_id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "physical_finesses not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

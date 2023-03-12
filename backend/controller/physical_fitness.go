package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/bankvery007/dashboard/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /teachers

func Createphysical_fitness(c *gin.Context) {
	var student entity.Student
	var physicalfiness entity.Physical_Fitness
	var teacher entity.TeacherRecord

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

	pf := entity.Physical_Fitness{

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

func Getphysical_fitnessbystudentid(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	studentID := c.Param("studentid")

	if err := entity.DB().Preload("TeacherRecord").Preload("Student").Raw("SELECT * FROM physical_fitnesses WHERE student_id = ? order by id desc limit 6", studentID).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Getphysical_fitnessbyid(c *gin.Context) {

	var physicalfiness entity.Physical_Fitness

	id := c.Param("id")

	if err := entity.DB().Preload("TeacherRecord").Preload("Student").Raw("SELECT * FROM physical_fitnesses WHERE id = ? ", id).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Getphysical_fitnessbyteacher(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	id := c.Param("id")

	if err := entity.DB().Preload("TeacherRecord").Preload("Student").Raw("SELECT * FROM physical_fitnesses WHERE teacher_record_id = ? ", id).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Listphysical_fitnesses(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	if err := entity.DB().Preload("TeacherRecord").Preload("Student").Raw("SELECT * FROM physical_fitnesses").Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Getphysical_fitnessesjump(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	id := c.Param("id")

	if err := entity.DB().Preload("TeacherRecord").Preload("Student").Raw("SELECT * FROM physical_fitnesses WHERE  student_id = ? and longjump < 100", id).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Getphysical_fitnessesheight(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	id := c.Param("id")

	if err := entity.DB().Preload("TeacherRecord").Preload("Student").Raw("SELECT * FROM physical_fitnesses WHERE  student_id = ? and height < 100", id).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Getphysical_fitnessesweight(c *gin.Context) {

	var physicalfiness []entity.Physical_Fitness

	id := c.Param("id")

	if err := entity.DB().Preload("TeacherRecord").Preload("Student").Raw("SELECT * FROM physical_fitnesses WHERE  student_id = ? and wieght > 100", id).Find(&physicalfiness).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": physicalfiness})

}

func Updatephysical_fitness(c *gin.Context) {
	var physical entity.Physical_Fitness
	var newphysical entity.Physical_Fitness
	id := c.Param("id")
	if err := c.ShouldBindJSON(&physical); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", id).Find(&newphysical); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "New data physical not found"})
		return
	}
	newphysical.StudentID = physical.StudentID
	newphysical.Longjump = physical.Longjump
	newphysical.Run50 = physical.Run50
	newphysical.GripStrength = physical.GripStrength
	newphysical.SitUp = physical.SitUp
	newphysical.Height = physical.Height
	newphysical.Wieght = physical.Wieght
	newphysical.Created_date = physical.Created_date

	updates := entity.Physical_Fitness{
		Longjump:     newphysical.Longjump,
		Run50:        newphysical.Run50,
		GripStrength: newphysical.GripStrength,
		SitUp:        newphysical.SitUp,
		Height:       newphysical.Height,
		Wieght:       newphysical.Wieght,
		Created_date: newphysical.Created_date,
		StudentID:    newphysical.StudentID,
	}

	if _, err := govalidator.ValidateStruct(updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&newphysical).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newphysical})

}

// DELETE /teachers/:id

func Deletephysical_fitness(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM physical_fitnesses WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "physical_finesses not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

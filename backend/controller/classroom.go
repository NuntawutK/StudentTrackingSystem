package controller

import (
	"net/http"

	"github.com/bankvery007/dashboard/entity"
	"github.com/gin-gonic/gin"
)

// POST /classroom
func CreateClassRoom(c *gin.Context) {
	var classroom entity.ClassRoom
	if err := c.ShouldBindJSON(&classroom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&classroom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": classroom})
}

// GET /classroom/:id
func GetClassRoom(c *gin.Context) {
	var classroom entity.ClassRoom
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM class_rooms WHERE id = ?", id).Scan(&classroom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": classroom})
}

// GET /ClassRooms
func ListClassRooms(c *gin.Context) {
	var classrooms []entity.ClassRoom
	if err := entity.DB().Raw("SELECT * FROM class_rooms").Scan(&classrooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": classrooms})
}

// DELETE /classrooms/:id
func DeleteClassRoom(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM class_rooms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "classroom not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /classroom
func UpdateClassRoom(c *gin.Context) {
	var classroom entity.ClassRoom
	if err := c.ShouldBindJSON(&classroom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", classroom.ID).First(&classroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "classroom not found"})
		return
	}

	if err := entity.DB().Save(&classroom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": classroom})
}
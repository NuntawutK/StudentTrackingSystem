package controller

import (
	"net/http"

	"github.com/bankvery007/dashboard/entity"
	"github.com/gin-gonic/gin"
)

// POST /classroom
func CreateStatusFamily(c *gin.Context) {
	var statusfamily entity.StatusFamily
	if err := c.ShouldBindJSON(&statusfamily); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&statusfamily).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusfamily})
}

// GET /classroom/:id
func GetStatusFamily(c *gin.Context) {
	var statusfamily entity.StatusFamily
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM status_families WHERE id = ?", id).Scan(&statusfamily).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusfamily})
}

// GET /ClassRooms
func ListStatusFamily(c *gin.Context) {
	var statusfamily []entity.StatusFamily
	if err := entity.DB().Raw("SELECT * FROM status_families").Scan(&statusfamily).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusfamily})
}


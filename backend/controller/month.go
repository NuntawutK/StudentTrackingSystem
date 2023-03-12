package controller

import (
	"net/http"

	"github.com/bankvery007/dashboard/entity"
	"github.com/gin-gonic/gin"
)

// GET /ClassRooms
func ListMonth(c *gin.Context) {
	var month []entity.BirthMonth
	if err := entity.DB().Raw("SELECT * FROM birth_months").Scan(&month).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": month})
}

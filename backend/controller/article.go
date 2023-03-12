package controller

import (
	"net/http"

	"github.com/bankvery007/dashboard/entity"
	"github.com/gin-gonic/gin"
)

// POST /classroom
func CreateArticle(c *gin.Context) {
	var article entity.Article
	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&article).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": article})
}

// GET /classroom/:id
func GetArticle(c *gin.Context) {
	var article entity.Article
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM articles WHERE id = ?", id).Scan(&article).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": article})
}

// GET /ClassRooms
func ListArticles(c *gin.Context) {
	var article []entity.Article
	if err := entity.DB().Raw("SELECT * FROM articles").Scan(&article).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": article})
}

// DELETE /classrooms/:id
func DeleteArticle(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM articles WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "article not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /classroom
func UpdateArticle(c *gin.Context) {
	var article entity.Article
	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", article.ID).First(&article); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "article not found"})
		return
	}

	if err := entity.DB().Save(&article).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": article})
}



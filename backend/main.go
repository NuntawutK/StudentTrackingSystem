package main

import (
	"github.com/bankvery007/dashboard/controller"

	"github.com/bankvery007/dashboard/entity"

	"github.com/bankvery007/dashboard/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Teacher Routes

			protected.GET("/teachers", controller.ListTeachers)

			protected.GET("/teacher/:id", controller.GetTeacher)

			protected.POST("/teachers", controller.CreateTeacher)

			protected.PATCH("/teachers/:id", controller.UpdateTeacher)

			protected.DELETE("/teacher/:id", controller.DeleteTeacher)

			// Student Routes

			protected.GET("/students", controller.ListStudents)

			protected.GET("/studentstatus", controller.ListStudentStatus)

			protected.GET("/student/:id", controller.GetStudent)

			protected.POST("/students", controller.CreateStudent)

			protected.PATCH("/students/:id", controller.UpdateStudent)

			protected.DELETE("/student/:id", controller.DeleteStudent)

			// r.PATCH("/users", controller.UpdateUser)

			protected.DELETE("/students/:id", controller.DeleteStudent)

			//ClassRoom Routes
			protected.GET("/classrooms", controller.ListClassRooms)

			protected.GET("/classroom/:id", controller.GetClassRoom)

			protected.POST("/classrooms", controller.CreateClassRoom)

			protected.PATCH("/classrooms", controller.UpdateClassRoom)

			protected.DELETE("/classrooms/:id", controller.DeleteClassRoom)

			//Article Routes
			protected.GET("/articles", controller.ListArticles)

			protected.GET("/articles/:id", controller.GetArticle)

			protected.POST("/articles", controller.CreateArticle)

			protected.GET("/month", controller.ListMonth)

			//StatusFamily Routes
			protected.GET("/status", controller.ListStatusFamily)

			protected.GET("/status/:id", controller.GetStatusFamily)

			protected.POST("/status", controller.CreateStatusFamily)

			//Grade Routes
			protected.GET("/grades", controller.ListGrades)

			protected.GET("/grade/:id", controller.GetGrade)

			protected.POST("/grades", controller.CreateGrade)

			protected.PATCH("/grades", controller.UpdateGrade)

			protected.DELETE("/grades/:id", controller.DeleteGrade)

			// TeacherRecord Routes

			protected.GET("/teacherrecords", controller.ListTeacherRecords)

			protected.GET("/teacherrecord/:id", controller.GetTeacherRecord)

			protected.GET("/teacherrecord/detail/:id", controller.GetTeacherRecordfromTeacherDetail)

			protected.POST("/teacherrecords", controller.CreateTeacherRecord)

			protected.GET("/gradesteacher/:teacherid", controller.ListGradeNotINTeacherRecord)

			protected.PATCH("/teacherrecords", controller.UpdateTeacherRecord)

			protected.DELETE("/teacherrecords/:id", controller.DeleteTeacherRecord)

			//StudentRecord

			protected.GET("/studentrecords", controller.ListStudentRecords)

			protected.GET("/studentrecordyear", controller.ListStudentRecordYear)

			protected.GET("/studentrecords/:year/:grade/:classroom", controller.GetStudentRecordfromyearandclassroom)

			protected.GET("/studentrecordswithstudent/:year", controller.GetStudentRecordwithYear)

			protected.GET("/studentrecordarray/:id", controller.GetStudentRecordArray)

			protected.GET("/studentrecord/:id", controller.GetStudentRecord)

			protected.POST("/studentrecord", controller.CreateStudentRecord)

			protected.POST("/studentrecords", controller.CreateStudentRecordArray)

			protected.PATCH("/studentrecords", controller.UpdateStudentRecord)

			protected.DELETE("/studentrecords/:id", controller.DeleteStudentRecord)

			//Physical

			protected.GET("/physical", controller.Listphysical_fitnesses)

			protected.GET("/physical/:studentid", controller.Getphysical_fitnessbystudentid)

			protected.GET("/physicalid/:id", controller.Getphysical_fitnessbyid)

			protected.GET("/physicalteacherid/:id", controller.Getphysical_fitnessbyteacher)

			protected.GET("/physicaljump/:id", controller.Getphysical_fitnessesjump)

			protected.GET("/physicalheight/:id", controller.Getphysical_fitnessesheight)

			protected.GET("/physicalweight/:id", controller.Getphysical_fitnessesweight)

			protected.POST("/physicals", controller.Createphysical_fitness)

			protected.PATCH("/physicals/:id", controller.Updatephysical_fitness)

			protected.POST("/physicalbackup", controller.Createphysical_fitness_Backup)

			protected.GET("/physicalbackup/:studentid", controller.Getphysical_fitness_Backup)

			protected.DELETE("/physicalbackup/:id", controller.Deletephysical_fitness_Backup)

		}
	}

	r.POST("/login_admin", controller.LoginByAdmin)
	r.POST("/login_teacher", controller.LoginByTeacher)

	// Run the server

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}

package entity

import (
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("Project.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema
	database.AutoMigrate(&Admin{})
	database.AutoMigrate(&Teacher{})
	database.AutoMigrate(&Student{})
	database.AutoMigrate(&TeacherRecord{})
	database.AutoMigrate(&StudentRecord{})
	database.AutoMigrate(&ClassRoom{})
	database.AutoMigrate(&Physical_Fitness{})
	database.AutoMigrate(&Article{})
	database.AutoMigrate(&StatusFamily{})
	database.AutoMigrate(&Physical_Fitness_Backup{})
	database.AutoMigrate(&Grade{})
	database.AutoMigrate(&BirthMonth{})

	db = database

	// 	admin1 := Admin{
	// 		Name:     "Rinrada",
	// 		CodeID:   "A1234",
	// 		Password: string(password),
	// 	}
	// 	db.Model(&Admin{}).Create(&admin1)

	// 	month1 := BirthMonth{
	// 		Name: "มกราคม",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month1)

	// 	month2 := BirthMonth{
	// 		Name: "กุมภาพันธ์",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month2)

	// 	month3 := BirthMonth{
	// 		Name: "มีนาคม",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month3)

	// 	month4 := BirthMonth{
	// 		Name: "เมษายน",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month4)

	// 	month5 := BirthMonth{
	// 		Name: "พฤษภาคม",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month5)

	// 	month6 := BirthMonth{
	// 		Name: "กรกฎาคม",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month6)

	// 	month7 := BirthMonth{
	// 		Name: "มิถุนายน",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month7)

	// 	month8 := BirthMonth{
	// 		Name: "สิงหาคม",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month8)

	// 	month9 := BirthMonth{
	// 		Name: "กันยายน",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month9)

	// 	month10 := BirthMonth{
	// 		Name: "ตุลาคม",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month10)

	// 	month11 := BirthMonth{
	// 		Name: "พฤศจิกายน",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month11)

	// 	month12 := BirthMonth{
	// 		Name: "ธันวาคม",
	// 	}
	// 	db.Model(&BirthMonth{}).Create(&month12)

	// 	//StatusFamily
	// 	status1 := StatusFamily{
	// 		Name: "อยู่ด้วยกัน",
	// 	}
	// 	db.Model(&StatusFamily{}).Create(&status1)

	// 	status2 := StatusFamily{
	// 		Name: "แยกกันอยู่",
	// 	}
	// 	db.Model(&StatusFamily{}).Create(&status2)

	// 	status3 := StatusFamily{
	// 		Name: "พ่อม่าย",
	// 	}
	// 	db.Model(&StatusFamily{}).Create(&status3)

	// 	status4 := StatusFamily{
	// 		Name: "แม่ม่าย",
	// 	}
	// 	db.Model(&StatusFamily{}).Create(&status4)

	// 	article1 := Article{
	// 		Name: "ด.ช.",
	// 	}
	// 	db.Model(&Article{}).Create(&article1)

	// 	article2 := Article{
	// 		Name: "ด.ญ.",
	// 	}
	// 	db.Model(&Article{}).Create(&article2)

	// 	Room1 := ClassRoom{
	// 		Room: 1,
	// 	}
	// 	db.Model(&ClassRoom{}).Create(&Room1)

	// 	Room2 := ClassRoom{
	// 		Room: 2,
	// 	}
	// 	db.Model(&ClassRoom{}).Create(&Room2)

	// 	Room3 := ClassRoom{
	// 		Room: 3,
	// 	}
	// 	db.Model(&ClassRoom{}).Create(&Room3)

	// 	grade1 := Grade{
	// 		Grade: 1,
	// 	}

	// 	db.Model(&Grade{}).Create(&grade1)

	// 	grade2 := Grade{
	// 		Grade: 2,
	// 	}

	// 	db.Model(&Grade{}).Create(&grade2)

	// 	grade3 := Grade{
	// 		Grade: 3,
	// 	}

	// 	db.Model(&Grade{}).Create(&grade3)

	// 	grade4 := Grade{
	// 		Grade: 4,
	// 	}
	// 	db.Model(&Grade{}).Create(&grade4)

	// 	grade5 := Grade{
	// 		Grade: 5,
	// 	}
	// 	db.Model(&Grade{}).Create(&grade5)

	// 	grade6 := Grade{
	// 		Grade: 6,
	// 	}
	// 	db.Model(&Grade{}).Create(&grade6)

	// }
}

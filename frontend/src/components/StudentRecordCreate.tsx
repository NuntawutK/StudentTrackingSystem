import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { StudentRecordsInterface } from "../models/IStudentRecord";
import { StudentsInterface } from "../models/IStudent";
import { ClassroomsInterface } from "../models/IClassRoom";
import { GradesInterface } from "../models/IGrade";
import Nav from "react-bootstrap/Nav";
import { toast } from "react-toastify";
import { DatePicker, DatePickerProps, InputRef } from "antd";
import 'dayjs/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';

function StudentRecord() {


  const [StudentRecord, setStudentRecord] = React.useState<
    Partial<StudentRecordsInterface>
  >({});
  const [Student, setStudent] = React.useState<StudentsInterface[]>([]);
  const [getStudentID, setGetStudentID] = React.useState<Partial<StudentsInterface>>({});
  const [ClassRoom, setClassRoom] = React.useState<ClassroomsInterface[]>([]);
  const [Grade, setGrade] = React.useState<GradesInterface[]>([]);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {

    setStudentRecord({
      ...StudentRecord,
      StudentRecordYear: Number(dateString)+543,

    });
  };



  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof StudentRecord;
    setStudentRecord({
      ...StudentRecord,
      [name]: event.target.value,
    });
  };

  console.log("StudentRecordYear", StudentRecord)
  console.log("Studednt", getStudentID)


  function update() {
    let data = {
      Picture: getStudentID?.Picture ?? "",

      First_Name: getStudentID?.First_Name ?? "",

      Last_Name: getStudentID?.Last_Name ?? "",

      Full_Name: getStudentID?.Full_Name ?? "",

      ID_Card: getStudentID?.ID_Card ?? "",

      Email: getStudentID?.Email ?? "",

      Address: getStudentID?.Address ?? "",

      Province: getStudentID?.Province ?? "",

      ZipCode: getStudentID?.ZipCode ?? "",

      PhoneNumber: getStudentID?.PhoneNumber ?? "",

      CodeID: getStudentID?.CodeID ?? "",

      BirthYear: getStudentID?.BirthYear,

      Father_Name: getStudentID?.Father_Name,

      Father_Career: getStudentID?.Father_Career,

      Father_Phone: getStudentID?.Father_Phone,

      Father_income: getStudentID?.Father_income,

      Mother_Name: getStudentID?.Mother_Name,

      Mother_Career: getStudentID?.Mother_Career,

      Mother_Phone: getStudentID?.Mother_Phone,

      Mother_income: getStudentID?.Mother_income , 

      Parent_Name: getStudentID?.Parent_Name,

      Parent_Career: getStudentID?.Parent_Career,

      Parent_Phone: getStudentID?.Parent_Phone,

      Parent_About: getStudentID?.Parent_About,

      StatusFamilyID:   getStudentID?.StatusFamilyID,

      ArticleID:   getStudentID?.ArticleID ,

      BirthDay:  getStudentID.BirthDay ,

      BirthMonthID: getStudentID.BirthMonthID ,

      Family_income :  getStudentID?.Family_income , 

      Number_brother:  getStudentID?.Number_brother ,
      Status : 1,
    };

   

    const requestOptionsPatch = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

  

    fetch(`${apiUrl}/students/${StudentRecord.StudentID}`, requestOptionsPatch)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
        }
      });
  }




  function submit() {
    let data = {
      StudentID:
        typeof StudentRecord?.StudentID === "string"
          ? Number(StudentRecord?.StudentID)
          : 0,
      ClassRoomID:
        typeof StudentRecord?.ClassRoomID === "string"
          ? Number(StudentRecord?.ClassRoomID)
          : 0,
      GradeID:
        typeof StudentRecord?.GradeID === "string"
          ? Number(StudentRecord?.GradeID)
          : 0,
      StudentRecordYear:
          Number(StudentRecord?.StudentRecordYear),
    };

    update();

   

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };


  

    fetch(`${apiUrl}/studentrecord`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          toast.success("บันทึกสำเร็จ");
        } else {
          toast.error("บันทึกไม่สำเร็จ");
        }
      });
  }

  const apiUrl = "http://localhost:8080";

  const requestOptionsget = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getstudent = async () => {
    fetch(`${apiUrl}/studentstatus`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudent(res.data);
        } else {

        }
      });
  };


  const getStudentById = async () => {
    fetch(`${apiUrl}/student/${StudentRecord.StudentID}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGetStudentID(res.data);
        } else {

        }
      });
  };

  const getclassroom = async () => {
    fetch(`${apiUrl}/classrooms`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setClassRoom(res.data);
        } else {

        }
      });
  };

  const getgrade = async () => {
    fetch(`${apiUrl}/grades`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGrade(res.data);
        } else {
     
        }
      });
  };



  useEffect(() => {
    getstudent();
    getclassroom();
    getgrade();

  }, []);

  useEffect(() => {
    getStudentById();
  }, [StudentRecord]);

  return (
    <Container>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <br></br>
          <br></br>
          <Card border="secondary">
            <Nav variant="tabs" defaultActiveKey="/studentrecordcreate">
              <Nav.Item>
                {" "}
                <Nav.Link href="/studentrecordpromote">
                  เลื่อนชั้นนักเรียน
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/studentrecordcreate">
                  สร้างชั้นนักเรียน
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Card.Body>
              <Form>
                <Row>
                  <Col xs={8}>
                    <Form.Group className="mb-2">
                      <Form.Label>นักเรียน</Form.Label>
                      <Form.Select
                        name="StudentID"
                        aria-label="StudentID"
                        value={StudentRecord?.StudentID}
                        onChange={handleChange}
                      >
                        <option>กรุณาเลือก</option>
                        {Student.map((item: StudentsInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.First_Name} {item.Last_Name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>ปีการศึกษา</Form.Label>
                      <DatePicker onChange={onChange} picker="year" locale={locale} />
                    </Form.Group>
                  </Col>

                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>ระดับชั้นประถมศึกษา</Form.Label>
                      <Form.Select
                        name="GradeID"
                        value={StudentRecord.GradeID}
                        onChange={handleChange}
                      >
                        <option>กรุณาเลือก</option>
                        {Grade.map((item: GradesInterface) => (
                          <option value={item.ID} key={item.ID}>
                            ชั้นประถมศึกษา {item.Grade}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>ห้อง</Form.Label>
                      <Form.Select
                        name="ClassRoomID"
                        value={StudentRecord.ClassRoomID}
                        onChange={handleChange}
                      >
                        <option>กรุณาเลือก</option>
                        {ClassRoom.map((item: ClassroomsInterface) => (
                          <option value={item.ID} key={item.ID}>
                            ห้อง {item.Room}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={6}>
                    <Button
                      style={{ float: "left" }}
                      href="/tablestudent"
                      variant="secondary"
                    >
                      กลับ
                    </Button>{" "}
                  </Col>
                  <Col xs={6}>
                    <Button
                      style={{ float: "right" }}
                      onClick={submit}
                      variant="success"
                    >
                      เลื่อนชั้น
                    </Button>{" "}
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
}

export default StudentRecord;

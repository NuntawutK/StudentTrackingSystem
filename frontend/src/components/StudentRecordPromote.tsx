import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { StudentRecordsInterface } from '../models/IStudentRecord';
import { StudentsInterface } from '../models/IStudent';
import { ClassroomsInterface } from '../models/IClassRoom';
import { GradesInterface } from '../models/IGrade';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';
import { DatePicker, DatePickerProps, InputRef } from "antd";
import 'dayjs/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';

function StudentRecord() {


  const [StudentRecord, setStudentRecord] = React.useState<Partial<StudentRecordsInterface>>({});
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


  function submit() {

    let data = { 
    ClassRoomID:  Number(StudentRecord?.ClassRoomID) ,
    GradeID: Number(StudentRecord?.GradeID) ,
    StudentRecordYear: Number(StudentRecord?.StudentRecordYear) ,
    };

    



    const requestOptionsPost = {
      method: "POST",
      headers: {  
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", },
      body: JSON.stringify(data),
    };

  

    fetch(`${apiUrl}/studentrecords`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          toast.success("บันทึกสำเร็จ")
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error("บันทึกไม่สำเร็จ")
        }
      });
  }



  const apiUrl = "http://localhost:8080";

  const requestOptionsget = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json", },
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
  }

  const getgrade = async () => {
    fetch(`${apiUrl}/grades`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGrade(res.data);
        } else {
     
        }
      });
  }



  useEffect(() => {
    getclassroom();
    getgrade();
  }, []);

  


  return (

    <Container>

      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>

          <br></br>
          <br></br>
          <Card border="secondary">
          <Nav variant="tabs" defaultActiveKey="/studentrecordpromote">
              <Nav.Item>
                {" "}
                <Nav.Link href="/studentrecordpromote">เลื่อนชั้นนักเรียน</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/studentrecordcreate">สร้างชั้นนักเรียน</Nav.Link>
              </Nav.Item>
            </Nav>
            <Card.Body>
              <Form>
                <Row>
                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>ปีการศึกษา</Form.Label>
                        <DatePicker onChange={onChange} picker="year" locale={locale} />

                    </Form.Group>
                  </Col>


           

          

                  <Col xs={4}>
                    <Form.Group className="mb-2" >
                      <Form.Label>ระดับชั้นประถมศึกษา</Form.Label>
                      <Form.Select 
                        name="GradeID"
                        value={StudentRecord.GradeID}
                        onChange={handleChange}>
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
                    <Form.Group className="mb-2" >
                      <Form.Label>ห้อง</Form.Label>
                      <Form.Select 
                        name="ClassRoomID"
                        value={StudentRecord.ClassRoomID}
                        onChange={handleChange}>
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
                      variant="secondary">กลับ</Button>{' '}


                  </Col>
                  <Col xs={6}>
                    <Button style={{ float: "right" }}
                      onClick={submit}
                      variant="success">เลื่อนชั้น</Button>{' '}

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



{/* <input
type="Name"
className="Form-control"
id="Name"
aria-describedby='NameHelp'
onChange={(e) => setName(e.target.value)}>
</input> */}
import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {
  StudentsInterface,
  Status_FamiliesInterface,
  ArticlesInterface,
  BirthMonthsInterface,
} from "../models/IStudent";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, DatePickerProps, InputRef } from "antd";
import "dayjs/locale/th";
import locale from "antd/es/date-picker/locale/th_TH";

function UpdateStudent() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [Student, setStudent] = React.useState<Partial<StudentsInterface>>({});
  const [Month, setMonth] = React.useState<BirthMonthsInterface[]>([]);
  const [Article, setArticle] = React.useState<ArticlesInterface[]>([]);

  const [StatusFamily, setStatusFamily] = React.useState<
    Status_FamiliesInterface[]
  >([]);

  console.log(Student.Status);
  // const [getStudents, setGetStudents] = React.useState<Partial<StudentsInterface>>({});

  const params = useParams();

  const [filebase64, setFileBase64] = useState<string>(Student.Picture ?? "");
  const [validated, setValidated] = useState(false);
  const [error, seterror] = useState(true);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setStudent({
      ...Student,
      BirthYear: Number(dateString) + 543,
    });
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      seterror(true);
      event.preventDefault();
      event.stopPropagation();
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
    setValidated(true);
    event.preventDefault();
    update();
    if (form.checkValidity() === true) {
      toast.success("บันทึกสำเร็จ");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  function formSubmit(e: any) {
    e.preventDefault();
    // Submit your form with the filebase64 as
    // one of your fields

    alert(
      "here you'd submit the form using\n the filebase64 like any other field"
    );
  }

  // The Magic all happens here.
  function convertFile(files: FileList | null) {
    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";

      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof UpdateStudent;

    const { value } = event.target;

    setStudent({ ...Student, [id]: value });
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof UpdateStudent;
    setStudent({
      ...Student,
      [name]: event.target.value,
    });
  };

  const apiUrl = "http://localhost:8080";

  function update() {
    let data = {
      Picture: filebase64 ? filebase64 : Student?.Picture,

      First_Name: Student.First_Name ?? "",

      Last_Name: Student.Last_Name ?? "",

      Full_Name: Student.First_Name + " " + Student.Last_Name,

      ID_Card: Student.ID_Card ?? "",

      Email: Student.Email ?? "",

      Address: Student.Address ?? "",

      Province: Student.Province ?? "",

      ZipCode: Student.ZipCode ?? "",

      PhoneNumber: Student.PhoneNumber ?? "",

      CodeID: Student.CodeID ?? "",

      BirthDay: Number(Student.BirthDay),

      BirthMonthID: Number(Student.BirthMonthID),

      BirthYear: Number(Student.BirthYear),

      Father_Name: Student.Father_Name,

      Father_Career: Student.Father_Career,

      Father_Phone: Student.Father_Phone,

      Father_income: Number(Student.Father_income),

      Mother_Name: Student.Mother_Name,

      Mother_Career: Student.Mother_Career,

      Mother_Phone: Student.Mother_Phone,

      Mother_income: Number(Student.Mother_income),

      Parent_Name: Student.Parent_Name,

      Parent_Career: Student.Parent_Career,

      Parent_Phone: Student.Parent_Phone,

      Parent_About: Student.Parent_About,

      StatusFamilyID: Number(Student.StatusFamilyID),

      ArticleID: Number(Student.ArticleID),

      Family_income: Number(Student.Family_income),

      Number_brother: Number(Student.Number_brother),

      Status: Number(Student.Status),
    };

    const requestOptionsPost = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let id = params.id;

    fetch(`${apiUrl}/students/${id}`, requestOptionsPost)
      .then((response) => response.json())

      .then((res) => {
        if (res.data) {
        } else {
          toast.error("บันทึกไม่สำเร็จ");
        }
      });
  }

  const requestOptionsget = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getarticle = async () => {
    fetch(`${apiUrl}/articles`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setArticle(res.data);
        } else {
        }
      });
  };

  const getMonth = async () => {
    fetch(`${apiUrl}/month`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMonth(res.data);
        } else {
        }
      });
  };

  const getstatus = async () => {
    fetch(`${apiUrl}/status`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStatusFamily(res.data);
        } else {
        }
      });
  };

  const loadData = () => {
    let id = params.id;

    fetch(`${apiUrl}/student/${id}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudent(res.data);
        } else {
        }
      });
  };

  useEffect(() => {
    loadData();
    getstatus();
    getarticle();
    getMonth();
  }, []);

  // useEffect(() => {
  //     if (image.length < 1) return;
  //     const newImageUrls : any = [];
  //     image.forEach((image) => { newImageUrls.push(URL.createObjectURL(image))})
  //     setImageURLs(newImageUrls);
  // },[image]);

  return (
    <Container>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <br></br>
          <br></br>
          <Card border="secondary">
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                  {" "}
                  <Nav.Link href="#first">ประวัตินักเรียน</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                                    <Nav.Link href="/">
                                        import export </Nav.Link>
                                </Nav.Item> */}
              </Nav>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-2">
                      {filebase64 ? (
                        <img src={filebase64} alt="" />
                      ) : (
                        <img src={Student.Picture} alt="" />
                      )}
                      <Form.Label>รูปประจำตัว</Form.Label>
                      <Form.Control
                        type="file"
                        id="Picture"
                        onSubmit={formSubmit}
                        onChange={(e) =>
                          convertFile((e.target as HTMLInputElement).files)
                        }
                      />

                      <div></div>
                    </Form.Group>
                  </Col>

                  <Col xs={3}>
                    <Form.Group className="mb-2">
                      <Form.Label>คำนำหน้า</Form.Label>
                      <Form.Select
                        name="ArticleID"
                        aria-label="Article"
                        onChange={handleChange}
                        required
                      >
                        {Article.map((item: ArticlesInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>ชื่อจริง</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="First_Name"
                        aria-describedby="First_Name"
                        value={Student.First_Name || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>นามสกุล</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Last_Name"
                        aria-describedby="Last_Name"
                        value={Student.Last_Name || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label>วัน</Form.Label>
                      <Form.Control
                        type="number"
                        required
                        className="Form-control"
                        id="BirthDay"
                        aria-describedby="BirthDayHelp"
                        value={Student?.BirthDay || ""}
                        min={1}
                        max={31}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={5}>
                    <Form.Group className="mb-2">
                      <Form.Label>เดือนเกิด</Form.Label>
                      <Form.Select
                        required
                        name="BirthMonthID"
                        aria-label="Month"
                        value={Student?.BirthMonthID || ""}
                        onChange={handleChange}
                      >
                        <option>กรุณาเลือก</option>
                        {Month.map((item: BirthMonthsInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={4}>
                    <Form.Group>
                      <Form.Label>ปีเกิด</Form.Label>
                      <br></br>
                      <DatePicker
                        onChange={onChange}
                        picker="year"
                        locale={locale}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label>บัตรประจำตัวประชาชน</Form.Label>
                      <Form.Control
                        type="string"
                        disabled
                        className="Form-control"
                        id="ID_Card"
                        aria-describedby="ID_Card"
                        value={Student.ID_Card || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>รหัสนักเรียน</Form.Label>
                      <Form.Control
                        type="String"
                        className="Form-control"
                        id="CodeID"
                        disabled
                        aria-describedby="CodeID"
                        value={Student.CodeID || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>ที่อยู่</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Address"
                        aria-describedby="AddressHelp"
                        value={Student.Address || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={5}>
                    <Form.Group className="mb-2">
                      <Form.Label>จังหวัด</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Province"
                        aria-describedby="ProvinceHelp"
                        value={Student.Province || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={3}>
                    <Form.Group className="mb-2">
                      <Form.Label>รหัสไปรษณีย์</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="ZipCode"
                        aria-describedby="ZipCode"
                        value={Student.ZipCode || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>เบอร์ติดต่อ</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="PhoneNumber"
                        aria-describedby="PhoneNumberHelp"
                        value={Student.PhoneNumber || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>ชื่อบิดา</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Father_Name"
                        aria-describedby="Father_Name"
                        value={Student.Father_Name || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>อาชีพ</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Father_Career"
                        aria-describedby="Father_Career"
                        value={Student.Father_Career || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>รายได้</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Father_income"
                        aria-describedby="Father_income"
                        value={Student.Father_income || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>เบอร์ติดต่อ</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Father_Phone"
                        aria-describedby="Father_Phone"
                        value={Student.Father_Phone || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>ชื่อมารดา</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Mother_Name"
                        aria-describedby="Mother_Name"
                        value={Student.Mother_Name || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>อาชีพ</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Mother_Career"
                        aria-describedby="Mother_Career"
                        value={Student.Mother_Career || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>รายได้</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Mother_income"
                        aria-describedby="Mother_income"
                        value={Student.Mother_income || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>เบอร์ติดต่อ</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Mother_Phone"
                        aria-describedby="Mother_Phone"
                        value={Student.Mother_Phone || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>สถานะของครอบครัว</Form.Label>
                      <Form.Select
                        name="StatusFamilyID"
                        aria-label="StatusFamilyID"
                        onChange={handleChange}
                        required
                      >
                        {StatusFamily.map((item: Status_FamiliesInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>รายได้ครอบครัว</Form.Label>
                      <Form.Control
                        type="number"
                        className="Form-control"
                        id="Family_income"
                        aria-describedby="Family_income"
                        value={Student.Family_income || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>ชื่อผู้ปกครอง</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Parent_Name"
                        aria-describedby="Parent_Name"
                        value={Student.Parent_Name || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>อาชีพ</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Parent_Career"
                        aria-describedby="Parent_Career"
                        value={Student.Parent_Career || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>เบอร์ติดต่อ</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Parent_Phone"
                        aria-describedby="Parent_Phone"
                        value={Student.Parent_Phone || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>เกี่ยวข้องเป็น</Form.Label>
                      <Form.Control
                        type="string"
                        className="Form-control"
                        id="Parent_About"
                        aria-describedby="Parent_About"
                        value={Student.Parent_About || ""}
                        required
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  {/* 
                                    <Col xs={6}>
                                        <Form.Group className="mb-2" >
                                            <Form.Label>อีเมล</Form.Label>
                                            <Form.Control type="string"
                                                className="Form-control"
                                                id="Email"
                                                aria-describedby='EmailHelp'
                                                value={Student.Email || ""}
                                                onChange={handleInputChange} />

                                        </Form.Group>
                                    </Col> */}

                  <Col xs={6}>
                    {localStorage.getItem("role") == "Admin" ? (
                      <Button
                        style={{ float: "left" }}
                        href="/tablestudent"
                        variant="secondary"
                      >
                        กลับ
                      </Button>
                    ) : (
                      <Button
                        style={{ float: "left" }}
                        href="/tableclassroom"
                        variant="secondary"
                      >
                        กลับ
                      </Button>
                    )}
                  </Col>
                  <Col xs={6}>
                    <Button
                      style={{ float: "right" }}
                      type="submit"
                      variant="success"
                    >
                      ยืนยัน
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

export default UpdateStudent;

{
  /* <input
type="Name"
className="Form-control"
id="Name"
aria-describedby='NameHelp'
onChange={(e) => setName(e.target.value)}>
</input> */
}

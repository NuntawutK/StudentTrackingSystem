import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Physical_FitnessInterface } from "../models/IPhysical_Fitness";
import { TeacherReocrdsInterface } from "../models/ITeacherRecord";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import moment from 'moment';
import { StudentsInterface } from "../models/IStudent";

import InputGroup from 'react-bootstrap/InputGroup';
interface Props {
  param : number;
}


function CreatePhysical({param}:Props) {



  const [Student, setStudent] = React.useState<StudentsInterface>();
  const [Physical, setPhysical] = React.useState<
    Partial<Physical_FitnessInterface>
  >({}); //patch
  let CurrentDate = moment().format('l');
  const [TeacherRecord, setTeacherRecord] = React.useState<
    Partial<TeacherReocrdsInterface>
  >({});
  const [physicalHeight, setPhysicalHeight] = React.useState<string>("");
  const [physicalWeight, setPhysicalWeight] = React.useState<string>("");
  const [bmi,setbmi] = React.useState<number>(0);
  
  const [validated, setValidated] = useState(false);
  const [error, seterror] = useState(true);

  const handleSubmit = (event:any) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      seterror(true)
      event.preventDefault();
      event.stopPropagation();
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน") 
    }
    setValidated(true);
    event.preventDefault();
   
    if (form.checkValidity() === true) {
      submit();
      toast.success("บันทึกสำเร็จ")
      setTimeout(() => {
          window.location.reload();
          }
          , 3000);
    }
  };




  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Physical;

    const { value } = event.target;

    setPhysical({ ...Physical, [id]: value });
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Physical;
    setPhysical({
      ...Physical,
      [name]: event.target.value,
    });
  };





  function cancel() {
    
    let data = {
      Longjump: typeof Physical?.Longjump === "string" ? Number(Physical?.Longjump): Physical?.Longjump,
      Run50: typeof Physical?.Run50 === "string" ? Number(Physical?.Run50) : Physical?.Run50,
      GripStrength: typeof Physical?.GripStrength === "string" ? Number(Physical?.GripStrength) : Physical?.GripStrength,
      SitUp: typeof Physical?.SitUp === "string" ? Number(Physical?.SitUp) : Physical?.SitUp,
      Wieght: typeof Physical?.Wieght === "string" ? Number(Physical?.Wieght) : Physical?.Wieght,
      Height: typeof Physical?.Height === "string" ? Number(Physical?.Height) : Physical?.Height,
      Created_date : CurrentDate,
      StudentID: Student?.ID,
      TeacherRecordID: TeacherRecord?.ID,
    };



    const apiUrl = "http://localhost:8080";

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/physicalbackup`, requestOptionsPost)
      .then((response) => response.json())

      .then((res) => {
      })
      .catch((error) => {
  
      });
  }

  function submit() {

    
    let data = {
      Longjump:  Number(Physical?.Longjump),
      Run50:  Number(Physical?.Run50),
      GripStrength:  Number(Physical?.GripStrength) ,
      SitUp:  Number(Physical?.SitUp) ,
      Wieght: Number(Physical?.Wieght) ,
      Height:  Number(Physical?.Height) ,
      Created_date : CurrentDate,
      StudentID: Student?.ID,
      TeacherRecordID: TeacherRecord?.ID,
      BMI:Number(bmi),
    };





    const apiUrl = "http://localhost:8080";

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/physicals`, requestOptionsPost)
      .then((response) => response.json())

      .then((res) => {
  
       
        
          deletePhysicalBankup();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        
      })
      .catch((error) => {
          toast.error("บันทึกไม่สำเร็จ")
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

  const getteacher = async () => {
    fetch(
      `${apiUrl}/teacherrecord/detail/${localStorage.getItem("uid")}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTeacherRecord(res.data);
        } else {

        }
      });
  };


  
  const getPhysical = async () => {
    fetch(
      `${apiUrl}/physicalbackup/${param}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPhysical(res.data);
          setPhysicalHeight(res.data.Height);
          setPhysicalWeight(res.data.Wieght);
        } else {

        }
      });
  };

  const getstudent = async (
    // teacheryear: number,
    // teachergrade: number,
    // teacherclassroom: number
  ) => {
    fetch(
      
      `${apiUrl}/student/${param}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudent(res.data);

        } else {

        }
      });
  };


  const requestOptionsdelete = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const deletePhysicalBankup = async (
    // teacheryear: number,
    // teachergrade: number,
    // teacherclassroom: number
  ) => {
    fetch(
      
      `${apiUrl}/physicalbackup/${param}`,
      requestOptionsdelete
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
  

        } else {

        }
      });
  };



  useEffect(() => {
    getteacher();
    getstudent();
    getPhysical();
  }, []);

  useEffect(() => {
    let height = Number(physicalHeight)/100
    let allheight = height*height
    setbmi(Number(physicalWeight)/allheight)

  }, [physicalWeight, physicalHeight]);

  return (
    <>
  <Form noValidate   validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>นักเรียน</Form.Label>
        <Form.Select
          name="StudentRecordID"
          aria-label="StudentRecordID"
          value={Student?.ID}
          onChange={handleChange}
          disabled
        >
          <option>{Student?.First_Name} {Student?.Last_Name}</option>

        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
        <Form.Label>น้ำหนัก</Form.Label>
        <InputGroup>
        <Form.Control
          type="number"
          className="Form-control"
          id="Wieght"
          aria-describedby="Wieght"
          value={Physical?.Wieght === 0 ? "" : Physical?.Wieght}
          onChange={e => {
            setPhysicalWeight(e.target.value);
            handleInputChange(e);

          }}
          required
        />
        <InputGroup.Text>กิโลกรัม</InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>ส่วนสูง</Form.Label>
        <InputGroup>
        <Form.Control
          type="number"
          className="Form-control"
          id="Height"
          aria-describedby="Height"
          value={Physical?.Height === 0 ? "" : Physical?.Height}
          onChange={e => {
            setPhysicalHeight(e.target.value);
            handleInputChange(e);

          }}
          required
        />
          <InputGroup.Text>เซนติเมตร</InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>ค่าดัชนีมวลกาย</Form.Label>
        <InputGroup>
        <Form.Control
          type="number"
          className="Form-control"
          id="BMI"
          aria-describedby="BMI"
          value={bmi.toFixed(2)}
          onChange={handleInputChange}
          disabled
        />
          <InputGroup.Text>{bmi <18.5 ? "น้ำหนักต่ำกว่าเกณฑ์" : bmi >= 18.5 && bmi <23 ? "น้ำหนักสมส่วน	":bmi >= 23 && bmi <25 ? "น้ำหนักเกินมาตรฐาน" : bmi >= 25 && bmi <30 ? "อ้วน" : bmi>=30 ? "อ้วนมาก":""}</InputGroup.Text>
        </InputGroup>
      </Form.Group>
   
      <Form.Group className="mb-2">
        <Form.Label>ยืนกระโดดไกล</Form.Label>
        <InputGroup>
        <Form.Control
          type="number"
          className="Form-control"
          id="Longjump"
          aria-describedby="LongjumpHelp"
          value={Physical?.Longjump === 0 ? "" : Physical?.Longjump}
          onChange={handleInputChange}
          required
        />
           <InputGroup.Text>เซนติเมตร</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>วิ่ง 50 เมตร</Form.Label>
        <InputGroup>
        <Form.Control
          type="number"
          className="Form-control"
          id="Run50"
          aria-describedby="Run50Help"
          value={Physical?.Run50 === 0 ? "" : Physical?.Run50}
          onChange={handleInputChange}
          required
        />
             <InputGroup.Text>วินาที</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>แรงบีบมือที่ถนัด</Form.Label>
        <InputGroup>
        <Form.Control
          type="number"
          className="Form-control"
          id="GripStrength"
          aria-describedby="GripStrength"
          value={Physical?.GripStrength === 0 ? "" : Physical?.GripStrength}
          onChange={handleInputChange}
          required
        />
             <InputGroup.Text>กิโลกรัม</InputGroup.Text>
             </InputGroup>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>ลุก-นั่ง 30 วินาที</Form.Label>
        <InputGroup>
        <Form.Control
          type="number"
          className="Form-control"
          id="SitUp"
          aria-describedby="SitUp"
          value={Physical?.SitUp === 0 ? "" : Physical?.SitUp}
          onChange={handleInputChange}
          required
        />
             <InputGroup.Text>ครั้ง</InputGroup.Text>
        </InputGroup>
      </Form.Group>
   
      <Button style={{ float: "left" }} onClick={cancel} variant="secondary" href="/tableclassroom">
        ยกเลิก
      </Button>{" "}
      <Button style={{ float: "right" }} type="submit" variant="success" >
        ยืนยัน
      </Button>{" "}
      </Form>
    </>
  );
}

export default CreatePhysical;
import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { TeacherReocrdsInterface } from "../models/ITeacherRecord";
import { StudentRecordsInterface } from "../models/IStudentRecord";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import CreatePhysical from "./CreatePhysical";
import { ColumnsType, ColumnType } from "antd/es/table";
import { Input, InputRef, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { StudentsInterface } from "../models/IStudent";
import { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";

type DataIndex = keyof StudentsInterface;
function TableClassroom() {
  const [Student, setStudent] = React.useState<StudentRecordsInterface[]>([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [TeacherRecord, setTeacherRecord] = React.useState<
    Partial<TeacherReocrdsInterface>
  >({});
  const [findStudent, setFindStudent] = React.useState<StudentsInterface[]>([]);
  const [param, setparam] = useState(0);
  const arrayStudent: StudentsInterface[] = [];
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  for (let i = 0; i < Student.length; i++) {
    findStudent.filter((item: StudentsInterface) => {


      if (item.ID == Student[i].StudentID) {
        arrayStudent.push(item);
      }
    });
  }

  const handleEdit = (item: any) => {
    navigate(`/update-student/${item}`);
  };

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
          getstudent(
            res.data.TeacherRecordYear,
            res.data.GradeID,
            res.data.ClassRoomID
          );
        } else {
        }
      });
  };

  const getStudentFind = async () => {
    fetch(`${apiUrl}/students`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setFindStudent(res.data);
        }
      });
  };

  const getstudent = async (
    teacheryear: number,
    teachergrade: number,
    teacherclassroom: number
  ) => {
    fetch(
      `${apiUrl}/studentrecords/${teacheryear}/${teachergrade}/${teacherclassroom}`,
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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<StudentsInterface> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="submit"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<StudentsInterface> = [
    {
      title: "รหัสนักเรียน",
      dataIndex: "CodeID",
      ...getColumnSearchProps("CodeID")
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "Full_Name",

      ...getColumnSearchProps("Full_Name")
    },
    {
      title: "อายุ",
      dataIndex: "BirthYear",
      render: (text, record) => {
        return <div>{2566 - record?.BirthYear} ปี</div>;
      },
    },
    {
      title: "ที่อยู่",
      dataIndex: "Address",
    },
    {
      title: "จัดการ",
      dataIndex: "ID",
      render: (text, render) => (
        <>
          <div className="button-mange">
            <Button
              variant="primary"
              onClick={() => {
                setShow(true);
                setparam(render.ID);
              }}
            >
              บันทึกสมรรถนะ
            </Button>

            {
              <Button variant="primary" onClick={(e) => handleEdit(render.ID)}>
                แก้ไขข้อมูลนักเรียน
              </Button>
            }
          </div>
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                บันทึกสมรรถนะ
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreatePhysical param={param} />
            </Modal.Body>
          </Modal>
        </>
      ),
    },
  ];

  useEffect(() => {
    getteacher();
    getStudentFind();
  }, []);

  return (
    <Container>
      <br></br>
      <br></br>
      <Row>
        <Col sm={3}>
          <Form.Group className="mb-2">
            <Form.Label>ปีการศึกษา</Form.Label>
            <Form.Select name="GradeID" aria-label="GradeID" disabled>
              <option>{TeacherRecord.TeacherRecordYear}</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className="mb-2">
            <Form.Label>ชั้น</Form.Label>
            <Form.Select name="GradeID" aria-label="GradeID" disabled>
              <option>ประถมศึกษาปีที่ {TeacherRecord.Grade?.Grade}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col sm={3}>
          <Form.Group className="mb-2">
            <Form.Label>ห้องเรียน</Form.Label>
            <Form.Select name="TeacherID" aria-label="TeacherID" disabled>
              <option>{TeacherRecord.ClassRoom?.Room}</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className="mb-2">
            <Form.Label>ครูประจำชั้น</Form.Label>
            <Form.Select name="TeacherID" aria-label="TeacherID" disabled>
              <option>
                {TeacherRecord.Teacher?.First_Name}{" "}
                {TeacherRecord.Teacher?.Last_Name}
              </option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Table columns={columns} dataSource={arrayStudent} />
     
    </Container>
  );
}

export default TableClassroom;

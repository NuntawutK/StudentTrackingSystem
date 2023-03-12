import React, { useEffect, useState, useRef } from "react";
import { Container, Form, OverlayTrigger, Popover, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UpdateStudent from "./UpdateStudent";
// import { StudentRecordsInterface } from "../models/IStudentRecord";
import { StudentsInterface } from "../models/IStudent";
import { useNavigate } from "react-router-dom";
import { StudentRecordsInterface } from "../models/IStudentRecord";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps, InputRef } from "antd";
import { Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { ClassroomsInterface } from "../models/IClassRoom";
import { GradesInterface } from "../models/IGrade";
import moment from "moment";
import 'dayjs/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';

type DataIndex = keyof StudentsInterface;



function TableStudent() {
  const [Student, setStudent] = React.useState<StudentRecordsInterface[]>([]);
  const [studentRecords, setstudentRecords] = React.useState<
    StudentRecordsInterface[]
  >([]);
  const [StudentRecord, setStudentRecord] = React.useState<
    Partial<StudentRecordsInterface>
  >({});
  const [findStudent, setFindStudent] = React.useState<StudentsInterface[]>([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [ClassRoom, setClassRoom] = React.useState<ClassroomsInterface[]>([]);
  const [Grade, setGrade] = React.useState<GradesInterface[]>([]);

  const arrayStudent: StudentsInterface[] = []
  for (let i = 0; i < Student.length; i++) {
    findStudent.filter((item: StudentsInterface) => {
     

      if (item.ID == Student[i]?.StudentID) {
        arrayStudent.push(item)
      }
    })
    }


  const handleEdit = (item: any) => {
    const id = item.ID;
    navigate(`/update-student/${id}`);
  };

  const handleClick = (item: any) => {
    const id = item.ID;
    getStudentRecords(id);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {

    setStudentRecord({
      ...StudentRecord,
      StudentRecordYear: Number(dateString)+543,
    });

  };


  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const eventvalue = event.target.value === "กรุณาเลือก" ? event.target.value = '0' : event.target.value;
    const name = event.target.name as keyof typeof StudentRecord;
    setStudentRecord({
      ...StudentRecord,
      [name]: Number(eventvalue),
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
        return <div>{2566-record?.BirthYear} ปี</div>
      }
    },
    {
      title: "เบอร์ผู้ปกครอง",
      dataIndex: "Parent_Phone",
      render: (text, record) => {
        return <div>{record?.Parent_Phone}</div>
      }
      
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      render: (text, record) => {
        return (
          <div>
            <div className="button-mange">
            <Button
                    as="input"
                    type="button"
                    value="แก้ไขข้อมูล"
                    onClick={(e) => handleEdit(record)}
                  />
                  <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <Button variant="success" onClick={e => handleClick(record)}>ประวัติชั้นเรียน</Button>
                </OverlayTrigger>

            </div>
          </div>
        )
      },
    },
  ]

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">ประวัติชั้นเรียน</Popover.Header>
      <Popover.Body>
        {studentRecords.map((item: StudentRecordsInterface, index) => (
          <div>{`ปีการศึกษา ${item.StudentRecordYear} ชั้นประถมศึกษาปีที่ ${item.Grade.Grade}/${item.ClassRoom.Room}`}</div>
        ))}
      </Popover.Body>
    </Popover>
  );

  const apiUrl = "http://localhost:8080";
  const requestOptionsget = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
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

  const getStudents = async () => {
    fetch(`${apiUrl}/studentrecords/${StudentRecord.StudentRecordYear}/${StudentRecord.GradeID}/${StudentRecord.ClassRoomID}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudent(res.data);
    
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


  const getStudentRecords = async (id: number) => {
    fetch(`${apiUrl}/studentrecordarray/${id}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setstudentRecords(res.data);
        }
      });
  };

  useEffect(() => {
    getclassroom();
    getgrade();

  }, []);
  useEffect(() => {
    getStudents();
    getStudentFind();
  }, [StudentRecord.ClassRoomID, StudentRecord.GradeID, StudentRecord.StudentRecordYear]);

  useEffect(() => {
    if (StudentRecord.ClassRoomID === undefined) {
      setStudentRecord({ ...StudentRecord, ClassRoomID: 0 });
    }
    if (StudentRecord.GradeID === undefined) {
      setStudentRecord({ ...StudentRecord, GradeID: 0 });
    }
  }, [StudentRecord.ClassRoomID, StudentRecord.GradeID]);






  return (
    <Container>
      <br></br>
      <br></br>

      <Row>
        <Col xs={12}>
          <h4>รายการประวัติของนักเรียน</h4>
        </Col>
        <br></br>
        <br></br>
        <Col xs={2}>
          <Form.Group className="mb-2">
            <Form.Label>ปีการศึกษา</Form.Label>
     
            <DatePicker onChange={onChange} picker="year" locale={locale} />
            
          </Form.Group>
        </Col>

        <Col xs={2}>
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

        <Col xs={2}>
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

        <Col xs={6} className="button-size">
          <Button
            style={{ height: "50px" }}
            href="/studentrecordcreate"
            variant="secondary"
          >
            สร้างประวัติชั้นเรียน
          </Button>
          <Button
            style={{ height: "50px" }}
            href="/createstudent"
            variant="secondary"
          >
            สร้างประวัตินักเรียน
          </Button>{" "}
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Table  columns={columns} dataSource={arrayStudent.length === 0 && (StudentRecord.ClassRoomID === 0)  && (StudentRecord.GradeID === 0)   ? findStudent:arrayStudent } />
    </Container>
  );
}

export default TableStudent;

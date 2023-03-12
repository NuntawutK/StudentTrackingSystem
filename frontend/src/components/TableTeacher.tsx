import React, { useEffect, useState,useRef } from "react";
import { Container, Modal, OverlayTrigger, Popover, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { Input, Space, Table } from 'antd';
import Button from 'react-bootstrap/Button';
import { TeachersInterface } from "../models/ITeacher";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TeacherReocrdsInterface } from "../models/ITeacherRecord";
import { ColumnsType } from "antd/es/table";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";

type DataIndex = keyof TeachersInterface;

function TableTeacher() {

  const [teachers, setTeachers] = React.useState<TeachersInterface[]>([]);
  const [teacherRecords, setTeacherRecords] = React.useState<TeacherReocrdsInterface[]>([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleEdit = (item: any) => {

    const id = item.ID
    navigate(`/update-teacher/${id}`)
}

const handleClick = (item: any) => {
  const id = item.ID;
  getTeacherRecords(id);
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
): ColumnType<TeachersInterface> => ({
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

 const columns: ColumnsType<TeachersInterface> = [
    {
      title: "รหัสคุณครู",
      dataIndex: "CodeID",
      ...getColumnSearchProps("CodeID"),
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "Full_Name",
      ...getColumnSearchProps("Full_Name"),
    },
    {
      title: "อายุ",
      dataIndex: "BirthYear",
      render: (text, record) => {
        return <div>{2566-record?.BirthYear} ปี</div>
      }
    },
    {
      title: "จัดการ",
      dataIndex: "Mange",
      render: (text, record) => {
        return (
          <div className="button-mange">
            <Button as="input" type="button" value="แก้ไขข้อมูล" onClick={(e) => handleEdit(record) }/>
              <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <Button variant="success" onClick={e => handleClick(record)}>ประวัติประจำชั้นเรียน</Button>
                </OverlayTrigger>
            </div>
        )
      }
    }
 ]


const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">ประวัติประจำชั้นเรียน</Popover.Header>
    <Popover.Body>
      {teacherRecords.map((item: TeacherReocrdsInterface, index) => (
        <div>{`ปีการศึกษา ${item.TeacherRecordYear} ชั้นประถมศึกษาปีที่ ${item.Grade.Grade}/${item.ClassRoom.Room}`}</div>
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

const getTeachers = async () => {
  fetch(`${apiUrl}/teachers`, requestOptionsget)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setTeachers(res.data);
      }
    }); 
};

const getTeacherRecords = async (id:number) => {
  fetch(`${apiUrl}/teacherrecord/${id}`, requestOptionsget)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setTeacherRecords(res.data);
      }
    }); 
};

  useEffect(() => {

    getTeachers();

  }, []);


  return (
    <Container>
     
        <br></br>
        <br></br>
      <Row>
        <Col xs={6}>
        <h4>รายการประวัติของคุณครู</h4>
        </Col>
        <Col xs={6} className="button-size" >
        <Button 
            href="/teacherrecord"
            variant="secondary">สร้างประวัติชั้นเรียน</Button>
          <Button
            href="/createteacher"
            variant="secondary">สร้างประวัติคุณครู</Button>{' '}
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Table  columns={columns} dataSource={teachers} />

    </Container>
  );
}

export default TableTeacher;
import React,{useState, useEffect} from "react";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  
} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import { MoreHorizontal } from "react-feather";
import ClassroomApi from "../../../api/ClassroomApi";
const Products = () => {
  const datatable = {
    columns: [
      {
        label: 'Tên Lớp',
        field: 'fullName',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Lịch Học',
        field: 'schedule',
        width: 120,
      },
      {
        label: 'Thời Gian',
        field: 'time',
        width: 200,
      },
      {
        label: 'Sĩ Số',
        field: 'total',
        sort: 'asc',
        width: 80,
      },
      {
        label: 'Giáo Viên',
        field: 'teacherName',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        width: 100,
      }
    ],
    rows: [
      
    ],
  };  
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const getAllClassList = async () =>{
      const result = await ClassroomApi.getAllClassList();
      setClasses(result);
    }
    getAllClassList();
    console.log("render");
  }, []);

  classes.map(clazz => datatable.rows.push(
    {
      fullName: clazz.subjectName + " " + clazz.grade + clazz.className,
      schedule: (clazz.schedule !== "1") ? "Thứ "+clazz.schedule : "Chủ Nhật",
      time: clazz.startTime +" - "+clazz.endTime,
      total: clazz.totalStudent,
      teacherName: clazz.teacherId.fullName,
      action: <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg>
              </button>
    }
  ))


  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <div className="card-actions float-right">
          <UncontrolledDropdown>
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle tag="h5" className="mb-0">
          Danh Sách Lớp Học
        </CardTitle>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 hover scrollX entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
    );
}
export default Products;

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
import TeacherApi from "../../../api/TeacherApi";
import MentorApi from "../../../api/MentorApi";
const ClassList = (props) => {
  const datatable = {
    columns: [
      {
        label: 'ID',
        field: 'id',
   
       
      },
      {
        label: 'Tên Lớp',
        field: 'fullName',
   
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Lịch Học',
        field: 'schedule',
    
      },
      {
        label: 'Thời Gian',
        field: 'time',

      },
      {
        label: 'Giáo Viên',
        field: 'teacherName',
        sort: 'disabled',

      },
      {
        label: 'Action',
        field: 'action',
      }
    ],
    rows: [
      
    ],
  };  
  const [classes, setClasses] = useState([]);
  const setModalUpdateClass = props.setModalUpdateClass;
  const setSuggestMentor = props.setSuggestMentor;
  const setSuggestTeacher = props.setSuggestTeacher;
  const setClassroom = props.setClass;
  const setWatch = props.setWatch;
  
  const watchingClass = (clazz) =>{
      setClassroom(clazz);
      setWatch(true);
  }

  const updatingClass = async (clazz) => {
      setClassroom(clazz);
      console.log(clazz);
      const teachers = await TeacherApi.getListTeacherBySubject(clazz.subjectName);
      setSuggestTeacher(teachers);
      const mentors = await MentorApi.getAllMentor();
      setSuggestMentor(mentors);
      setModalUpdateClass(true);

  }

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
      id:clazz.id,
      fullName: clazz.subjectName + " " + clazz.grade + clazz.className,
      schedule: (clazz.schedule !== "1") ? "Thứ "+clazz.schedule : "Chủ Nhật",
      time: clazz.startTime +" - "+clazz.endTime,
      teacherName: clazz.teacherId.fullName,
      action: <>
                <button onClick={() => watchingClass(clazz)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>
                </button>
                <button onClick={() => updatingClass(clazz)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
              </>
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
            <MDBDataTableV5 
            hover 
            responsive
            searchTop searchBottom={false}
            entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
    );
}
export default ClassList;

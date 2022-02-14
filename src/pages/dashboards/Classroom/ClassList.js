import React from "react";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Input
} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';

import ClassroomApi from "../../../api/ClassroomApi"
import TeacherApi from "../../../api/TeacherApi";
import MentorApi from "../../../api/MentorApi";
import View from "@material-ui/icons/Visibility"
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
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
        label: '',
        field: 'action',
      }
    ],
    rows: [
      
    ],
  };  
  
  const setModalUpdateClass = props.setModalUpdateClass;
  const setSuggestMentor = props.setSuggestMentor;
  const setSuggestTeacher = props.setSuggestTeacher;
  const setClassroom = props.setClass;
  const setWatch = props.setWatch;
  const classes = props.classes;
  const setClasses = props.setClasses;
  const grade = props.grade;
  const setGrade = props.setGrade;

  const watchingClass = async (clazz) =>{
      const res = await ClassroomApi.getClassById(clazz.id);
      setClassroom(res);
      setWatch(true);
  }

  const updatingClass = async (clazz) => {
      const res = await ClassroomApi.getClassById(clazz.id);
      setClassroom(res);
    
      if(clazz.subjectName === "Toán Đại" || clazz.subjectName === "Toán Hình"){
        const teachers = await TeacherApi.getListTeacherBySubject("Toán");
        setSuggestTeacher(teachers);
      }
      else{
        const teachers = await TeacherApi.getListTeacherBySubject(clazz.subjectName);
        setSuggestTeacher(teachers);
      }
      const mentors = await MentorApi.getAllMentor();
      setSuggestMentor(mentors);
      setModalUpdateClass(true);

  }
  const toggleDelete = async (clazz) => {
    var requested = window.confirm("Bạn có chắc chắn muốn xóa lớp học này?");
  
    if ( requested) {
        const res = await ClassroomApi.deleteClass(clazz.id);
        if (res === "delete successful!"){
            const newClassList = await ClassroomApi.getListClassroomInGrade(grade);
            setClasses(newClassList);
            alert("Xóa lớp học thành công!");
        }
    }
  };
  

  classes.map(clazz => datatable.rows.push(
    {
      id:clazz.id,
      fullName: clazz.subjectName + " " + clazz.grade + clazz.className,
      schedule: (clazz.schedule !== "1") ? "Thứ "+clazz.schedule : "Chủ Nhật",
      time: clazz.startTime +" - "+clazz.endTime,
      teacherName: clazz.teacherId.fullName,
      action: <>
                <button style={{background:"none",border:"none"}} onClick={() => watchingClass(clazz)}>
                    <View color ="primary" />
                </button>
                <button style={{background:"none",border:"none"}} onClick={() => updatingClass(clazz)}>
                    <Edit color="action"/>
                </button>
                <button style={{background:"none",border:"none"}} onClick={() => toggleDelete(clazz)}>
                    <Delete color="secondary"/>
                </button>
              </>
    }
  ))


  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <div style={{display:"flex", justifyContent:"flex-start"}}>
            <CardTitle tag="h5" className="mb-0">
              Danh Sách Lớp Học
            </CardTitle>
                <Row className="ml-auto">
                  <Col xs="auto">
                    <Input 
                              id ="grade"
                              type="select"
                              name="grade"
                              value={grade}
                              onChange={ (e) =>{
                                setGrade(e.target.value);
                              }}
                            >
                              <option value = "12">Khối 12</option>
                              <option value = "11">Khối 11</option>
                              <option value = "10">Khối 10</option>
                              <option value = "9">Khối 9</option>
                              <option value = "8">Khối 8</option>
                              <option value = "7">Khối 7</option>
                              <option value = "6">Khối 6</option>
                      </Input>
                    </Col>
                  </Row>
        </div>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 
            hover 
            responsive
            searchTop searchBottom={false}
            entriesOptions={[5,10, 20, 50,100]} entries={5} pagesAmount={5} data={datatable} />
        </CardBody>
    </Card>
    );
}
export default ClassList;

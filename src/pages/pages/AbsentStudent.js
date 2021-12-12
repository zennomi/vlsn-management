import React, {useEffect,useState} from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Button
} from "reactstrap";

import { MDBDataTableV5 } from 'mdbreact';
import Header from "./Header";
import Moment from 'moment';
import AttendanceApi from "../../api/AttendanceApi";
import ClassroomApi from "../../api/ClassroomApi";

// chuyển về thứ {dayInNumber}
const getWeeklyDay = (dayInNumber) => {
    var todayTransfer = new Date();
    var day = todayTransfer.getDay() || 7 ;
    if( day !== dayInNumber - 1 ){
      todayTransfer.setHours(-24 * (day - (dayInNumber - 1))); 
    }
    return Moment(todayTransfer).format('YYYY-MM-DD');;
}

const AbsentListInWeek = (props) =>{ 

  const datatable = {
    columns: [
      {
        label: 'Họ Tên',
        field: 'fullName',
        width: 200,
      },
      {
        label: 'Trường học',
        field: 'school',
        width: 250,
      },
      {
        label: 'SĐT',
        field: 'studentNumber',
        width: 200,
      },
      {
        label: 'Lớp',
        field: 'absentClass',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Tên PH',
        field: 'parentName',
        width: 150,
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
        width: 100,
      },
      {
        label: 'Action',
        field: 'action',
        width: 150,
      },
    ],
    rows: [
       
    ]
  }; 
  const weeklyToday = new Date().getDay() + 1;
  const [grade,setGrade] = useState(12);
  const [subject,setSubject] = useState("Toán Đại");
  const [day,setDay] = useState(weeklyToday);
  const [listStudent, setList] = useState([]);

  useEffect(() => {
    const getAllAbsentStudentAttendanceInWeeklyDay = async () =>{
        const res = await AttendanceApi.getListAbsentStudentInWeeklyDay(grade,subject,getWeeklyDay(day));
        setList(res);
    }
    getAllAbsentStudentAttendanceInWeeklyDay();
    console.log("render");
  }, [grade,day,subject]);


  useEffect(() => {
    console.log("rerender");
    console.log(subject);
    console.log(getWeeklyDay(day));
    console.log(grade);
  });

  listStudent.map(st => datatable.rows.push({
      id: st.id,
      firstName: st.firstName,
      lastName: st.lastName,
      fullName: st.fullName,
      status: st.status,
      school: st.school,
      grade: st.grade,
      className: st.className,
      absentClass: st.grade + st.className,
      studentNumber: st.studentNumber,
      parentNumber: st.parentNumber,
      parentName: st.parentName
  }))
  
  return(
  <> 
    <Card>
      <CardHeader>
        <div style={{display:"flex", justifyContent:"flex-start"}}>
        <CardTitle tag="h5" className="mb-0">
          Học Sinh Nghỉ Học Trong Tuần
        </CardTitle>
        
              <Row className="ml-auto">
                    <Col lg="6.5" >
                        <Input 
                              
                  
                              id ="subject"
                              type="select"
                              name="subject"
                              value={subject}
                              onChange={ async (e) =>{

                                  setSubject(e.target.value);
                                  console.log(e.target.value);
                                  console.log(getWeeklyDay(day));
                                  console.log(grade);
                              }}
                            >
                              <option value = "Toán Đại">Toán Đại</option>
                              <option value = "Toán Hình">Toán Hình</option>
                              <option value = "Tiếng Anh">Tiếng Anh</option>
                              <option value = "Lý">Lý</option>
                              <option value = "Hóa">Hóa</option>
                              <option value = "Văn">Văn</option>
                            
                      </Input>
                    </Col>
                    <Col xs="auto">
                      {/* <label>Chọn lớp:</label> */}                    
                       <Input 
                              
                       
                              id ="weeklyday"
                              type="select"
                              name="weeklyday"
                              value={day}
                              onChange={  (e) =>{
                                // do something
                                setDay(e.target.value);
                                console.log(subject);
                                console.log(getWeeklyDay(e.target.value));
                                console.log(grade);
                              }}
                            >
                              <option value = "2">Thứ 2</option>
                              <option value = "3">Thứ 3</option>
                              <option value = "4">Thứ 4</option>
                              <option value = "5">Thứ 5</option>
                              <option value = "6">Thứ 6</option>
                              <option value = "7">Thứ 7</option>
                              <option value = "8">CN</option>
                      </Input>
                    </Col>
                    <Col lg="6.5" >
                        <Input 
                              id ="grade"
                              type="select"
                              name="grade"
                              value={grade}
                              onChange={ (e) =>{
                                console.log(subject);
                                console.log(getWeeklyDay(day));
                                console.log(e.target.value);
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
          searchTop
          searchBottom={false}
          entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable} />
      </CardBody>
    </Card>
    
  </>
    );
}
const AttendanceList = (props) =>{ 

  const[grade,setGrade] = useState(12);
  const[subject,setSubject] = useState("Toán Đại");
  
  const [classes, setClasses] = useState([]);
  const [students,setStudents]=useState([]);

  const datatable = {
    columns: [
      {
        label: 'Họ Tên',
        field: 'fullName',
      },
      {
        label: 'Trường học',
        field: 'school',

      },
      {
        label: 'SĐT',
        field: 'studentNumber',

      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
     
      },

    ],
    rows: [
       
    ]
  }; 
  const datatable2 = {
    columns: [
      {
        label: 'Tên Lớp',
        field: 'fullName',
       
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
  const setClassId = async (classId) => {
      const listStudents = await AttendanceApi.getListStudentAttendanceInClass(classId);
      setStudents(listStudents);
  }

  useEffect(() => {
    const getAllSubjectClassInGrade = async () =>{
        const res = await ClassroomApi.getListSubjectClassroomInGrade(grade,subject);
        setClasses(res);
    }
    getAllSubjectClassInGrade();
    
  }, [grade,subject]);

  classes.map(clazz => datatable2.rows.push({
      fullName: clazz.subjectName + " " + clazz.grade + clazz.className,
      schedule: (clazz.schedule !== "1") ? "Thứ "+clazz.schedule : "Chủ Nhật",
      time: clazz.startTime +" - "+clazz.endTime,
      total: clazz.totalStudent,
      teacherName: clazz.teacherId.fullName,
      action: <Button color="primary" style={{borderRadius:"15px"}} onClick={() => setClassId(clazz.id) }>Xem</Button>
  }))

  console.log(students);

  const first = (students[0] !== undefined) ? students[0] : {listAtten:[]};

  first.listAtten.map(res =>
      datatable.columns.push({
        label: res.date,
        field: res.date,
      })  
  )
  students.map(st => 
      st.listAtten.map(res => 
          st[res.date] = res.status
      )
    
  )
  datatable.rows = students;
  console.log(students);
  return(
  <> 
      <div className='header' style={{marginBottom:"5px"}}>
      <h1 className='title'>DANH SÁCH ĐIỂM DANH</h1>
          
          <Row>
                <Col xs="auto">
                    <div >
                      <div className ="d-flex">
                        <Row>
                            <Col>
                                  <Input 
                                  type="select"
                                  id="grade"
                                  name="grade"
                                  onChange={ async (e) =>{
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
                            <Col lg="6.5">
                              <Input 
                                  type="select"
                                  id="subject"
                                  name="subject"
                                  onChange={ async (e) =>{
                                    setSubject(e.target.value);
                                }}
                                >
                                              <option value="Toán Đại">Toán Đại</option>
                                              <option value="Toán Hình">Toán Hình</option>
                                              <option value="Tiếng Anh">Tiếng Anh</option>
                                              <option value="Hóa">Hóa</option>
                                              <option value="Văn">Văn</option>
                                              <option value="Lý">Lý</option>
                                              <option value="Sinh">Sinh</option>
                                </Input>
                            </Col>
                            
                        </Row>
                      </div>
                    </div>
                </Col>
                
          </Row>
      </div>
    <Card>
      <CardBody>
          <MDBDataTableV5 
          responsive 
          theadColor="primary-color" 
          searchTop searchBottom={false} 
          theadTextWhite bordered  hover  entriesOptions={[5,10, 20, 50,100]} 
          entries={5} pagesAmount={5} data={datatable2} />
          <br/>
          <MDBDataTableV5 
          responsive theadColor="primary-color" 
          searchTop searchBottom={false} theadTextWhite 
          bordered borderless={false} hover  entriesOptions={[50,100, 150, 200,300,400]} 
          entries={50} pagesAmount={50} data={datatable} />
      </CardBody>
    </Card>
  </>
    );
}

const AbsentStudent = (props) => {

  
 
  return(
    
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col>
        <AbsentListInWeek {...props}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <AttendanceList {...props}/>
      </Col>
    </Row>
  </Container>
  );
}
// const mapGlobalStateToProps = state => {
//   return {
//     students: selectListStudent(state)
//   };
// };

// export default connect(mapGlobalStateToProps, { getAllStudentAction })(Clients);
export default AbsentStudent;
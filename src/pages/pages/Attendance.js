import React, {useEffect, useState} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button
} from "reactstrap";
import Moment from 'moment';
import { Formik,FastField, Form  } from 'formik';
import { MDBDataTable } from 'mdbreact';
import { ReactstrapInput } from "reactstrap-formik";
import AttenDanceApi from "../../api/AttendanceApi";
const Attendance = (props) =>{ 
    
    const today = Moment(Date.now()).format('DD-MM-YYYY');
    const todayInMonth = Moment(Date.now()).format('DD-MM');
    const today2 = Moment(Date.now()).format('YYYY-MM-DD');
    const content = "";
    const clazz = props.location.state;

    const submitAbsentStudents = async () => {
        const nowTime = new Date();
        const dateNow = new Date(nowTime.getTime() - 30*60000 );
        const rightNow = Moment(dateNow).format('HH:mm:ss');
        if (rightNow < clazz.start){
            alert("Chưa hết giờ điểm danh! kết quả của bạn vẫn có thể sửa đổi");

            const listAbsent = [];
            listStudentNotInClass.map((student,i) => listAbsent.push(
              {
                classroomId: clazz.classId,
                dateId: today2,
                status: "A",
                studentId: student.id
              }
            ))
            const res = await AttenDanceApi.studentListAtten(listAbsent);
            if(res === "atten successful!"){
              alert("Lưu kết quả thành công!")
            }
        }
        else{
            alert("Đã hết giờ điểm danh! kết quả của bạn không thể sửa đổi");
            const listAbsent = [];
            listStudentNotInClass.map((student,i) => listAbsent.push(
              {
                classroomId: clazz.classId,
                dateId: today2,
                status: "A",
                studentId: student.id
              }
            ))
            const res = await AttenDanceApi.studentListAtten(listAbsent);
            if(res === "atten successful!"){
              alert("Lưu kết quả thành công!")
            }
        }
        
    }

    console.log(clazz);

    const resetAttendancePage = async () => {
      const absentSt = await AttenDanceApi.getListStudentNotInClassToday(clazz.classId);
      const attenedSt = await AttenDanceApi.getListStudentAttendanceToday(clazz.classId);
      const subStudent = await AttenDanceApi.getListSubStudentInClassToday(clazz.classId);
      setSubList(subStudent);
      setAbsentStudents(absentSt);
      setAttendStudents(attenedSt);
    }

    const [listStudentNotInClass, setAbsentStudents] = useState([]);
    const [attenedStudents, setAttendStudents] = useState([]);
    const [subStudentInClass, setSubList] = useState([]);

      const data = {
        columns: [
          {
            label: 'Họ Tên',
            field: 'fullName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Trường',
            field: 'school',
            sort: 'asc',
            width: 150
          },
          {
            label: todayInMonth,
            field: 'attendanceStatus',
            sort: 'asc',
            width: 150
          }
          
        ],
        rows: []
      };
      const data1 = {
        columns: [
          {
            label: 'Họ Tên',
            field: 'fullName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Trường',
            field: 'school',
            sort: 'asc',
            width: 150
          },
         
        ],
        rows: []
      };
      const data3 = {
        columns: [
          {
            label: 'Họ Tên',
            field: 'fullName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Trường',
            field: 'school',
            sort: 'asc',
            width: 150
          },
          {
            label: todayInMonth,
            field: 'attendanceStatus',
            sort: 'asc',
            width: 150
          }
          
        ],
        rows: []
      };

      useEffect(() => {
        const getAllStudentAttendanceInClass = async () =>{
          const absentSt = await AttenDanceApi.getListStudentNotInClassToday(clazz.classId);
          const attenedSt = await AttenDanceApi.getListStudentAttendanceToday(clazz.classId);
          const subStudent = await AttenDanceApi.getListSubStudentInClassToday(clazz.classId);
          setSubList(subStudent);
          setAbsentStudents(absentSt);
          setAttendStudents(attenedSt);
        }
        getAllStudentAttendanceInClass();
        console.log("render");
      }, [clazz.classId]);
      
      useEffect(() => {
        console.log("rerender attendance!");
      });

      data.rows = attenedStudents;
      data1.rows = listStudentNotInClass;
      data3.rows = subStudentInClass;

    return (
        <Container fluid className="p-0">
            <h1 className="h3 mb-3">Thông Tin Lớp Học Ngày {today}</h1>
            <Row>
            <Col>
                <Card>
                <CardHeader>
                {/* <h2>{props.location.state.classId}</h2> */}
                <h5>{clazz.className +" - Thầy " + clazz.teacherName + " Thứ " + clazz.day + ": " + 
                    clazz.start + " - " + clazz.end} </h5>
                <Formik
                  initialValues={
                    {
                      contentTitle: '',
                    }
                  }
                  onSubmit={(values) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                    }, 500);
                  }}
                >
                    <Form>
                      <Row>
                        <Col lg="6">
                          <FastField
                              label ={"Nội dung bài học" + content}
                              type="text"
                              name="contentTitle"
                              placeholder="Nhập nội dung bài học"
                              component={ReactstrapInput}      
                          />
                          <Button  type="submit" >Xác nhận</Button>
                        </Col>
                        
                      </Row>
                    </Form>
                </Formik>
                </CardHeader>
                  
                  <CardBody>
                    <Row>
                      <Col style={{display:"flex"}}>
                        <h5>Tổng số học sinh đi học: {data.rows.length}</h5> 
                        <div style={{marginLeft:"10px"}}>
                          <button onClick={resetAttendancePage} style={{border:"1px solid", backgroundColor:"white", color:"black", borderRadius:"5px",padding: "3px 10px"}}>
                          
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                            </svg>
                          
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <CardBody >
                          <MDBDataTable hover scrollY scrollX entries={100} displayEntries={false} data={data}/>
                    </CardBody>
                  </CardBody>
                  <CardBody>
                    <Row>
                      <Col style={{display:"flex"}}>
                        <h5>Tổng số học sinh đi học bù: {data3.rows.length}</h5> 
                        <div style={{marginLeft:"10px"}}>
                          <button onClick={resetAttendancePage}  style={{border:"1px solid", backgroundColor:"white", color:"black", borderRadius:"5px",padding: "3px 10px"}}>
                          
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                            </svg>
                          
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <CardBody>
                          <MDBDataTable  hover scrollY scrollX entries={100} displayEntries={false} data={data3} />
                    </CardBody>
                  </CardBody>
                  <CardBody>
                    <Row>
                      <Col style={{display:"flex"}}>
                        <h5>Tổng số học sinh nghỉ: {data1.rows.length}</h5> 
                        <div style={{marginLeft:"10px"}}>
                          <button onClick={resetAttendancePage}  style={{border:"1px solid", backgroundColor:"white", color:"black", borderRadius:"5px",padding: "3px 10px"}}>
                          
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                            </svg>
                          
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <CardBody>
                          <MDBDataTable  hover scrollY scrollX entries={100} displayEntries={false} data={data1} />
                          <Button onClick={submitAbsentStudents}>Xác Nhận</Button>
                    </CardBody>
                  </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
    );
}
export default Attendance;

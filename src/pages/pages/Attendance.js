import React, {useEffect, useState} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import Moment from 'moment';
import { Formik,FastField, Form  } from 'formik';
import * as Yup from 'yup';
import { MDBDataTable } from 'mdbreact';
import { ReactstrapInput } from "reactstrap-formik";
import AttenDanceApi from "../../api/AttendanceApi";
import LessonApi from "../../api/LessonApi";
import ChapterApi from "../../api/ChapterApi";
import HomeWorkApi from "../../api/HomeWorkApi";
import { Autocomplete } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField';
const Attendance = (props) =>{ 
    
    const today = Moment(Date.now()).format('DD-MM-YYYY');
    const todayInMonth = Moment(Date.now()).format('DD-MM');
    const today2 = Moment(Date.now()).format('YYYY-MM-DD');
   
    const clazz = props.location.state;

    const [lesson,setLesson] = useState({});
    const [currentLesson, setCurrentLesson] = useState({});
    const [modalSubmitStudentHomeWork,setModalSubmitStudentHomeWork] = useState(false);
    const [listStudentNotSubmittedHomeWork, setListStudentNotSubmittedHomeWork] = useState([]);
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

    const [modalCreateLesson, setModalCreateLesson] = useState(false);
    const [suggestChapters, setSuggestChapter] = useState([]);

      const data = {
        columns: [
          {
            label: 'Họ Tên',
            field: 'fullName',
            sort: 'asc',
            
          },
          {
            label: 'Trường',
            field: 'school',
            sort: 'asc',
         
          },
          {
            label: todayInMonth,
            field: 'attendanceStatus',
            sort: 'asc',
        
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
         
          },
          {
            label: 'Trường',
            field: 'school',
            sort: 'asc',
       
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
         
          },
          {
            label: 'Trường',
            field: 'school',
            sort: 'asc',
         
          },
          {
            label: todayInMonth,
            field: 'attendanceStatus',
            sort: 'asc',
     
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
      }, [clazz.classId]);


      useEffect(() => {
        const getCurrentLesson = async () =>{
            const res = await LessonApi.getCurrentLessonInClassToday(clazz.classId);
            if(res !== "empty"){
              setCurrentLesson(res);
            }
        }
        const getStudentNotSubmitedHomeWork = async () =>{
          const res = await HomeWorkApi.getStudentNotSubmittedHomeWorkInLesson(clazz.classId,currentLesson.id);
          setListStudentNotSubmittedHomeWork(res);
        }
        getCurrentLesson();
        if(Object.keys(currentLesson).length !== 0){
          getStudentNotSubmitedHomeWork();
        }
      }, [clazz.classId,currentLesson.id,currentLesson]);

      useEffect(() => {
        const getLessonInClass = async () =>{
            const response = await LessonApi.getLessonInClassToday(clazz.classId);
            if (response !== "empty"){
                setLesson(response);
            }
            
        }
        getLessonInClass();
      }, [clazz.classId]);
      useEffect(() => {
        const getAllSuggestChapter = async () =>{
        const response = await ChapterApi.getAllSubjectChapterInGrade(clazz.grade,clazz.subjectName)
        setSuggestChapter(response)
        }
        getAllSuggestChapter();
      }, [clazz.grade,clazz.subjectName]);

      data.rows = attenedStudents;
      data1.rows = listStudentNotInClass;
      data3.rows = subStudentInClass;

      
      const mapNotSubmittedId = {};
      listStudentNotSubmittedHomeWork.map(st => mapNotSubmittedId[st.id] = st.id);
      var listStudentNotSubmittedHomeWorkId = [];
      listStudentNotSubmittedHomeWork.map(st => listStudentNotSubmittedHomeWorkId.push(st.id));

      const listStudentMustHaveHomeWork = [];
      attenedStudents.map(e => (mapNotSubmittedId[e.id] === undefined) ? listStudentMustHaveHomeWork.push(e) : null);
      subStudentInClass.map(e => listStudentMustHaveHomeWork.push(e));

    return (
        <Container fluid className="p-0">
            <h1 className="h3 mb-3">Thông Tin Lớp Học Ngày {today}</h1>
            <Row>
            <Col>
                 
                <Card>
                <CardHeader>

                {/* <h2>{props.location.state.classId}</h2> */}
                <h5>{clazz.className +" - GV. " + clazz.teacherName+" " + ((clazz.day !== "1") ? "- Thứ " + clazz.day : "- Chủ Nhật ") + ": " + 
                    clazz.start + " - " + clazz.end} </h5>
                {(Object.keys(lesson).length === 0) ? <Button color="primary" onClick={() => setModalCreateLesson(true)}>Thêm bài học hôm nay</Button> : 
                <h6>Nội dung bài học: {lesson.chapter.chapterName} - {lesson.lessonName} </h6>}
               
               <Modal isOpen={modalCreateLesson} toggle={setModalCreateLesson}>
                          <ModalHeader>
                                Tạo bài học mới 
                          </ModalHeader>
                          <ModalBody>
                              <Formik
                                    initialValues={
                                      {
                                        lessonName:"",
                                        date:"",
                                        chapterId:0
                                      }
                                      
                                    }
                                    validationSchema={
                                      Yup.object({
                                        lessonName: Yup.string()
                                          .required('Bắt buộc')
                                          .max(50, 'Tên bài học không được vượt quá 50 kí tự')
                                          .min(6, 'Tên bài học ít nhất 6 kí tự'),
                                        date: Yup.string()
                                          .required("Bắt buộc"),
                                        chapterId: Yup.string()
                                            .required("Bắt buộc")
                                      })
                                    }
                                    onSubmit={async (values) => {
                                          console.log(values);
                                          const date = new Date(values.date);
                                          console.log(date);
                                          const dateFormat = Moment(date).format('DD-MM-YYYY');
                                          console.log(dateFormat);
                                          const newLesson = await LessonApi.createNewLessonInClass(
                                            clazz.classId,
                                            values.lessonName,
                                            dateFormat,
                                            values.chapterId
                                          )
                                          if (newLesson === "create successful!"){

                                            alert("tạo bài học thành công!");

                                            const response = await LessonApi.getLessonInClassToday(clazz.classId);
                                            setLesson(response);
                                            setModalCreateLesson(false);
                                          }else{
                                            alert("tạo thất bại!")
                                          }

                                    }}
                                
                                >
                                {({setFieldValue, values}) => 
                                    <Form>
                                        <FastField
                                                label="Tên bài học:"
                                                bsSize="lg"
                                                type="text"
                                                name="lessonName"
                                                component={ReactstrapInput}
                                              />
                                        <FastField
                                                label="Ngày học"
                                                bsSize="lg"
                                                type="date"
                                                name="date"
                                                component={ReactstrapInput}
                                              />
                                        <Label style={{marginBottom: "4px"}}>Chọn chương học</Label>
                                        <Autocomplete
                                          id="multiple-limit-tags1"
                                          name="chapterId"
                                          onChange={(e, value) => {
                                            setFieldValue("chapterId", value.id)
                                          }}
                                          options={suggestChapters}
                                          getOptionSelected={(option,value) => option.id === value.id}
                                          getOptionLabel={(option) => option.chapterName}
                                          renderInput={(params) => (
                                            <TextField {...params} name="chapterId" variant="outlined" label="Chọn chương học" />
                                          )}
                                        />
                                        <Button color="primary" type="submit">Thêm</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalCreateLesson(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 

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
                          <MDBDataTable hover 
                          scrollY 
                          responsive
                          entries={150} displayEntries={false} data={data}/>
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
                          <MDBDataTable  hover 
                          scrollY 
                          responsive
                          entries={150} displayEntries={false} data={data3} />
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
                          <MDBDataTable  hover 
                          scrollY 
                          responsive
                          entries={150} displayEntries={false} data={data1} />
                          <Button color="primary" onClick={submitAbsentStudents}>Xác Nhận</Button>
                    </CardBody>
                  </CardBody>
                </Card>
            </Col>

            </Row>
            <Row>
                {(Object.keys(currentLesson).length !== 0) ? 
                <Button onClick={() => setModalSubmitStudentHomeWork(true)} color="primary">Học sinh không làm btvn</Button> : null}
                <Modal isOpen={modalSubmitStudentHomeWork} toggle={setModalSubmitStudentHomeWork}>
                        <ModalBody>
                                <h1>Học sinh thiếu btvn</h1>
                                <Formik
                                        initialValues={
                                          {
                                              listUnSubmittedHomeWork:[]
                                          }
                                        }
                                        onSubmit={async (values) => {
                                            const mapId = {};
                                            values.listUnSubmittedHomeWork.map(student => mapId[student.id]= student.id);
                                            var listId = [];
                                            listStudentMustHaveHomeWork.map(st => (mapId[st.id] === undefined) ? listId.push(st.id) :
                                            null)
                                            console.log(mapId);
                                            console.log(listId);
                                            const res = await HomeWorkApi.submitHomework(clazz.classId,listId);
                                            if (res === "submit successful!"){
                                              alert("Lưu học sinh không làm btvn thành công!");
                                              setModalSubmitStudentHomeWork(false);
                                            }
                                        }}
                                    
                                    >
                                    {({setFieldValue, values}) => 
                                        <Form>
                                            <ul>
                                              Học sinh thiếu btvn:
                                              {listStudentNotSubmittedHomeWork.map((st,i) => 
                                                  <li key={i}>{st.fullName} - {st.id}</li>
                                              )}
                                            </ul>
                                            <Autocomplete
                                                multiple
                                                limitTags={2}
                                                label="Học Sinh Thiếu BTVN"
                                                id="multiple-limit-tags"
                                                value={values.listUnSubmittedHomeWork}
                                                name="listUnSubmittedHomeWork"
                                                onChange={(e, value) => {
                                                  setFieldValue("listUnSubmittedHomeWork", value)
                                                }}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                options={listStudentMustHaveHomeWork}
                                                getOptionLabel={(option) => option.fullName + " - " + option.id }
                                                renderInput={(params) => (
                                                  <TextField {...params} name="listUnSubmittedHomeWork" variant="outlined" label="Học Sinh Thiếu BTVN"  />
                                                )}
                                              />
                                            <Button color="primary" type="submit">Thêm</Button>
                                            <Button color="primary" onClick={() => setModalSubmitStudentHomeWork(false)}>Hủy</Button>
                                        </Form>
                                      }
                                  </Formik>
                        </ModalBody>
                </Modal>
            </Row>

            
        </Container>
    );
}
export default Attendance;

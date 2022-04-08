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
  ModalHeader,
 
} from "reactstrap";
import Moment from 'moment';
import { Formik,FastField, Form  } from 'formik';
import * as Yup from 'yup';
import { MDBDataTableV5 } from 'mdbreact';
import { ReactstrapInput } from "reactstrap-formik";
import AttenDanceApi from "../../api/AttendanceApi";
import LessonApi from "../../api/LessonApi";
import ChapterApi from "../../api/ChapterApi";
import HomeWorkApi from "../../api/HomeWorkApi";
import { Autocomplete } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField';
import Delete from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";
import AttendanceApi from "../../api/AttendanceApi";

function format_two_digits(n) {
  return n < 10 ? '0' + n : n;
}


const Attendance = (props) =>{ 
    
    const today = Moment(Date.now()).format('DD-MM-YYYY');
    const today3 = Moment(Date.now()).format('YYYY-MM-DD');
    const todayInMonth = Moment(Date.now()).format('DD-MM');
    const today2 = Moment(Date.now()).format('YYYY-MM-DD');
   
    const clazz = props.location.state;

    const [isLoading,setIsLoading] = useState(false);
    const [success,setSuccess] = useState(false);

    const [lesson,setLesson] = useState({});
    const [currentLesson, setCurrentLesson] = useState({});
    const [modalSubmitStudentHomeWork,setModalSubmitStudentHomeWork] = useState(false);
    const [modalDeleteSubmitStudentHomeWork,setModalDeleteSubmitStudentHomeWork] = useState(false) // modal để thêm các hs thiếu btvn, ( xóa các hs đã nộp btvn )
    const [listStudentNotSubmittedHomeWork, setListStudentNotSubmittedHomeWork] = useState([]); // danh sach hs chua hoan thanh
    const [listStudentSubmittedHomeWork, setListStudentSubmittedHomeWork] = useState([]); // danh sach hs da hoan thanh btvn

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

    

    const resetAttendancePage = async () => {
      const absentSt = await AttenDanceApi.getListStudentNotInClassToday(clazz.classId);
      const attenedSt = await AttenDanceApi.getListStudentAttendanceToday(clazz.classId);
      const subStudent = await AttenDanceApi.getListSubStudentInClassToday(clazz.classId);
      setSubList(subStudent);
      setAbsentStudents(absentSt);
      setAttendStudents(attenedSt);
    }

    const resetHomeWorkPage = async () => {
      const listSubmittedSt = await HomeWorkApi.getStudentSubmittedHomeWorkInLesson(clazz.classId,currentLesson.id);
      const listUnSubmittedSt = await HomeWorkApi.getStudentNotSubmittedHomeWorkInLesson(clazz.classId,currentLesson.id);
      if(listSubmittedSt !== "empty"){
        setListStudentSubmittedHomeWork(listSubmittedSt);
      }
      else{
        setListStudentSubmittedHomeWork([]);
      }
      if (listUnSubmittedSt !== "empty"){
        setListStudentNotSubmittedHomeWork(listUnSubmittedSt);
      }
      else{
        setListStudentNotSubmittedHomeWork([]);
      }
    }

    // điểm danh
    const submit = async (studentId) => {
      var d = new Date();
      const hours = format_two_digits(d.getHours());
      const minutes = format_two_digits(d.getMinutes());
      const seconds = format_two_digits(d.getSeconds());
      const startTime = clazz.start;
      const rightnow = hours + ":" + minutes + ":" + seconds;
      console.log(startTime);
      console.log(rightnow);
      var res = "";
      if(rightnow > startTime){
   
         res = await AttendanceApi.studentAtten(studentId,"L",clazz.classId,today3);
      }
      else{

         res = await AttendanceApi.studentAtten(studentId,"P",clazz.classId,today3);
      }
    
      if(res === "atten successful!"){
          alert("Điểm danh thành công");
          
      }
      else{
          alert("Điểm danh thất bại!");
      }
      resetAttendancePage();
      //call api
  }

    const [listStudentNotInClass, setAbsentStudents] = useState([]);
    const [attenedStudents, setAttendStudents] = useState([]);
    const [subStudentInClass, setSubList] = useState([]);

    const [modalCreateLesson, setModalCreateLesson] = useState(false);
    const [suggestChapters, setSuggestChapter] = useState([]);

      const data = {
        columns: [
          {
            label: 'ID',
            field: 'id',
            sort: 'asc',
            
          },
          {
            label: 'Họ Đệm',
            field: 'lastName',
            sort: 'asc',
            
          },
          {
            label: 'Tên',
            field: 'firstName',
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
          },
          {
            label: '',
            field: 'action',
          }
        ],
        rows: []
      };
      const data1 = {
        columns: [
          {
            label: 'ID',
            field: 'id',
            sort: 'asc',
            
          },
          {
            label: 'Họ Đệm',
            field: 'lastName',
            sort: 'asc',
            
          },
          {
            label: 'Tên',
            field: 'firstName',
            sort: 'asc',
            
          },
          {
            label: 'Trường',
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
          {
            label: '',
            field: 'action',
          },
        ],
        rows: []
      };
      const data3 = {
        columns: [
          {
            label: 'ID',
            field: 'id',
            sort: 'asc',
            
          },
          {
            label: 'Họ Đệm',
            field: 'lastName',
            sort: 'asc',
            
          },
          {
            label: 'Tên',
            field: 'firstName',
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
      const data4 = {
        columns: [
          {
            label: 'ID',
            field: 'id',
            sort: 'asc',
            
          },
          {
            label: 'Họ Đệm',
            field: 'lastName',
            sort: 'asc',
            
          },
          {
            label: 'Tên',
            field: 'firstName',
            sort: 'asc',
            
          },
          {
            label: 'Trường',
            field: 'school',
            sort: 'asc',
         
          },
          {
            label: '',
            field: 'action',
          }
          
        ],
        rows: []
      };
      const data5 = {
        columns: [
          {
            label: 'ID',
            field: 'id',
            sort: 'asc',
            
          },
          {
            label: 'Họ Đệm',
            field: 'lastName',
            sort: 'asc',
            
          },
          {
            label: 'Tên',
            field: 'firstName',
            sort: 'asc',
            
          },
          {
            label: 'Trường',
            field: 'school',
            sort: 'asc',
         
          },
          {
            label: '',
            field: 'action',
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
            const lesson = await LessonApi.getCurrentLessonInClassToday(clazz.classId);
            if(lesson !== "empty"){
              setCurrentLesson(lesson);
              const submittedStudent = await HomeWorkApi.getStudentSubmittedHomeWorkInLesson(clazz.classId,lesson.id);
              const unSubmittedStudent = await HomeWorkApi.getStudentNotSubmittedHomeWorkInLesson(clazz.classId,lesson.id);
              if(submittedStudent !== "empty"){
                setListStudentSubmittedHomeWork(submittedStudent);
              }
              if (unSubmittedStudent !== "empty"){
                setListStudentNotSubmittedHomeWork(unSubmittedStudent);
              }
            }
            else{
               // không có btvn tuần trước
                alert("Không có btvn tuần trước! tất cả học sinh đi học không phải nộp btvn");
  
            }
            
            
        }
        getCurrentLesson();
      }, [clazz.classId]);


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


      
      listStudentNotInClass.map(st => data1.rows.push({
        id: st.id,
        fullName: st.fullName,
        firstName: st.firstName,
        lastName: st.lastName,
        school:st.school,
        studentNumber:st.studentNumber,
        parentNumber: st.parentNumber,
        action: <Button color="primary" onClick={() => submit(st.id)} >Điểm danh</Button>
      }))


      data3.rows = subStudentInClass;

      const toggleDelete = async (student) => {
        var requested = window.confirm("Bạn có chắc chắn muốn xóa điểm danh của " + student.fullName);
      
        if ( requested) {
            const res = await AttenDanceApi.deleteAttendance(clazz.classId,student.id,today2);
            if (res === "delete successful!"){
              resetAttendancePage();
                alert("Xóa thành công! Vui lòng bấm xác nhận lại để cập nhập danh sách học sinh nghỉ học");
            }
        }
      };

      const toggleDeleteSub = async (student) => {
        var requested = window.confirm("Bạn có chắc chắn muốn xóa điểm danh của " + student.fullName);
      
        if ( requested) {
            const res = await AttenDanceApi.deleteSubAttendance(clazz.classId,student.id,today2);
            if (res === "delete compensate successful!"){
                resetAttendancePage();
                alert("Xóa thành công!");
            }
        }
      };

      const toggleDeleteSubmitHomeWork = async (student) => {
        var requested = window.confirm("Bạn có chắc chắn muốn xóa " + student.fullName + " khỏi danh sách thiếu btvn?");
        // xóa ra khỏi danh sách chưa làm btvn ( thêm vào đã hoàn thành btvn )
        if ( requested) {
            const id = [student.id];
            const studentSubmission = await HomeWorkApi.submitHomework(clazz.classId,id);
            if (studentSubmission === "submit successful!"){
                resetHomeWorkPage();
                alert("Xóa thành công!");
            }
        }
      };

      const submitAll = async () => {
          if(!isLoading ){
            setSuccess(false);
            setIsLoading(true);
            var studentIds = [];
            attenedStudents.map(st => studentIds.push(st.id));
            const submission = await HomeWorkApi.submitHomework(clazz.classId,studentIds);
            if(submission === "submit successful!"){
              setSuccess(true);
              setTimeout(() => {
                setIsLoading(false);
                resetHomeWorkPage();
              },1200)
              
            }
          }
      }

      data.rows.map(st => st["action"] = 
        <button style={{background:"none",border:"none"}} onClick={() => toggleDelete(st)}>
            <Delete color="secondary"/>
        </button>
      )

      data3.rows.map(st => st["action"] = 
        <button style={{background:"none",border:"none"}} onClick={() => toggleDeleteSub(st)}>
            <Delete color="secondary"/>
        </button>
      )
      

      const mapNotSubmittedId = {};
      listStudentNotSubmittedHomeWork.map(st => mapNotSubmittedId[st.id] = st.id);
      var listStudentNotSubmittedHomeWorkId = [];
      listStudentNotSubmittedHomeWork.map(st => listStudentNotSubmittedHomeWorkId.push(st.id));

      var listStudentMustHaveHomeWork = [];
      attenedStudents.map(e => (mapNotSubmittedId[e.id] === undefined) ? listStudentMustHaveHomeWork.push(e) : null);
      subStudentInClass.map(e => listStudentMustHaveHomeWork.push(e));

      listStudentNotSubmittedHomeWork.map(st => data4.rows.push(
        {
            id:st.id,
            fullName:st.fullName,
            firstName: st.firstName,
            lastName: st.lastName,
            school:st.school,
            action:<button style={{background:"none",border:"none"}} onClick={() => toggleDeleteSubmitHomeWork(st)}>
                        <Delete color="secondary"/>
                    </button>
        }
      ))

      attenedStudents.map(st => data5.rows.push(
        {
          id:st.id,
          firstName: st.firstName,
          lastName: st.lastName,
          school:st.school,
          action:<button style={{background:"none",border:"none"}} onClick={() => toggleDeleteSubmitHomeWork(st)}>
                      <Delete color="secondary"/>
                  </button>
        }
      ))
      listStudentNotInClass.map(st => data5.rows.push(
        {
          id:st.id,
          firstName: st.firstName,
          lastName: st.lastName,
          school:st.school,
          action: "Nghỉ học"
        }
      ))

    return (
        <Container fluid className="p-0">
            <h1 className="h3 mb-3">Thông tin lớp lọc ngày {today}</h1>
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
                                          ,
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
                                  <ModalHeader>
                                        Tạo bài học mới 
                                  </ModalHeader>
                                  <ModalBody>
                                      
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
                                               
                                          
                                      
                                  </ModalBody>
                                  <ModalFooter>
                                      <Button color="primary" type="submit">Thêm</Button>
                                      <Button color="primary" onClick={() => setModalCreateLesson(false)}>Hủy</Button>
                                  </ModalFooter>
                              </Form>
                            }
                      </Formik>
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
                          <MDBDataTableV5
                           hover 
                          responsive
                          pagingTop
                          searchTop
                          searchBottom={false}
                          barReverse
                          entriesOptions={[15,40, 50, 70,100]}
                          entries={15} data={data}/>
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
                          <MDBDataTableV5  
                          hover 
                          responsive
                          pagingTop
                          searchTop
                          searchBottom={false}
                          barReverse
                          entriesOptions={[15,40, 50, 70,100]}
                          entries={15}  data={data3} />
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
                          <MDBDataTableV5  
                          hover 
                          responsive
                          pagingTop
                          searchTop
                          searchBottom={false}
                          barReverse
                          entriesOptions={[15,40, 50, 70,100]}
                          entries={15}  data={data1} />
                          <Button color="primary" onClick={submitAbsentStudents}>Xác Nhận</Button>
                    </CardBody>
                  </CardBody>
                </Card>
            </Col>

            </Row>
            <Row>
              <Col>
                {/* Nếu btvn tuần trước không có thì sẽ đánh dấu tất cả hoàn thành btvn,
                lần đầu vào thì mặc định sẽ chưa có ai nộp btvn nên "listStudentSubmittedHomeWork" sẽ có length = 0 */}
                {(Object.keys(currentLesson).length !== 0  && listStudentSubmittedHomeWork.length === 0 ) ? 
                <>
                  <Card>
                  <CardHeader>Học sinh thiếu btvn:</CardHeader>
                  <CardBody>
                      <Button onClick={() => setModalSubmitStudentHomeWork(true)} color="primary">Học sinh không làm btvn</Button> 
                      <Button onClick={() => submitAll()} color="primary">Đánh dấu tất cả đều đủ</Button> 
                      <MDBDataTableV5
                          hover 
                          responsive
                          pagingTop
                          searchTop
                          searchBottom={false}
                          barReverse
                          entriesOptions={[15,40, 50, 70,100]}
                          entries={15} data={data5}/>
                  </CardBody>
                  
                  </Card>
                  <Modal isOpen={isLoading} toggle={setIsLoading}>
                    <ModalBody>
                          {!success ? 
                          <>
                          Đang lưu danh sách học sinh làm btvn.... 
                          <CircularProgress />
                          </> : <> <CheckIcon style={{color:green[500]}}/>lưu danh sách thành công!</> }
                    </ModalBody>
                  </Modal>
                </>
                : (Object.keys(currentLesson).length !== 0  && listStudentSubmittedHomeWork.length !== 0 ) ?

                <Card>
                  <CardHeader>Học sinh thiếu btvn</CardHeader>
                  <CardBody>
                      <Button onClick={() => setModalDeleteSubmitStudentHomeWork(true)} color="primary">Thêm học sinh không làm btvn</Button>
                      <MDBDataTableV5
                           hover 
                          responsive
                          pagingTop
                          searchTop
                          searchBottom={false}
                          barReverse
                          entriesOptions={[15,40, 50, 70,100]}
                          entries={15} data={data4}/>
                  </CardBody>
                  <Modal isOpen={isLoading} toggle={setIsLoading}>
                    <ModalBody>
                          {!success ? 
                          <>
                          Đang lưu danh sách học sinh làm btvn.... 
                          <CircularProgress />
                          </> : <> <CheckIcon style={{color:green[500]}}/>lưu danh sách thành công!</> }
                    </ModalBody>
                  </Modal>
                </Card>
                : null 
                }
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

                                            if(!isLoading ){
                                              setSuccess(false);
                                              setIsLoading(true);
                                              const res = await HomeWorkApi.submitHomework(clazz.classId,listId);
                                              if(res === "submit successful!"){
                                                setSuccess(true);
                                                setTimeout(() => {
                                                  setIsLoading(false);
                                                  resetHomeWorkPage();
                                                },1200)
                                                setModalSubmitStudentHomeWork(false);
                                              }
                                            }
                                        }}
                                    
                                    >
                                    {({setFieldValue, values, isSubmitting}) => 
                                        <Form>
                                            <ul>
                                          
                                              {listStudentNotSubmittedHomeWork.map((st,i) => 
                                                  <li key={i}>{st.fullName} - {st.id}</li>
                                              )}
                                            </ul>
                                            <Autocomplete
                                                multiple
                                                limitTags={2}
                                                label="Thêm học sinh thiếu btvn"
                                                id="multiple-limit-tags"
                                                value={values.listUnSubmittedHomeWork}
                                                name="listUnSubmittedHomeWork"
                                                onChange={(e, value) => {
                                                  setFieldValue("listUnSubmittedHomeWork", value)
                                                }}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                options={attenedStudents}
                                                getOptionLabel={(option) => option.fullName + " - " + option.id }
                                                renderInput={(params) => (
                                                  <TextField {...params} name="listUnSubmittedHomeWork" variant="outlined" label="Thêm học sinh thiếu btvn"  />
                                                )}
                                              />
                                            <Button color="primary" type="submit"  disabled={isSubmitting}>Lưu</Button>
                                            <Button color="primary" onClick={() => setModalSubmitStudentHomeWork(false)}>Hủy</Button>
                                        </Form>
                                      }
                                  </Formik>
                        </ModalBody>
                </Modal>
                                    
                <Modal isOpen={modalDeleteSubmitStudentHomeWork} toggle={setModalDeleteSubmitStudentHomeWork}>
                      {/* modal này gồm các học sinh đã hoàn thành btvn trong lớp hôm nay, thêm vào danh sách formik
                      này tức là sẽ xóa đi các submit của học sinh trong danh sách formik này */}
                        <ModalBody> 
                                <Formik
                                        initialValues={
                                          {
                                              listSubmittedHomeWork:[]
                                          }
                                        }
                                        onSubmit={async (values) => {
                                            var studentIds = [];
                                            values.listSubmittedHomeWork.map(st => studentIds.push(st.id));
                                  
                                            
                                            if(!isLoading ){
                                              setSuccess(false);
                                              setIsLoading(true);
                                              const deleteSubmitsion = await HomeWorkApi.deleteSubmitHomeWork(
                                                clazz.classId, studentIds, currentLesson.id
                                              )  
                                              if(deleteSubmitsion === "delete successful!"){
                                                setSuccess(true);
                                                setModalDeleteSubmitStudentHomeWork(false);
                                                setTimeout(() => {
                                                  setIsLoading(false);
                                                  resetHomeWorkPage();
                                                },1200)
                                                
                                              }else{
                                                alert("Thêm học sinh thiếu btvn thất bại!");
                                              }
                                            }
                                            
                                        }}
                                    
                                    >
                                    {({setFieldValue, values, isSubmitting}) => 
                                        <Form>
                                            <Autocomplete
                                                multiple
                                                limitTags={2}
                                                label="Thêm học sinh thiếu btvn"
                                                id="multiple-limit-tags"
                                                name="listSubmittedHomeWork"
                                                onChange={(e, value) => {
                                                  setFieldValue("listSubmittedHomeWork", value)
                                                }}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                options={listStudentSubmittedHomeWork}
                                                getOptionLabel={(option) => option.fullName + " - " + option.id }
                                                renderInput={(params) => (
                                                  <TextField {...params} name="listSubmittedHomeWork" variant="outlined" label="Thêm học sinh thiếu btvn"  />
                                                )}
                                              />
                                            <Button color="primary" type="submit"  disabled={isSubmitting}>Thêm</Button>
                                            <Button color="primary" onClick={() => setModalDeleteSubmitStudentHomeWork(false)}>Hủy</Button>
                                        </Form>
                                      }
                                  </Formik>
                        </ModalBody>
                </Modal>
              </Col>
            </Row>

            
        </Container>
    );
}
export default Attendance;

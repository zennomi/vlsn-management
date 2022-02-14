import React, {useEffect, useState} from "react";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label
} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import { FastField, Formik, Form } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import LessonApi from "../../../api/LessonApi";
import VideoApi from "../../../api/VideoApi";
import ChapterApi from "../../../api/ChapterApi";
import HomeWorkApi from "../../../api/HomeWorkApi";
import AttendanceApi from "../../../api/AttendanceApi";
import Moment from 'moment';
import View from "@material-ui/icons/Visibility"
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
const CourseList = (props) =>{

  const clazz = props.clazz;
  
  const [suggestChapters, setSuggestChapter] = useState([]);

  const [modalLessonVideo,setModalLessonVideo] = useState(false);

  const [modalLesson,setModalLesson] = useState(false);

  const [modalHomeWork,setModalHomeWork] = useState(false);

  const [modalIsWatchingLessonStudentDetail, setIsWatchingLessonStudentDetail] = useState(false);

  const [modalCreateChapter,setModalCreateChapter] = useState(false);

  const [modalCreateLesson, setModalCreateLesson] = useState(false);
  
  const [listStudentNotSubmittedHomeWork,setListStudentNotSubmittedHomeWork] = useState([]);

  const [listAbsentStudentInLesson, setListAbsentStudentInLesson] = useState([])

  const [lessons, setLessons] = useState([]);
  const [lesson,setLesson] = useState({});

  const [isMCHomeWork,setIsMCHomeWork] = useState(false);

  const [totalStudentInDate,setTotalStudentInDate] = useState(0);

  const datatable = {
    columns: [
      {
        label: 'ND Bài Học',
        field: 'lessonName',
       
      },
      {
        label: 'Chương',
        field: 'chapterName',
      
      },
      {
        label: 'Ngày',
        field: 'date',
       
      },
      {
        label: 'VIDEO',
        field: 'videoCheck',
      
      },
      {
        label: 'BTVN',
        field: 'homeWorkCheck',
     
      },
      {
        label: 'Yêu cầu',
        field: 'misson',
     
      },
      {
        label: '',
        field: 'action',
      },
    ],
    rows: [
        // {
        //   lessonName:"Bài 1 - Đồ Thị Hàm Số Bậc 3 ( tiếp )",
        //   categolory:"Chương 1 - Hàm Số",
        //   date:"30-08-2021",
        //   videoCheck:  <Button onClick={() => setModalLesson(true)} color="primary">Thêm</Button>,
        //   homeWorkCheck: <Button onClick={() => setModalHomeWork(true)}  color="primary">Thêm</Button>,
        //   numberStudent:"78",
        // }
    ],
  };  
  const datatable2 = {
    columns: [
      {
        label: 'ID',
        field: 'id',
      },
      {
        label: 'Họ Tên',
        field: 'fullName',
      },
      {
        label: 'Trường',
        field: 'school',
 
      },
      
    ],
    rows: [
      
    ],
  }; 
  const datatable3 = {
    columns: [
      {
        label: 'ID',
        field: 'id',
      },
      {
        label: 'Họ Tên',
        field: 'fullName',
      },
      {
        label: 'Trường',
        field: 'school',
 
      },
      
    ],
    rows: [
      
    ],
  }; 
  const updateLessonVideo = (lesson) => {

      setLesson(lesson);
      setModalLessonVideo(true);
  }
  const updateLesson = (lesson) => {

      setLesson(lesson);
      setModalLesson(true);
  } 

  const toggleDelete = async (lesson) => {
    var requested = window.confirm("Bạn có chắc chắn muốn xóa bài học này? ");
  
    if ( requested) {
        const res = await LessonApi.deleteLesson(lesson.id);
        if (res === "delete successful!"){
            const newLessonList = await LessonApi.getAllLessonInClass(clazz.id);
            setLessons(newLessonList);
            alert("Xóa bài học thành công!");
        }
    }
  };

  const createNewHomeWork = (lesson) => {
      setLesson(lesson);
      setModalHomeWork(true)
  }

  const watchingStudentNotSubmitedHomeWorkInLesson = async (lesson) => {
      const res = await HomeWorkApi.getStudentNotSubmittedHomeWorkInLesson(clazz.id,lesson.id);
      const totalStudent = await AttendanceApi.getTotalStudentInClassInDate(clazz.id,lesson.date);
      const listAbsent = await AttendanceApi.getStatusStudentInClassInDate(clazz.id,lesson.date,"A");
      setTotalStudentInDate(totalStudent);
      if (res !== "empty"){
        setListStudentNotSubmittedHomeWork(res);
      }
      setListAbsentStudentInLesson(listAbsent);
      setIsWatchingLessonStudentDetail(true);
      
  }

    useEffect(() => {
        const getAllLessonInClass = async () =>{
        const response = await LessonApi.getAllLessonInClass(clazz.id);
        setLessons(response);
    }
    getAllLessonInClass();
      
    }, [clazz.id]);

    useEffect(() => {
      const getAllSuggestChapter = async () =>{
      const response = await ChapterApi.getAllSubjectChapterInGrade(clazz.grade,clazz.subjectName)
      setSuggestChapter(response)
      }
      getAllSuggestChapter();
    }, [clazz.grade,clazz.subjectName]);

    lessons.map(lesson => datatable.rows.push({
          lessonName:lesson.lessonName,
          chapterName:lesson.chapter.chapterName,
          date:lesson.date,
          videoCheck:  (lesson.video === null) ? <Button onClick={() => updateLessonVideo(lesson)} color="primary">Thêm</Button> :
          <a  href={lesson.video.link} style={{color:"blue",fontWeight:"bolder"}}>Xem video</a>,
          homeWorkCheck: (lesson.homeWork === null) ? <Button onClick={() => createNewHomeWork(lesson)}  color="primary">Thêm</Button> :
          <>
            <a style={{color:"blue",fontWeight:"bolder"}} href={lesson.homeWork.link}>Đề</a>
            <br/>
            {(lesson.homeWork.keyLink !== "" ) ?
            <a style={{color:"blue",fontWeight:"bolder"}} href={lesson.homeWork.keyLink}>Đáp án</a>:
            null }
          </>,
          misson: (lesson.homeWork !== null) ? lesson.homeWork.misson : "",
          action:<div style={{display:"flex"}}>
                    <button style={{background:"none",border:"none"}}  onClick={() => watchingStudentNotSubmitedHomeWorkInLesson(lesson)} >
                          <View color ="primary" />
                    </button>
                    <button style={{background:"none",border:"none"}} onClick={() => updateLesson(lesson)}>
                          <Edit color="action"/>
                    </button>
                    <button style={{background:"none",border:"none"}} onClick={() => toggleDelete(lesson)}>
                        <Delete color="secondary"/>
                    </button>
                </div>
    }))
    
    datatable2.rows = listStudentNotSubmittedHomeWork;
    datatable3.rows = listAbsentStudentInLesson;
    console.log(listAbsentStudentInLesson);
  return(
  <>
      <Row>
            <Col>
                <Card className="flex-fill w-100">
                    <CardHeader>
                      <CardTitle tag="h5" className="mb-0">
                          DANH SÁCH BÀI HỌC
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                          <div>
                              <div style={{marginLeft:"auto"}}>
                                <Button color="primary" onClick={() => setModalCreateLesson(true)}>Thêm bài học</Button>
                                <Button color="primary" onClick={() => setModalCreateChapter(true)}>Thêm chương</Button>
                              </div>
                              
                          </div>
                          <MDBDataTableV5  
                          responsive
                          hover  
                          pagingTop
                          searchTop
                          searchBottom={false}
                          barReverse
                          entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable} />
                      </CardBody>
                  </Card>
                    {/* modal create video lesson */}
                    <Modal isOpen={modalLessonVideo}  toggle={setModalLessonVideo}>
                          <ModalHeader>
                                Thêm Video Bài Giảng
                          </ModalHeader>
                          <ModalBody>
                              <Formik
                                    initialValues={
                                      {
                                          lessonName:(lesson.lessonName !== undefined) ? lesson.lessonName : "",
                                          date:(lesson.date !== undefined) ? lesson.date : "",
                                          link:""
                                      }
                                    }
                                    validationSchema={
                                      Yup.object({
                                        link: Yup.string()
                                          .required('Bắt buộc')
                                          
                                       
                                      })
                                    }
                                    onSubmit={async (values) => {
                                       
                                        const newVideoId = await VideoApi.createVideo(
                                          values.lessonName,
                                          clazz.grade,
                                          clazz.subjectName,
                                          values.link
                                          )
                                        const res = await LessonApi.updateLesson(
                                          lesson.id,
                                          values.lessonName,
                                          null,
                                          lesson.chapter.id,
                                          newVideoId
                                          )
                                        if (res === "update successful!"){
                                          alert("thêm video thành công!");
                                          
                                          const response = await LessonApi.getAllLessonInClass(clazz.id);
                                          setLessons(response);
                                          setModalLessonVideo(false);
                                        }else{
                                          alert("thêm video thất bại!")
                                        }
                                    }}
                                
                                >
                                {({setFieldValue, values, isSubmitting}) => 
                                    <Form>
                                          <FastField
                                                label="Thêm Link Video"
                                                bsSize="lg"
                                                type="text"
                                                name="link"
                                                component={ReactstrapInput}
                                              />

                                          <Button color="primary" type="submit" disabled={isSubmitting}>Thêm</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalLessonVideo(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 
               
                      {/* modal create lesson homework */}
                    <Modal size="xl" isOpen={modalHomeWork} toggle={setModalHomeWork}>
                          <ModalHeader>
                                Thêm BTVN
                          </ModalHeader>
                          <ModalBody>
                              <Formik
                                    initialValues={
                                      {
                                          linkHomeWork:"",
                                          linkHomeWorkAnswer:"",
                                          misson:"",
                                          type:""
                                      }
                                    }
                                    validationSchema={
                                      Yup.object({
                                        linkHomeWork: Yup.string()
                                          .required('Bắt buộc'),
                                        misson: Yup.string()
                                          .required('Bắt buộc') 
                                       
                                      })
                                    }
                                    onSubmit={async (values) => {
                                       
                                        const newHomework = await HomeWorkApi.createHomeWork(
                                          lesson.id,
                                          lesson.lessonName,
                                          values.misson,
                                          values.linkHomeWork,
                                          values.linkHomeWorkAnswer
                                        )
                                          if(newHomework === "create successful!"){
                                            alert("Thêm btvn thành công!");
                                            const response = await LessonApi.getAllLessonInClass(clazz.id);
                                            setLessons(response);
                                            setModalHomeWork(false);
                                          }
                                          else{
                                            alert("Thêm btvn thất bại!");
                                          }
                                    }}
                                
                                >
                                {({setFieldValue, values, isSubmitting}) => 
                                    <Form>
                                        <Row>
                                            <Col>
                                                  <FastField
                                                    label="Thêm Link BTVN"
                                                    bsSize="lg"
                                                    type="text"
                                                    name="linkHomeWork"
                                                    component={ReactstrapInput}
                                                  />
                                            </Col>
                                            <Col>
                                                  <FastField
                                                    label="Thêm Link Đáp Án"
                                                    bsSize="lg"
                                                    type="text"
                                                    name="linkHomeWorkAnswer"
                                                    component={ReactstrapInput}
                                                  />
                                            </Col>
                                            
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FastField
                                                    label="Yêu cầu"
                                                    bsSize="lg"
                                                    type="textarea"
                                                    name="misson"
                                                    component={ReactstrapInput}
                                                  />

                                            </Col>
                                          
                                        </Row>
                                        <Row>
                                              <Col>
                                                  <FastField
                                                    label="Hạn nộp"
                                                    bsSize="lg"
                                                    type="datetime-local"
                                                    name="deadline"
                                                    component={ReactstrapInput}
                                                  />
                                              </Col>
                                              <Col>
                                                  <FastField
                                                    label="Loại"
                                                    bsSize="lg"
                                                    type="select"
                                                    name="type"
                                                    onChange={e => {

                                                    }}
                                                    component={ReactstrapInput}
                                                  >
                                                    <option value = "ES">Tự luận</option>
                                                    <option value = "MC">Trắc nghiệm</option>
                                                
                                                  </FastField>
                                                  
                                              </Col>
                                        </Row>
                                       
                                        <Button color="primary" type="submit" disabled={isSubmitting}>Thêm</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalHomeWork(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 
                      
                      {/* modal update lesson */}
                    <Modal isOpen={modalLesson} toggle={setModalLesson}>
                          <ModalHeader>
                                Cập nhật nội dung bài học
                          </ModalHeader>
                          <ModalBody>
                              <Formik
                                    initialValues={
                                      {
                                        lessonName:(lesson.lessonName !== undefined) ? lesson.lessonName : "",
                                        date:(lesson.date !== undefined) ? lesson.date : "",
                                        chapter:(lesson.chapter !== undefined) ? lesson.chapter.chapterName : "",
                                        link:(lesson.video !== undefined && lesson.video !== null) ? lesson.video.link : "",
                                        linkHomework: (lesson.homeWork !== undefined && lesson.homeWork !== null) ? lesson.homeWork.link : "",
                                        keyLink: (lesson.homeWork !== undefined && lesson.homeWork !== null) ? lesson.homeWork.keyLink : "",
                                        misson: (lesson.homeWork !== undefined && lesson.homeWork !== null) ? lesson.homeWork.misson : ""
                                      }
                                    }
                                    onSubmit={async (values) => {
                                       
                                        const date = new Date(values.date);
                                        const dateFormat = Moment(date).format('DD-MM-YYYY');
                                        console.log(dateFormat);
                                        console.log(date);
                                        const res = await LessonApi.updateLesson(
                                          lesson.id,
                                          values.lessonName,
                                          dateFormat,
                                          0,
                                          0
                                          )
                                        const updateVideo = await VideoApi.updateVideo(
                                          lesson.video.id,
                                          values.lessonName,
                                          clazz.grade,
                                          clazz.subjectName,
                                          values.link
                                        )
                                          const updateHomework = await HomeWorkApi.updateHomeWork(
                                            lesson.id,
                                            values.lessonName,
                                            values.misson,
                                            values.linkHomework,
                                            values.keyLink
                                          )
                                        if (res === "update successful!" && updateVideo === "update successful!"
                                        && updateHomework === "update successful!"){
                                          alert("cập nhật bài học thành công!");
                                
                                          const response = await LessonApi.getAllLessonInClass(clazz.id);
                                          setLessons(response);
                                          setModalLesson(false);
                                        }else{
                                          alert("cập nhật thất bại!")
                                        }

                                    }}
                                
                                >
                                {({setFieldValue, values, isSubmitting}) => 
                                    <Form>
                                        <FastField
                                                label="Tên bài học"
                                                bsSize="lg"
                                                type="text"
                                                name="lessonName"
                                                component={ReactstrapInput}
                                              />
                                        <FastField
                                                label="Chương"
                                                bsSize="lg"
                                                type="text"
                                                name="chapter"
                                                component={ReactstrapInput}
                                              />
                                        <FastField
                                                label="Ngày"
                                                bsSize="lg"
                                                type="date"
                                                name="date"
                                                component={ReactstrapInput}
                                              />
                                        {(lesson.video !== undefined  && lesson.video !== null) ? 
                                        <FastField
                                                label="Link Video"
                                                bsSize="lg"
                                                type="text"
                                                name="link"
                                                component={ReactstrapInput}
                                              /> : null }
                                        {(lesson.homeWork !== undefined && lesson.homeWork !== null) ?
                                        <>
                                        <FastField
                                                label="Link BTVN"
                                                bsSize="lg"
                                                type="text"
                                                name="linkHomework"
                                                component={ReactstrapInput}
                                              />
                                        <FastField
                                                label="Link đáp án"
                                                bsSize="lg"
                                                type="text"
                                                name="keyLink"
                                                component={ReactstrapInput}
                                              />
                                        <FastField
                                                label="Yêu cầu"
                                                bsSize="lg"
                                                type="text"
                                                name="misson"
                                                component={ReactstrapInput}
                                              /> 
                                          </>: null }
                                        <Button color="primary" type="submit" disabled={isSubmitting}>Lưu</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalLesson(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 
                    
                          {/* modal create new chapter */}
                    <Modal isOpen={modalCreateChapter} toggle={setModalCreateChapter}>
                          <ModalHeader>
                                Tạo chương học mới
                          </ModalHeader>
                          <ModalBody>
                              <Formik
                                    initialValues={
                                      {
                                        chapterName:"",
                                        
                                      }
                                    }
                                    onSubmit={async (values) => {
                                        const newChapter = await ChapterApi.createChapter(
                                          values.chapterName,
                                          clazz.grade,
                                          clazz.subjectName
                                        )
                                        if (newChapter === "create successful!"){
                                            alert("Thêm chương mới thành công!");
                                            const response = await ChapterApi.getAllSubjectChapterInGrade(clazz.grade,clazz.subjectName)
                                            setSuggestChapter(response)
                                        }
                                      
                                    }}
                                
                                >
                                {({setFieldValue, values, isSubmitting}) => 
                                    <Form>
                                        <FastField
                                                label="Tên chương học:"
                                                bsSize="lg"
                                                type="text"
                                                name="chapterName"
                                                component={ReactstrapInput}
                                              />
                                        <ul>
                                            Chương hiện có:
                                            {suggestChapters.map((chapter,i) => 
                                                <li key={i}>{chapter.chapterName}</li>
                                            )}
                                        </ul>

                                        <Button color="primary" type="submit" disabled={isSubmitting}>Thêm</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalCreateChapter(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 
                              {/* modal create new lesson */}
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
                                            clazz.id,
                                            values.lessonName,
                                            dateFormat,
                                            values.chapterId
                                          )
                                          if (newLesson === "create successful!"){

                                            alert("tạo bài học thành công!");

                                            const response = await LessonApi.getAllLessonInClass(clazz.id);
                                            setLessons(response);
                                            setModalCreateLesson(false);
                                          }else{
                                            alert("tạo thất bại!")
                                          }

                                    }}
                                
                                >
                                {({setFieldValue, values, isSubmitting}) => 
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
                                        <Button color="primary" type="submit" disabled={isSubmitting}>Thêm</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalCreateLesson(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 

       
            </Col>
            <Modal size="xl" isOpen={modalIsWatchingLessonStudentDetail}  toggle={setIsWatchingLessonStudentDetail}>
                <ModalHeader>
                    Thông tin buổi học
                </ModalHeader>
                <ModalBody>
                  Học sinh thiếu BTVN: {datatable2.rows.length}/{totalStudentInDate}
                  <MDBDataTableV5 
                    responsive 
                    hover  
                    searchTop searchBottom={false}
                    entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable2} />
                  Học sinh nghỉ học
                    <MDBDataTableV5 
                    responsive 
                    hover  
                    searchTop searchBottom={false}
                    entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable3} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => setIsWatchingLessonStudentDetail(false)}>Thoát</Button>
                </ModalFooter>
             
            </Modal>
      </Row>
      
  </>
  );
}

const AttendanceList = (props) => {

  const classId = props.clazz.id;
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
 
  useEffect(() => {
    const getListStudentInClass = async () =>{
      const listStudents = await AttendanceApi.getListStudentAttendanceInClass(classId);
      setStudents(listStudents);
    }
    getListStudentInClass();
 
  }, [classId]);

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
          
          
      </div>
      <Card>
        <CardBody>
            <MDBDataTableV5 
            responsive 
            searchTop searchBottom={false}
            bordered borderless={false} hover  entriesOptions={[50,100, 150, 200,300,400]} 
            entries={50} pagesAmount={50} data={datatable} />
        </CardBody>
      </Card>
  </>
    );
}
const Course = (props) =>{

  
  const [exam, setExam] = useState(1);

  return(
  <>  
   
       
    <CourseList {...props} setExam={setExam} exam={exam} />
    <Row>
        <Col>
              <AttendanceList {...props}/>
        </Col>
    </Row>
  </>
  );
}
export default Course;

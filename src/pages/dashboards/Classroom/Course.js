import React, {useEffect, useState} from "react";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
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
import { MoreHorizontal } from "react-feather";
import { FastField, Formik, Form } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import LessonApi from "../../../api/LessonApi";
import VideoApi from "../../../api/VideoApi";
import ChapterApi from "../../../api/ChapterApi";
import HomeWorkApi from "../../../api/HomeWorkApi";
import Moment from 'moment';
const CourseList = (props) =>{

  const clazz = props.clazz;
  
  const [suggestChapters, setSuggestChapter] = useState([]);

  const [modalLessonVideo,setModalLessonVideo] = useState(false);

  const [modalLesson,setModalLesson] = useState(false);

  const [modalHomeWork,setModalHomeWork] = useState(false);

  const [modalCreateChapter,setModalCreateChapter] = useState(false);

  const [modalCreateLesson, setModalCreateLesson] = useState(false);
  
  const [lessons, setLessons] = useState([]);
  const [lesson,setLesson] = useState({});
  const datatable = {
    columns: [
      {
        label: '',
        field: 'action',
      },
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
        label: 'Sĩ Số',
        field: 'numberStudent',
      
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
        label: 'Họ Tên',
        field: 'fullName',
      },
      {
        label: 'Trường',
        field: 'school',
 
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
        sort: 'asc',
      
      },
      
    ],
    rows: [
      {
        fullName:"Phương Xuân Thủy An",
        school:"FPT",
        parentNumber:"09045090290"
      }
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
  const createNewHomeWork = (lesson) => {
      setLesson(lesson);
      setModalHomeWork(true)
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
          numberStudent:"78",
          action:<div style={{display:"flex"}}>
                    <button >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                    </button>
                    <button onClick={() => updateLesson(lesson)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </button>
                </div>
    }))
  

  return(
  <>
      <Row>
            <Col lg="8">
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
                                {({setFieldValue, values}) => 
                                    <Form>
                                          <FastField
                                                label="Thêm Link Video"
                                                bsSize="lg"
                                                type="text"
                                                name="link"
                                                component={ReactstrapInput}
                                              />

                                          <Button color="primary" type="submit" >Thêm</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalLessonVideo(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 
               
                      {/* modal create lesson homework */}
                    <Modal isOpen={modalHomeWork} toggle={setModalHomeWork}>
                          <ModalHeader>
                                Thêm BTVN
                          </ModalHeader>
                          <ModalBody>
                              <Formik
                                    initialValues={
                                      {
                                          linkHomeWork:"",
                                          linkHomeWorkAnswer:"",
                                          misson:""
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
                                {({setFieldValue, values}) => 
                                    <Form>
                                        <FastField
                                                label="Thêm Link BTVN"
                                                bsSize="lg"
                                                type="text"
                                                name="linkHomeWork"
                                                component={ReactstrapInput}
                                              />
                                        <FastField
                                                label="Thêm Link Đáp Án"
                                                bsSize="lg"
                                                type="text"
                                                name="linkHomeWorkAnswer"
                                                component={ReactstrapInput}
                                              />
                                        <FastField
                                                label="Yêu cầu"
                                                bsSize="lg"
                                                type="text"
                                                name="misson"
                                                component={ReactstrapInput}
                                              />
                                        <Button color="primary" type="submit">Thêm</Button>
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
                                {({setFieldValue, values}) => 
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
                                        <Button color="primary" type="submit">Lưu</Button>
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
                                {({setFieldValue, values}) => 
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

                                        <Button color="primary" type="submit">Thêm</Button>
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

       
            </Col>
            <Col lg="4">
                <Card className="flex-fill w-100">
                  <CardHeader>
                    
                    <CardTitle tag="h5" className="mb-0">
                        HỌC SINH THIẾU BTVN
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                        <MDBDataTableV5 
                        responsive hover  
                        searchTop searchBottom={false}
                        entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable2} />
                    </CardBody>
                </Card>
            </Col>
      </Row>
      
  </>
  );
}

const AttendanceList = (props) => {
  const datatable = {
    columns: [
      {
        label: 'Họ Tên',
        field: 'fullName',
   
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Trường',
        field: 'school',
 
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
        sort: 'asc',
      
      },
      
    ],
    rows: [
      
    ],
  };  
  

  useEffect(() => {
    const getAllExamMark = async () =>{
      
    }
    getAllExamMark();
 
  }, []);



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
            DANH SÁCH HỌC SINH
        </CardTitle>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 responsive hover bordered borderless={false}  entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
    );
}
const Course = (props) =>{

  
  const [exam, setExam] = useState(1);

  return(
  <>  
   
       
    <CourseList {...props} setExam={setExam} exam={exam} />
    <Row>
        <Col>
              <AttendanceList/>
        </Col>
    </Row>
  </>
  );
}
export default Course;

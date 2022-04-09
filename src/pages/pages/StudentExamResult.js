import React, {useEffect, useState} from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Button,
  Alert,
  Modal
} from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";
import { Formik,FastField, Form  } from 'formik';
import { MDBDataTableV5 } from 'mdbreact';
import Header from "./Header";
// import Moment from 'moment';
// import AttendanceApi from "../../api/AttendanceApi";
import { Bar } from 'react-chartjs-2';
import ExamApi from "../../api/ExamApi";
import Edit from "@material-ui/icons/Edit";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import FacebookIcon from '@material-ui/icons/Facebook';
import TestApi from "../../apiLuyenDe/TestApi";

const StatisticsScorce = (props) =>{

  const data = {
    labels: ['0-3', '3-5', '5-7', '7-8', '8-9', '9-10'],
    datasets: [
      {
        label: '# số học sinh',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  
  const grade = props.grade;
  const setGrade = props.setGrade;
  const subject = props.subject;
  const setSubject = props.setSubject;
  const month = props.month;
  const setMonth = props.setMonth;
 
  const setExamId = props.setExamId;
  const setExamTestingSystemId = props.setExamTestingSystemId;
  const setClassId = props.setClassId;

  const [examList, setExamList] = useState([]);
  const [datastatistics,setDataStatistics] = useState([]);

  const datatable = {
    columns: [
      {
        label: 'Tên Lớp',
        field: 'classFullName',
    
      },
      {
        label: 'Giáo Viên',
        field: 'teacherName',
      },
      {
        label: 'Nội Dung Kiểm Tra',
        field: 'examName',
      
      },
      {
        label: 'Loại Kiểm Tra',
        field: 'type',
      },
      {
        label: 'Ngày Kiểm Tra',
        field: 'createdDate',
      },
      {
        label: '',
        field: 'action',
        
      },
    ],
    rows: [
      
    ],
  }; 

  const setClassIdAndExamId = async (exam,clazz) =>{
      setClassId(clazz);
      setExamId(exam.examId);
      setExamTestingSystemId(exam.testingSystemId);
      console.log(exam.testingSystemId);
      const statistics = await ExamApi.getExamResultStatisticInClass(exam.examId,clazz);
      console.log(statistics);
      setDataStatistics(statistics);
  }

  useEffect(() => {
    const getAllSubjectExamInMonthAtGrade = async () =>{
        const exams = await ExamApi.getAllSubjectExamInMonthAtGrade(month,grade,subject);
        setExamList(exams);
    }
    getAllSubjectExamInMonthAtGrade();
    
  }, [month,grade,subject]);

  examList.map(exam => datatable.rows.push({
      classFullName: subject + " " + grade + exam.className,
      teacherName:exam.teacherName,
      examName:exam.examName,
      type:exam.type,
      createdDate:exam.createdDate,
      action: <Button color="primary" style={{borderRadius:"15px"}} onClick={() => setClassIdAndExamId(exam,exam.classId) }>Xem</Button>
  }))
  
  data.datasets[0].data = datastatistics;

  return(
  <> 
      <div className='header'>
          <h3 className='title' style={{fontWeight:"bold"}}>ĐIỂM KIỂM TRA</h3>
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
                                  <option value="Toán Hình">Luyện Đề C3</option>
                                  <option value="Toán Hình">Luyện Đề C2</option>
                                  <option value="Tiếng Anh">Tiếng Anh</option>
                                  <option value="Hóa">Hóa</option>
                                  <option value="Văn">Văn</option>
                                  <option value="Lý">Lý</option>
                                  <option value="Sinh">Sinh</option>
                    </Input>
                </Col>
                <Col xs="auto">
                  <Input 
                      type="select"
                      id="subject"
                      name="subject"
                      onChange={ async (e) =>{
                        setMonth(e.target.value);
                    }}
                    >
                                  <option value="1">Tháng 1</option>
                                  <option value="2">Tháng 2</option>
                                  <option value="3">Tháng 3</option>
                                  <option value="4">Tháng 4</option>
                                  <option value="5">Tháng 5</option>
                                  <option value="6">Tháng 6</option>
                                  <option value="7">Tháng 7</option>
                                  <option value="8">Tháng 8</option>
                                  <option value="9">Tháng 9</option>
                                  <option value="10">Tháng 10</option>
                                  <option value="11">Tháng 11</option>
                                  <option value="12">Tháng 12</option>
                    </Input>
                </Col>
            </Row>
           
          </div>
          <br/>
          <div>
              <MDBDataTableV5 
              hover 
              responsive
              bordered
              searchTop
              searchBottom={false}
              entriesOptions={[5,10, 20, 50,100,500]} entries={5} pagesAmount={5} data={datatable} />
          </div>
      </div>
      <Bar data={data} options={options} />
    
  </>
    );
}


const StudentListScorces = (props) =>{

  const grade = props.grade;

  const subject = props.subject;

  const month = props.month;

  const datatable = {
    columns: [
      {
        label: 'ID',
        field: 'id',
  
      },
      {
        label: '',
        field: 'avatar',
      },
      {
        label: 'Họ & Đệm',
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
        label: 'Điểm KT',
        field: 'mark',
      },
      {
        label: 'PHHS',
        field: 'parentName',
      },
      {
        label: 'STĐ PH',
        field: 'parentNumber',
      },
      {
        label: '',
        field: 'action',
      }
    ],
    rows: [
      
    ],
  };  
  const [marks, setListMark] = useState([]);
  const [result,setResult] = useState({});
  const examId = props.examId;
  const testingSystemId = props.testingSystemId;
  console.log(testingSystemId);
  const classId = props.classId;

  const listNotFinish = props.listNotFinish;
  const setListNotFinish = props.setListNotFinish;
  const setRerenderNotFinish = props.setRerenderNotFinish;
  const rerenderNotFinish = props.rerenderNotFinish;
  const [modalUpdate, setModalUpdate] = useState(false);

  useEffect(() => {
    const getAllExamMark = async () =>{
        const examRespone = await ExamApi.getAllStudentMarkInExam(examId);
        setListMark(examRespone);
    }
    getAllExamMark();
    
  }, [examId,listNotFinish]);

  const toggleUpdate =  (mark) => {
    setResult(mark)
    setModalUpdate(true);
  }

  const updateExamResultAutomatically = async (id) => {
      console.log(id);
      if (id === null || id === "null"){
        alert("Bài kiểm tra này không được tạo trên hệ thống luyện đề!");
      }else{
          // call api const res = 
          const res = await TestApi.getExamResultTable(id);
          var mapTestingSystemIdAndResult = {};
          for(var i = 0 ; i < res.length ; i++){
            mapTestingSystemIdAndResult[res[i].id] = res[i].mark;
          }
          const bodyToUpdate = [];

          var allStudent = [...marks, ...listNotFinish];

          allStudent.map(mark => bodyToUpdate.push(
            {
                examId: examId,
                studentId: mark.id,
                classroomId:classId,
                mark: (mapTestingSystemIdAndResult[mark.testingSystemId] !== undefined && mark.testingSystemId !== null && mark.testingSystemId !== "null") ?
                 mapTestingSystemIdAndResult[mark.testingSystemId] : mark.mark
            }
          ))
          
          console.log(allStudent);
          const response = await ExamApi.updateManyExamResult(bodyToUpdate);
          if(response === "update successful!"){
            const newResponse = await ExamApi.getAllStudentNotTakeSubjectExamInMonthAtGrade(month,grade,subject);
            setListNotFinish(newResponse);
            setRerenderNotFinish(!rerenderNotFinish);
            alert("Cập nhật thành công!");
          }else{
            alert("Cập nhật thất bại!");
          }
      }


  }

  marks.map(mark => datatable.rows.push({
    id:mark.id,
    avatar:  <img
                  src={(mark.avatarUrl !== null && mark.avatarUrl !== "null") ? (`${process.env.REACT_APP_AVATAR_URL}/${mark.avatarUrl}`) : 
                    (mark.facebookUrl !== null && mark.facebookUrl !== "null") ? mark.facebookUrl :
                  avatar1 }
                  width="36"
                  height="36"
                  className="rounded-circle mr-2"
                  alt=""
                  />,
    firstName:mark.firstName,
    lastName:mark.lastName,
    school:mark.school,
    mark:mark.mark.toFixed(2),
    parentName:mark.parentName,
    parentNumber:mark.parentNumber,
    action: <button style={{background:"none",border:"none"}} onClick={() => toggleUpdate(mark)}>
                <Edit color="action"/>
            </button>
  }))

  return (
    <>  
      {/* <Button color="primary">GỬI ĐIỂM PHỤ HUYNH</Button> */}
        
              <div style={{display:"flex"}}>
                <h3 style={{fontWeight:"bold"}}>Top 100</h3>
                <Button type="button" onClick={() => updateExamResultAutomatically(testingSystemId)} style={{marginLeft:"auto"}} color="primary">Cập nhập điểm</Button>
              </div>
              <div style={{marginTop:"5px"}}>
                          <Alert color="primary" style={{padding:"10px", fontWeight:"bolder"}}>
                            Note: Những bài kiểm tra không tạo trên hệ thống luyện đề sẽ không thể cập nhật điểm! Học sinh chưa hoàn thành bài kiểm tra trên web luyện đề
                            sẽ bị tính là 0 điểm
                          </Alert>
              </div>
              <MDBDataTableV5 
              hover 
              responsive 
              bordered
              searchTop
              searchBottom={false}
              entriesOptions={[10,50, 100, 400]} entries={10} pagesAmount={10} data={datatable} />
          
          <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
            <Row>

            <Col>
            <Card>
            <CardBody>
              <Formik
                  initialValues={
                    {
                      mark: (Object.keys(result).length !== 0) ? result.mark : 0
                    }
                  }



                  onSubmit={async (values) => {
                      const res = await ExamApi.updateExamResult(
                        result.id,
                        classId,
                        examId,
                        values.mark
                      )
                      if (res === "update successful!"){
                        const examRespone = await ExamApi.getAllStudentMarkInExam(examId);
                        setListMark(examRespone);
                        alert("Cập nhật thành công!");
                        setModalUpdate(false);
                      }
                  }}
                >
                {({isSubmitting}) => 
                <Form>
                    <Row >
                          <FastField
                            label="Nhập điểm"
                            bsSize="lg"
                            type="number"
                            name="mark"
                            component={ReactstrapInput}
                          />
                    </Row>
                    <Row>
                        <Col>
                          <Button color="primary" type="submit" disabled={isSubmitting} >Cập nhật</Button>
                          <Button color="primary" onClick={() => setModalUpdate(false)} >Hủy</Button>
                        </Col>
                    </Row>
                  </Form>
                  }
                </Formik>
                </CardBody>
                </Card>
              </Col>
            </Row>
          </Modal>
      
    </>
    );
  

  
}

const WeakStudentListScorces = (props) =>{

  const grade = props.grade;

  const subject = props.subject;

  const month = props.month;

  const [students, setStudents] = useState([]);

  const setListNotFinish = props.setListNotFinish;
  
  const rerenderNotFinish = props.rerenderNotFinish;

  const datatable = {
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
      {
        label: 'SĐT',
        field: 'studentNumber',
      },
      {
        label: 'Tên PH',
        field: 'parentName',
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
      },
      {
        label: 'Facebook',
        field: 'facebookLink',
      },
    ],
    rows: [
      
    ],
  };  
  
  

  useEffect(() => {
    const getListStudentNotTakeSubjectExamInMonthAtGrade = async () =>{
          const response = await ExamApi.getAllStudentNotTakeSubjectExamInMonthAtGrade(month,grade,subject);
          setStudents(response);
          setListNotFinish(response);
    }
    getListStudentNotTakeSubjectExamInMonthAtGrade();
   
  }, [month,grade,subject,setListNotFinish,rerenderNotFinish]);

  

  students.map(mark => datatable.rows.push({
      id:mark.id,
      fullName: <>
                    <img
                    src={(mark.avatarUrl !== null && mark.avatarUrl !== "null") ? (`${process.env.REACT_APP_AVATAR_URL}/${mark.avatarUrl}`) : 
                        (mark.facebookUrl !== null && mark.facebookUrl !== "null") ? mark.facebookUrl :
                        avatar1 }
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt={mark.fullName}
                    />
                    {mark.fullName}
              </>,
      school:mark.school,
      mark:mark.mark,
      studentNumber:mark.studentNumber,
      parentName: mark.parentName,
      parentNumber:mark.parentNumber,
      facebookLink: (mark.facebookLink !== null) ?
                      <a alt={mark.facebookLink} href={mark.facebookLink} style={{color:"blue",fontWeight:"bolder"}}>
                        Xem Facebook <FacebookIcon color="primary"/> 
                    </a> : "Chưa có",
    }))

  return (
      <>
            <h3 style={{fontWeight:"bold"}}>Học sinh chưa kiểm tra</h3>

            <MDBDataTableV5 
            hover 
            responsive 
            bordered
            searchBottom={false}
            entriesOptions={[10, 20, 50,100,500]} entries={10} pagesAmount={10} 
            data={datatable} />
      </>
    );
  
}
const StudentScorces = (props) => {

  const [month,setMonth] = useState(1);
  const [grade,setGrade] = useState(12);
  const [subject,setSubject] = useState("Toán Đại");
  const [examId,setExamId] = useState(0);
  const [classId,setClassId] = useState(0);
  const [testingSystemId,setExamTestingSystemId] = useState();
  
  const [listNotFinish, setListNotFinish] = useState([]);

  const [rerenderNotFinish, setRerenderNotFinish] = useState(false);

  return(
    
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col>
        <StatisticsScorce 
        {...props} 
        month={month} 
        setMonth={setMonth} 
        grade={grade} 
        setGrade={setGrade} 
        subject={subject} 
        examId={examId}
        setExamTestingSystemId={setExamTestingSystemId}
        testingSystemId={testingSystemId}
        setExamId={setExamId}
        classId={classId}
        
        setClassId={setClassId}
        setSubject={setSubject}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <StudentListScorces 
        {...props}
        month={month} 
        setMonth={setMonth} 
        grade={grade} 
        setGrade={setGrade} 
        listNotFinish={listNotFinish}
        testingSystemId={testingSystemId}
        rerenderNotFinish={rerenderNotFinish}
        setRerenderNotFinish={setRerenderNotFinish}
        setListNotFinish={setListNotFinish}
        subject={subject} 
        examId={examId}
        classId={classId}
        setSubject={setSubject}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <WeakStudentListScorces 
        {...props}
        month={month} 
        setMonth={setMonth} 
        setListNotFinish={setListNotFinish}
        listNotFinish={listNotFinish}
        rerenderNotFinish={rerenderNotFinish}
        grade={grade} 
        setGrade={setGrade} 
        subject={subject} 
        setSubject={setSubject}/>
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
export default StudentScorces;
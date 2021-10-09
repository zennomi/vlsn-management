import React, {useEffect, useState} from "react";

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
// import Moment from 'moment';
// import AttendanceApi from "../../api/AttendanceApi";
import { Bar } from 'react-chartjs-2';
import ExamApi from "../../api/ExamApi";
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
      setExamId(exam);
      const statistics = await ExamApi.getExamResultStatisticInClass(exam,clazz);
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
      action: <Button color="primary" style={{borderRadius:"15px"}} onClick={() => setClassIdAndExamId(exam.examId,exam.classId) }>Xem</Button>
  }))
  
  data.datasets[0].data = datastatistics;

  return(
  <> 
      <div className='header'>
          <h1 className='title'>ĐIỂM KIỂM TRA</h1>
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
              searchTop
              searchBottom={false}
              entriesOptions={[5,10, 20, 50,100,500]} entries={100} pagesAmount={4} data={datatable} />
          </div>
      </div>
      <Bar data={data} options={options} />
    
  </>
    );
}


const StudentListScorces = (props) =>{

  const datatable = {
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
        label: 'Điểm KT',
        field: 'mark',
      },
      {
        label: 'STĐ PH',
        field: 'parentNumber',
      },
    ],
    rows: [
      
    ],
  };  
  const [marks, setListMark] = useState([]);
  const examId = props.examId;

  useEffect(() => {
    const getAllExamMark = async () =>{
        const examRespone = await ExamApi.getAllStudentMarkInExam(examId);
        setListMark(examRespone);
    }
    getAllExamMark();
    
  }, [examId]);

  datatable.rows = marks;

  return (
  <>  
    <Button color="primary">GỬI ĐIỂM PHỤ HUYNH</Button>
    <Card className="flex-fill w-100">
      <CardHeader style={{backgroundColor:"#5ddae0"}}>
      <div style={{display:"flex", justifyContent:"flex-start"}}>
        <CardTitle  className="mb-0">
            <h1>Top 100</h1>
        </CardTitle>
      </div>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 hover responsive entriesOptions={[5,10, 20, 50,100,500]} entries={100} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
  </>
    );
  

  
}

const WeakStudentListScorces = (props) =>{

  const grade = props.grade;

  const subject = props.subject;

  const month = props.month;

  

  const datatable = {
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
        label: 'STĐ PH',
        field: 'parentName',
      },
      {
        label: 'STĐ PH',
        field: 'parentNumber',
      },
    ],
    rows: [
      
    ],
  };  
  const [students, setStudents] = useState([]);
  

  useEffect(() => {
    const getListStudentNotTakeSubjectExamInMonthAtGrade = async () =>{
          const response = await ExamApi.getAllStudentNotTakeSubjectExamInMonthAtGrade(month,grade,subject);
          setStudents(response);
    }
    getListStudentNotTakeSubjectExamInMonthAtGrade();
   
  }, [month,grade,subject]);

  datatable.rows = students;

  return (
    <Card className="flex-fill w-100">
      <CardHeader style={{backgroundColor:"#c17847"}}>
      <div style={{display:"flex", justifyContent:"flex-start"}}>
        <CardTitle  className="mb-0">
            <h1>Học Sinh Chưa Kiểm Tra</h1>
        </CardTitle>
      </div>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 hover responsive entriesOptions={[5,10, 20, 50,100,500]} entries={100} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
    );
  
}
const StudentScorces = (props) => {

  const [month,setMonth] = useState(1);
  const [grade,setGrade] = useState(12);
  const [subject,setSubject] = useState("Toán Đại");
  const [examId,setExamId] = useState(0);
  const [classId,setClassId] = useState(0);

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
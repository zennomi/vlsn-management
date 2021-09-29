import React, {useEffect} from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Row,

} from "reactstrap";

import { MDBDataTableV5 } from 'mdbreact';
import Header from "./Header";
import {HorizontalBar} from 'react-chartjs-2';



const SubmittedStudentInWeek = (props) =>{ 

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
        label: 'Lớp',
        field: 'absentClass',
        sort: 'asc',
   
      },
      {
        label: 'Tuần 1',
        field: 'week1',
       
      },
      {
        label: 'Tuần 2',
        field: 'week2',
     
      },
      {
        label: 'Tuần 3',
        field: 'week3',
  
      },
      {
        label: 'Tuần 4',
        field: 'week4',
  
      },
    ],
    rows: [
       {
          fullName:"Nguyễn Đức Thắng",
          school:"Thăng Long",
          studentNumber:"0965993506",
          absentClass:"12A",
          week1:"y",
          week2:"y",
          week3:"y",
          week4:"y",
       }
    ]
  }; 
  const data = {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    datasets: [
      {
        label: '% học sinh hoàn thành btvn ',
        data: [77, 90.5, 80, 88,0],
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
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

  useEffect(() => {
    const getAllAbsentStudentAttendanceInWeeklyDay = async () =>{
        
    }
    getAllAbsentStudentAttendanceInWeeklyDay();
    console.log("render");
  }, []);


  useEffect(() => {
   
  });

 
  
  return(
  <> 
      <div className='header' style={{marginBottom:"5px"}}>
      <h1 className='title'>BÀI TẬP VỀ NHÀ</h1>
          <Row>
              <Col xs="12" lg="7">
                  <HorizontalBar responsive data={data} options={options} />
              </Col>
          </Row>
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
                            <Col xs="auto">
                              <Input 
                                  type="select"
                                  id="subject"
                                  name="subject"
                                  onChange={ async (e) =>{
                                    
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
                    </div>
                </Col>
                
          </Row>
      </div>
    <Card>
      <CardBody>
          <MDBDataTableV5 responsive theadColor="primary-color" theadTextWhite bordered borderless={false} hover  entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable} />
      </CardBody>
    </Card>
    
  </>
    );
}
const StudentInBlackList = (props) =>{ 

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
        label: 'Lớp',
        field: 'absentClass',
        sort: 'asc',

      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',

      },
      {
        label: 'Action',
        field: 'action',

      },
    ],
    rows: [
       
    ]
  }; 
 

  useEffect(() => {
    const getAllAbsentStudentAttendanceInWeeklyDay = async () =>{
       
    }
    getAllAbsentStudentAttendanceInWeeklyDay();
   
  }, []);


  useEffect(() => {
    
  });

  
  
  return(
  <> 
    <Card>
      <CardHeader style={{backgroundColor:"#c17847"}}>
      
        <CardTitle tag="h5" className="mb-0" style={{color:"white"}} >
          HỌC SINH THIẾU BTVN 3 LẦN
        </CardTitle>
        
              
 
      </CardHeader>
      <CardBody>
          <MDBDataTableV5 responsive hover scrollX entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable} />
      </CardBody>
    </Card>
    
  </>
    );
}
const StudentHomeWork = (props) => {

  
 
  return(
    
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col>
        <SubmittedStudentInWeek {...props}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <StudentInBlackList {...props}/>
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
export default StudentHomeWork;
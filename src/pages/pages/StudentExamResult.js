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

const StatisticsScorce = (props) =>{

  const data = {
    labels: ['0-3', '3-5', '5-7', '7-8', '8-9', '9-10'],
    datasets: [
      {
        label: '# số học sinh',
        data: [15,54,77,150,100,40],
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
  

  useEffect(() => {
    const getAllAbsentStudentAttendanceInWeeklyDay = async () =>{
        
    }
    getAllAbsentStudentAttendanceInWeeklyDay();
    console.log("render");
  }, []);


  useEffect(() => {
    console.log("rerender");
   
  });

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
      <Bar data={data} options={options} />
    
  </>
    );
}


const StudentListScorces = (props) =>{

  const datatable = {
    columns: [
      {
        label: 'Hạng',
        field: 'rank',
    
      },
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
        label: 'Điểm TB',
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
  

  useEffect(() => {
    const getAllExamMark = async () =>{
     
    }
    getAllExamMark();
    console.log("render");
  }, []);

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
            <MDBDataTableV5 hover scrollX entriesOptions={[5,10, 20, 50,100,500]} entries={100} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
  </>
    );
  

  
}

const WeakStudentListScorces = (props) =>{

 
  

  const datatable = {
    columns: [
      {
        label: 'Hạng',
        field: 'rank',
    
      },
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
    ],
    rows: [
      
    ],
  };  
  const [marks, setListMark] = useState([]);
  

  useEffect(() => {
    const getAllExamMark = async () =>{
     
    }
    getAllExamMark();
    console.log("render");
  }, []);

  datatable.rows = marks;

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
            <MDBDataTableV5 hover scrollX entriesOptions={[5,10, 20, 50,100,500]} entries={100} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
    );
  
}
const StudentScorces = (props) => {

  
 
  return(
    
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col>
        <StatisticsScorce {...props}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <StudentListScorces {...props}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <WeakStudentListScorces {...props}/>
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
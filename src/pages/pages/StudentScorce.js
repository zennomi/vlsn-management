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

} from "reactstrap";

import { MDBDataTableV5 } from 'mdbreact';
import Header from "./Header";
// import Moment from 'moment';
// import AttendanceApi from "../../api/AttendanceApi";
import { Bar } from 'react-chartjs-2';
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import { selectFistName } from "../../redux/selectors/userLoginInfoSelector";
import StudentApi from "../../api/StudentApi";
const StatisticsScorce = (props) =>{

  const grade = props.grade;
  const setGrade = props.setGrade;

  const subject = props.subject;
  const setSubject = props.setSubject;

  const [statistic,setStatistic] = useState([]);

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
  

  useEffect(() => {
    const getStatictisSubjectAvgMarkInGrade = async () =>{
        const dataResponse = await StudentApi.getStatictisSubjectAvgMarkInGrade(grade,subject);
        setStatistic(dataResponse);
    }
    getStatictisSubjectAvgMarkInGrade();
    console.log("render");
  }, [grade,subject]);

  data.datasets[0].data = statistic;

  return(
  <> 
      <div className='header'>
          <h1 className='title'>Thống Kê Điểm TB:</h1>
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
                                  <option value="Luyện Đề C3">Luyện Đề C3</option>
                                  <option value="Luyện Đề C2">Luyện Đề C2</option>
                                  <option value="Tiếng Anh">Tiếng Anh</option>
                                  <option value="Hóa">Hóa</option>
                                  <option value="Văn">Văn</option>
                                  <option value="Lý">Lý</option>
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

  const grade = props.grade;
  const subject = props.subject;

  const[data, setData] = useState([]);

  const datatable = {
    columns: [
      {
        label: 'Hạng',
        field: 'rank',
    
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
        label: 'Điểm TB',
        field: 'avgMark',
      
      },
      
    ],
    rows: [
      
    ],
  };  
  
  

  useEffect(() => {
    const getAllStudentSubjectAvgMarkInGrade = async () =>{
        const response = await StudentApi.getStudentSubjectAvgMarkInGrade(grade,subject);
        setData(response);
    }
    getAllStudentSubjectAvgMarkInGrade();
    
  }, [grade,subject]);

  data.map(st => datatable.rows.push({
      rank: (st.rank <= 3 && st.rank > 0 ) ? <p style={{color:"red"}}>{st.rank}</p> :
            (st.rank > 3 && st.rank <= 10) ? <p style={{color:"green"}}>{st.rank}</p> : st.rank,
      fullName: (st.rank <= 3 && st.rank > 0) ? <p style={{color:"red"}}>{st.fullName}</p> :
                (st.rank > 3 && st.rank <= 10) ? <p style={{color:"green"}}>{st.fullName}</p> : st.fullName,
      school:   (st.rank <= 3 && st.rank > 0) ? <p style={{color:"red"}}>{st.school}</p> :
                (st.rank > 3 && st.rank <= 10) ? <p style={{color:"green"}}>{st.school}</p> : st.school,
      avgMark:  (st.avgMark !== 0 && st.rank <= 3) ? <p style={{color:"red"}}>{st.avgMark}</p> :
                (st.avgMark !== 0 && st.rank > 3 && st.rank <= 10) ? <p style={{color:"green"}}>{st.avgMark}</p> :
                (st.avgMark !== 0 && st.rank > 10) ? st.avgMark : "chưa có hạng",
  }))

  return (
    <Card className="flex-fill w-100">
      <CardHeader style={{backgroundColor:"#5ddae0"}}>
      <div style={{display:"flex", justifyContent:"flex-start"}}>
        <CardTitle  className="mb-0">
            <h1>Top 100</h1>
        </CardTitle>
        
              
            
      </div>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 
            hover 
            responsive
            searchTop
            searchBottom={false}
            entriesOptions={[5,10, 20, 50,100,500]} 
            entries={100} pagesAmount={4} 
            data={datatable} />
        </CardBody>
    </Card>
    );
  

  
}

const WeakStudentListScorces = (props) =>{

  const grade = props.grade;
  const subject = props.subject;
  
  const [data,setData] = useState([]);

  const datatable = {
    columns: [
      {
        label: 'Hạng',
        field: 'rank',
    
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
        label: 'Điểm TB',
        field: 'avgMark',
      
      },
      
    ],
    rows: [
      
    ],
  };  
  
  

  useEffect(() => {
    const getWeakStudentInSubjectAtGrade = async () =>{
        const response = await StudentApi.getWeakStudentSubjectAvgMarkInGrade(grade,subject);
        setData(response);
    }
    getWeakStudentInSubjectAtGrade();
  
  }, [grade,subject]);

  datatable.rows=data;


  return (
    <Card className="flex-fill w-100">
      <CardHeader style={{backgroundColor:"#c17847"}}>
      <div style={{display:"flex", justifyContent:"flex-start"}}>
        <CardTitle  className="mb-0">
            <h1>Học Sinh Dưới Điểm TB</h1>
        </CardTitle>
        
              
            
      </div>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 
            hover 
            responsive
            searchTop
            searchBottom={false}
            entriesOptions={[5,10, 20, 50,100,500]} 
            entries={100} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
    );
  
}
const StudentScorces = (props) => {

  const[grade,setGrade]=useState(12);
  const[subject,setSubject]=useState("Toán Đại");

  useEffect(() => {
    console.log("render!");
  
  }, []);
 
  return(
    
  <Container fluid className="p-0">
    <Header {...props}/>
    <Row>
      <Col>
        <StatisticsScorce {...props} grade={grade} setGrade={setGrade} subject={subject} setSubject={setSubject}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <StudentListScorces {...props} grade={grade} setGrade={setGrade} subject={subject} setSubject={setSubject}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <WeakStudentListScorces {...props} grade={grade} setGrade={setGrade} subject={subject} setSubject={setSubject}/>
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
// export default StudentScorces;
const mapGlobalStateToProps = state => {
  return {
    firstName: selectFistName(state),
    // role: selectRole(state),

  };
};
export default withRouter(connect(mapGlobalStateToProps)(StudentScorces));
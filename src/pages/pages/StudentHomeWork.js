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
  Badge,
  Button
} from "reactstrap";

import { MDBDataTableV5 } from 'mdbreact';
import Header from "./Header";
import {HorizontalBar} from 'react-chartjs-2';
import HomeWorkApi from "../../api/HomeWorkApi";
import StudentApi from "../../api/StudentApi";
function percentage(partialValue, totalValue) {
  if (totalValue === 0){
    return 0;
  }
  return ((partialValue/totalValue) * 100).toFixed(3);
} 

const SubmittedStudentInWeek = (props) =>{ 

  
  

  
  const resetPage = props.resetPage;
  const setBlackList = props.setBlackList;
  const date = new Date();
  const nowMonth = date.getMonth() + 1;
 
  var weekNow = 0;
  if(date.getDate() <= 7){
      weekNow = 1;
  }else if (date.getDate() > 7 && date.getDate() <= 14){
      weekNow = 2;
  }else if (date.getDate() > 14 && date.getDate() <= 21){
      weekNow = 3;
  }else if (date.getDate() > 21 && date.getDate() <= 31){
      weekNow = 4;
  }
  
  const [students, setStudents] = useState([]);
  const [grade,setGrade] = useState(12);
  const [subject,setSubject] = useState("Toán Đại");
  const [month,setMonth] = useState(nowMonth);

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
        field: 'className',
        sort: 'asc',
   
      },
      {
        label: 'Tuần 1',
        field: 'first',
       
      },
      {
        label: 'Tuần 2',
        field: 'second',
     
      },
      {
        label: 'Tuần 3',
        field: 'third',
  
      },
      {
        label: 'Tuần 4',
        field: 'fourth',
  
      },
    ],
    rows: [
      
    ]
  }; 
  const data = {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    datasets: [
      {
        label: '% học sinh hoàn thành btvn ',
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
    const getListStudentSubmitHomeWorkOfSubjectInGrade = async () =>{
        const res = await HomeWorkApi.getAllSubmitStudentOfSubjectInGrade(grade,subject,month);
        setStudents(res);
    }
    getListStudentSubmitHomeWorkOfSubjectInGrade();
  }, [grade,subject,month,resetPage]);

  students.map(st => datatable.rows.push(
    {
          fullName:st.fullName,
          school:st.school,
          studentNumber:st.studentNumber,
          className: grade+st.className,
          first:st.first,
          second:st.second,
          third:st.third,
          fourth:st.fourth,
    }
  ))
  

  var total = [0,0,0,0];

  for(var i = 0 ; i < students.length ; i ++){
    if(students[i].first !== null){
      total[0]++;
    }
    if(students[i].second !== null){
      total[1]++;
    }
    if(students[i].third !== null){
      total[2]++;
    }
    if(students[i].fourth !== null){
      total[3]++;
    }
  }
  for (var k = 0 ; k < 4 ; k ++){
      total[k] = percentage(total[k],students.length);
  }
  
  data.datasets[0].data = total;


  useEffect(() => {
    const getBlackList =  () =>{
      var blackList = [];
      for (var m = 0 ; m < students.length ; m ++){
        var totalSubmit = 0;
        if(students[m].first !== null){
          totalSubmit++;
        }
        if(students[m].second !== null){
          totalSubmit++;
        }
        if(students[m].third !== null){
          totalSubmit++;
        }
        if(students[m].fourth !== null){
          totalSubmit++;
        }
        if (totalSubmit <= weekNow - 2 ){ // thiếu 2 lần btvn
          blackList.push(students[m]);
        }
      }
      setBlackList(blackList);
    }

    getBlackList();
  }, [students,weekNow,setBlackList]);

  


  
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
                                  id="month"
                                  name="month"
                                  onChange={ async (e) =>{
                                    setMonth(e.target.value);
                                }}
                                >
                                          {<option value={nowMonth}>Tháng {nowMonth}</option>} 
                                          {<option value={nowMonth - 1}>Tháng {nowMonth - 1}</option>} 
                                          {<option value={nowMonth - 2}>Tháng {nowMonth - 2}</option>}
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
          <MDBDataTableV5 
          responsive 
          searchTop
          searchBottom={false}
          theadColor="primary-color" 
          theadTextWhite bordered borderless={false} hover 
           entriesOptions={[100,200, 300, 400,500]} entries={100} pagesAmount={100} data={datatable} />
      </CardBody>
    </Card>
    
  </>
    );
}
const StudentInBlackList = (props) =>{ 
  const blackList = props.blackList;
  const resetPage = props.resetPage;
  const setResetPage = props.setResetPage;

  const changeStatus = async (st,status) =>{
    var alertStatus = "Đình Chỉ";
    if (status === "active"){
      alertStatus = "Cho phép";
    }
    var requested = window.confirm("Bạn có chắc chắn muốn "+alertStatus+" học "+st.fullName);
    if(requested){
      const res = await StudentApi.updateStudentStatus(st.id,status);
      if (res === "Update successful!"){
        setResetPage(!resetPage);
        alert(alertStatus + " học " + st.fullName + " thành công!");
      }
    }
  }

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
        label: 'Trường học',
        field: 'school',
  
      },
      {
        label: 'Tình trạng',
        field: 'status',
  
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
    rows: [
       
    ]
  }; 
 

  blackList.map(st => datatable.rows.push({
    id:st.id,
    fullName:st.fullName,
    school:st.school,
    studentNumber:st.studentNumber,
    parentNumber:st.parentNumber,
    status: (st.status === "active") ? 
            <Badge color="success" className="mr-1 my-1">
                {st.status}
            </Badge> :
            <Badge color="danger" className="mr-1 my-1">
                {st.status}
            </Badge> ,
    action: (st.status === "active") ? 
            <Button color="danger" onClick={() => changeStatus(st,"inactive")} style={{backgroundColor:"orange"}}>Đình chỉ</Button>:
            <Button color="success" onClick={() => changeStatus(st,"active")} style={{backgroundColor:"green"}}>Cho phép</Button>
  }))
  
  
  return(
  <> 
    <Card>
      <CardHeader style={{backgroundColor:"#c17847"}}>
      
        <CardTitle tag="h5" className="mb-0" style={{color:"white"}} >
          HỌC SINH THIẾU BTVN 3 LẦN
        </CardTitle>
        
              
 
      </CardHeader>
      <CardBody>
          <MDBDataTableV5 responsive hover 
          
          searchTop
          searchBottom={false}
           entriesOptions={[100,200, 300, 400,500]} entries={100} pagesAmount={100} data={datatable} />
      </CardBody>
    </Card>
    
  </>
    );
}
const StudentHomeWork = (props) => {

  const [blackList, setBlackList] = useState([]);
  const [resetPage, setResetPage] = useState(false);
 
  return(
    
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col>
        <SubmittedStudentInWeek resetPage={resetPage} setBlackList={setBlackList} {...props}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <StudentInBlackList resetPage={resetPage} setResetPage={setResetPage} blackList={blackList} {...props}/>
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
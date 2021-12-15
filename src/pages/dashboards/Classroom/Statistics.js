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
  Label,
  Input
} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import { MoreHorizontal } from "react-feather";
import ExamApi from "../../../api/ExamApi";
import { Bar } from 'react-chartjs-2';

const VerticalBar = (props) =>{
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

    const [listExam,setListExam] = useState([]);
    const [statisticMark,setStattistic] = useState([]);
  
    const clazz = props.clazz;
    const setExam = props.setExam;

    useEffect(() => {
      const getAllExamClass = async () =>{
        const result = await ExamApi.getAllExamInClass(clazz.id);
        try {
            const res = await ExamApi.getExamResultStatisticInClass(result[0].examId,clazz.id);
            setStattistic(res);
            if(result[0].examId !== null){
                setExam(result[0].examId);
            }
            setListExam(result);
        } catch (error) {
            setStattistic([]);
            alert("Lớp học chưa kiểm tra buổi nào!");
        }
      }
      getAllExamClass();
      console.log("render");
    }, [clazz.id,setExam]);

  data.datasets[0].data = statisticMark;

  return(
  <>
      <div className='header'>
          <Label>Chọn ngày kiểm tra</Label>
          <Input 
            type="select"
            id="exam"
            name="exam"
            onChange={ async (e) =>{
              setExam(e.target.value);
              console.log(e.target.value);
              const res = await ExamApi.getExamResultStatisticInClass(e.target.value,clazz.id)
              setStattistic(res);
          }}
          >
            {listExam.map((exam,index) => 
                <option key={index} value={exam.examId} >{exam.createdDate} {exam.type} {exam.examName}</option>
              )}
          </Input>
         
      </div>
      <Bar data={data} options={options} />
  </>
  );
}
const MarkList = (props) => {
  const datatable = {
    columns: [
      {
        label: 'Họ Tên',
        field: 'fullName',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Trường',
        field: 'school',
        width: 100,
      },
      {
        label: 'Điểm',
        field: 'mark',
        width: 100,
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
        sort: 'asc',
        width: 100,
      },
      
    ],
    rows: [
      
    ],
  };  
  const [marks, setListMark] = useState([]);
  const classroom = props.clazz;
  const exam = props.exam;

  useEffect(() => {
    const getAllExamMark = async () =>{
      const result = await ExamApi.getExamResultInClass(exam,classroom.id);
      setListMark(result);
    }
    getAllExamMark();
    console.log("render");
  }, [exam,classroom.id]);

  datatable.rows = marks;

  var avgMark = 0;

  marks.map(mark => avgMark += mark.mark);
  
  if(marks.length !== 0) {
    avgMark = (avgMark/marks.length).toFixed(2);
  }
  


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
            Điểm trung bình: {avgMark}
        </CardTitle>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 hover 
            responsive 
            searchTop searchBottom={false}
            entriesOptions={[5,10, 20, 50,100]} entries={4} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
    );
}
const Statistics = (props) =>{

  
  const [exam, setExam] = useState(1);

  return(
    <Row>
        <Col xs="12" lg="6">
          <VerticalBar {...props} setExam={setExam} exam={exam} />
        </Col>
        <Col lg="6">
          <MarkList exam={exam} {...props} />
        </Col>
    </Row>
  );
}
export default Statistics;

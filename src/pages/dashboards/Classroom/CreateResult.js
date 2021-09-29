import React, {useState, useEffect} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button
} from "reactstrap";
import { Formik,FastField, Form  } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import ClassroomApi from "../../../api/ClassroomApi";
import ExamApi from "../../../api/ExamApi";
import { MDBDataTableV5 } from 'mdbreact';
import Moment from 'moment';
import * as Yup from 'yup';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;
const CreateClass = () => {
  const datatable = {
    columns: [
      {
        label: 'Tên Lớp',
        field: 'fullName',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Lịch Học',
        field: 'schedule',
        width: 120,
      },
      {
        label: 'Thời Gian',
        field: 'time',
        width: 200,
      },
      {
        label: 'Sĩ Số',
        field: 'total',
        sort: 'asc',
        width: 80,
      },
      {
        label: 'Giáo Viên',
        field: 'teacherName',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        width: 200,
      }
    ],
    rows: [
      
    ],
  };
  

  const columns = [
    {
      dataField: 'fullName',
      text: 'Họ Tên'
    }, 
    {
      dataField: 'school',
      text: 'Trường'
    }, 
    {
      dataField: 'mark',
      text: 'Điểm',
      type: 'number'
    },
    
  ];
  
  const students = [];

  function afterSaveCell(oldValue, newValue) {
    console.log('--after save cell--');
    console.log('New Value was apply as');
    console.log(newValue);
    console.log(`and the type is ${typeof newValue}`);
  }
  const [listType, setTypes] = useState([]);
  const [listClazz, setListClass] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [examDate, setDate] = useState("");
  const [classroom,setClassroom] = useState({});

  const submitStudentMarkInClass = async (clazz) => {
        const res = await ClassroomApi.getAllStudentInClassOnDate(clazz.id,examDate)
        setListStudent(res);
        setClassroom(clazz);
  }

  useEffect(() => {
    const getSuggestType = async () =>{
      const result = await ExamApi.getAllExamType();
      setTypes(result);
    }
    getSuggestType();
    console.log("render");
  }, []);

  useEffect(() => {
    console.log("rerender");
  });
  listClazz.map(clazz => datatable.rows.push(
    {
      fullName: clazz.subjectName + " " + clazz.grade + clazz.className,
      schedule: (clazz.schedule !== "1") ? "Thứ "+clazz.schedule : "Chủ Nhật",
      time: clazz.startTime +" - "+clazz.endTime,
      total: clazz.totalStudent,
      teacherName: clazz.teacherId.fullName,
      action: <Button onClick={() => submitStudentMarkInClass(clazz)} type="button" color="primary" style={{borderRadius:"20px"}}>
                    Nhập Điểm
              </Button>
    }
  ))
  listStudent.map(student => students.push(
    {
        fullName:student.fullName,
        school:student.school,
        id:student.id,
        parentNumber:student.parentNumber,
        mark:0
    }
  ))
  return(
  <Container fluid className="p-0">

    <Row>
      <Col>
        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">Nhập Điểm</CardTitle>
          </CardHeader>
          <CardBody>
          <Formik
            initialValues={
              {
                grade: 12,
                type:{},
                examName:"",
                date: "",
                
              }
            }
            validationSchema={
              Yup.object({
                grade: Yup.string()
                  .required('Không thể trống!'),
                
                examName: Yup.string()
                  .required('Không thể trống!'),
                date: Yup.string()
                  .required('Không thể trống!')
              })
            }
    
            onSubmit={async (values) => {

                  console.log(values);
                  console.log(students);
                  const dateFormat = Moment(values.date).format('DD-MM-YYYY');
                  const exam = await ExamApi.createExam(values.examName,values.type.typeId,dateFormat);
                  console.log(exam);
                  const submitMark = [];
                  students.map(student => submitMark.push({
                    studentId:student.id,
                    classroomId:classroom.id,
                    mark:student.mark,
                    examId:exam
                  }))
                 const res = await ExamApi.createExamResult(submitMark);
                 if (res === "create successful!"){
                    alert("Lưu kết quả thành công!");
                 }
            }}
          >
            {({setFieldValue, values, handleChange}) => <Form>
              <Row >
                  <Col>
                      <Label for="grade">Chọn khối:</Label>
                      <Input 
                             
                              bsSize="lg"
                              id ="grade"
                              type="select"
                              name="grade"
                              value={values.grade}
                              onChange={ async (e) =>{
                              // do something
                              handleChange(e);
                              console.log(e.target.value);
                              const date = new Date(values.date);
                              console.log(date.getDay() + 1);
                              const schedule = date.getDay() + 1;
                              const listClass = await ClassroomApi.getListClassroomByScheduleAndGrade(schedule,e.target.value);
                              console.log(listClass);
                              setListClass(listClass);
                              
                            }}
                            >
                              <option value = "12">12</option>
                              <option value = "11">11</option>
                              <option value = "10">10</option>
                              <option value = "9">9</option>
                              <option value = "8">8</option>
                              <option value = "7">7</option>
                              <option value = "6">6</option>
                      </Input>
                    
                  </Col>
                  <Col>
                          <Label style={{marginBottom: "4px"}}>Loại kiểm tra</Label>
                          <Autocomplete
                            id="multiple-limit-tags1"
                            name="type"
                            onChange={(e, value) => {
                              setFieldValue("type", value)
                            }}
                            options={listType}
                            getOptionSelected={(option,value) => option.typeId === value.typeId}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                              <TextField {...params} name="type" variant="outlined" label="Chọn loại kiểm tra"/>
                            )}
                          />
                  </Col>
            </Row>
            <Row>
                  <Col>
                      
                      <FastField
                        label ="Nội Dung Kiểm Tra"
                        bsSize="lg"
                        type="text"
                        name="examName"
                        placeholder="Enter Date Attendance"
                        component={ReactstrapInput}
                      />
                  </Col>
                  <Col>
                          <Label for="date">Chọn ngày kiểm tra:</Label>
                          <Input
                            
                            bsSize="lg"
                            type="date"
                            name="date"
                            id = "date"
                            value={values.date}
                            onChange={ async (e) =>{
                              // do something
                              handleChange(e);
                              console.log(e.target.value);
                              const date = new Date(e.target.value);
                              console.log(date.getDay() + 1);
                              const schedule = date.getDay() + 1;
                              const listClass = await ClassroomApi.getListClassroomByScheduleAndGrade(schedule,values.grade);
                              console.log(listClass);
                              setListClass(listClass);
                              const dateFormat = Moment(date).format('YYYY-MM-DD');
                              setDate(dateFormat);
                            }}
                          >
                          </Input>
                       
                  </Col>
                    
              </Row> 
              <hr />
              <MDBDataTableV5 
              hover 
              scrollX 
              searchTop
              searchBottom={false}
              entriesOptions={[5,10, 20, 50,100]} entries={5} pagesAmount={4} data={datatable} />
              <hr />
              <ToolkitProvider
                  keyField="id"
                  data={ students }
                  columns={ columns }
                  cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell
                  }) }
                >
                  {
                    props => (
                      <div>
                        <BootstrapTable
                          { ...props.baseProps }
                        />
                        <hr />
                     
                        <SearchBar { ...props.searchProps } />
                      </div>
                    )
                  }
                </ToolkitProvider>
              
              {/* <BootstrapTable
                keyField="id"
                data={ students }
                columns={ columns }
                cellEdit={ cellEditFactory({
                  mode: 'click',
                  blurToSave: true,
                  afterSaveCell
                }) }
              /> */}
              <Row>
                    <Col>
                      <Button color="primary"  type="submit" >Lưu Kết Quả</Button>
                    </Col>
              </Row>
            </Form>
            }
          </Formik>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
  );
}
export default CreateClass;

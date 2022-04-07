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
  Button,
  Alert
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
import TestApi from "../../../apiLuyenDe/TestApi";

const removeLastThreeChar = (str) => {
  return str.slice(0,-3)
}

const { SearchBar } = Search;
const CreateClass = () => {
  const datatable = {
    columns: [
      {
        label: 'Tên Lớp',
        field: 'fullName',
        
      },
      {
        label: 'Lịch Học',
        field: 'listTime',
     
      },
      {
        label: 'Giáo Viên',
        field: 'teacherName',
        sort: 'disabled',
    
      },
      {
        label: 'Action',
        field: 'action',
  
      }
    ],
    rows: [
      
    ],
  };
  

  const columns = [
    {
      dataField: 'id',
      text: 'ID'
    }, 
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
  
  const [students, setStudents] = useState([]); // only student's info and without student mark
  

  function afterSaveCell(oldValue,newValue,oldRow) {
    console.log(oldValue);
    console.log(newValue);
    console.log(oldRow); // lay ca row

    // setStudents(current =>
    //   produce(current, v => {
    //     v[oldRow.index].mark = newValue;
    //   })
    // );

    // console.log('--after save cell--');
    // console.log('New Value was apply as');
    // console.log(newValue);
    // console.log(`and the type is ${typeof newValue}`);
    
  }
  const [listType, setTypes] = useState([]);
  const [listClazz, setListClass] = useState([]);
  const [listStudent, setListStudent] = useState([]); // student's info and handle student's mark to submit
  const [examDate, setDate] = useState("");
  const [classroom,setClassroom] = useState({});
  const [examTestingSystemId,setExamTestingSystemId] = useState(""); // examId from testing system;
  const [canSubmit, setCanSubmit] = useState(true);

  const submitStudentMarkInClass = async (clazz) => {
        const res = await ClassroomApi.getAllStudentInClassOnDate(clazz.id,examDate);
        if(res.length !== 0){
          setListStudent(res);
        }
        else{
          const students = await ClassroomApi.getAllStudentInClass(clazz.id);
          setListStudent(students);
        }
        setClassroom(clazz);
  }

  useEffect(() => {
    const getSuggestType = async () =>{
      const result = await ExamApi.getAllExamType();
      setTypes(result);
    }
    getSuggestType();
    
  }, []);

  
  
  listClazz.map(clazz => datatable.rows.push(
    {
      fullName: clazz.subjectName + " " + clazz.grade + clazz.className,
      listTime : (clazz.listSchedule.map((s,i) => 
                  <div key={i}>
                    {removeLastThreeChar(s.startTime)} - {removeLastThreeChar(s.endTime)} {(s.schedule !== "1") ? "Thứ "+s.schedule : "Chủ Nhật"}
                    <br/>
                  </div>)),
      teacherName: clazz.teacherId.fullName,
      action: <Button onClick={() => submitStudentMarkInClass(clazz)} type="button" color="primary" style={{borderRadius:"20px"}}>
                    Nhập Điểm
              </Button>
    }
  ))

  const [mappingStudentResultAndTestingSystemId, setMappingTestingSystemId] = useState({});

 


  const autoFillStudentMark = async (id) => {
    
    var mappingTestingIdAndResult = {};
    
    // call api from luyendeapi.tct.edu.vn
    // const res = await TestingApi.getStudentResultInExam(id)
    // if (res not exisit) => alert(Không tồn tại bài kiểm tra)
    // else tiếp tục xử lý như dưới
    // return [
    //   {
    //     id: "abc1",
    //     mark:10
    //     ...
    //   },
    //   {
    //     id: "abc1",
    //     mark:10
    //     ...
    //   },
    //   {
    //     id: "abc1",
    //     mark:10
    //     ...
    //   },
    // ]
    try {
      const res = await TestApi.getExamResultTable(id);
      for(var i = 0 ; i < res.length ; i++){
        mappingTestingIdAndResult[res[i].id] = res[i].mark.toFixed(2);
      }
      setMappingTestingSystemId(mappingTestingIdAndResult);
      setCanSubmit(true);
      console.log(res);
    } catch (error) {
      alert("ID bài kiểm tra không tồn tại!");
      setCanSubmit(false);
    }
    
    

   
    
  }

  useEffect(() => {
    const handleChangeStateStudentOnToolkit = () =>{  // handle mark to submit
     
      var intiialStudentsValue = [];
      for (var k = 0 ; k < listStudent.length ; k++){
        
        intiialStudentsValue.push(
          {   
              index:k,
              fullName:listStudent[k].fullName,
              testingSystemId:listStudent[k].testingSystemId,
              school:listStudent[k].school,
              id:listStudent[k].id,
              parentNumber:listStudent[k].parentNumber,
              mark: (Object.keys(mappingStudentResultAndTestingSystemId).length === 0 ) ? 
                    -1 : 
                    (mappingStudentResultAndTestingSystemId[listStudent[k].testingSystemId] !== undefined) ? 
                    mappingStudentResultAndTestingSystemId[listStudent[k].testingSystemId] : 0
              
          }
        )
      }
      setStudents(intiialStudentsValue);
    }
    handleChangeStateStudentOnToolkit();
    
  }, [listStudent,mappingStudentResultAndTestingSystemId]);
  
  
  

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

                  if(canSubmit){

                      const dateFormat = Moment(values.date).format('DD-MM-YYYY');
                      const exam = await ExamApi.createExam(values.examName,values.type.typeId,dateFormat,examTestingSystemId);
                      
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

                  }else{
                    alert("ID bài kiểm tra nhập vào không hợp lệ!");
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
                        placeholder="VD: Chương 1: Thể tích khối đa diện"
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
                              // console.log(e.target.value);
                              const date = new Date(e.target.value);
                              // console.log(date.getDay() + 1);
                              const schedule = date.getDay() + 1;
                              const listClass = await ClassroomApi.getListClassroomByScheduleAndGrade(schedule,values.grade);
                              // console.log(listClass);
                              setListClass(listClass);
                              const dateFormat = Moment(date).format('YYYY-MM-DD');
                              setDate(dateFormat);
                            }}
                          >
                          </Input>
                       
                  </Col>
                    
              </Row> 
              <div>
                          <Alert color="primary" style={{padding:"10px", fontWeight:"bolder"}}>
                            Note: Ngày kiểm tra phải đúng với lịch học của lớp cần nhập điểm! Học sinh nghỉ học hôm kiểm tra sẽ không được nhập điểm. 
                            Trong trường hợp cả lớp nghỉ học (học online) vào hôm kiểm tra thì sẽ hiển thị danh sách cả lớp học!
                          </Alert>
              </div>
              <hr />
              <MDBDataTableV5 
              hover 
              responsive
              searchTop
              searchBottom={false}
              entriesOptions={[5,10, 20, 50,100]} entries={5} pagesAmount={4} data={datatable} />
              <hr />
              <ToolkitProvider
                  keyField="id"
                  data={ students }
                  columns={ columns }
                  cellEdit
                  search
                >
                  {
                    props => (
                      <div>
                        <Row>
                            <Col>
                                <SearchBar placeholder="Search..." { ...props.searchProps } />

                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            <div className="input-group">
                                <Input type="text" className="form-control" placeholder="Nhập ID của bài kiểm tra để tự động nhập điểm"
                                      onChange={e => setExamTestingSystemId(e.target.value)}
                                />
                                <Button color="primary" type="button" style={{margin:"auto"}} onClick={() => autoFillStudentMark(examTestingSystemId)}>
                                    Tự động nhập
                                </Button>
                              
                              </div>
                                 
                            </Col>
                        </Row>
                        <div>
                          <Alert color="primary" style={{padding:"10px"}}>
                            Note: Bấm tự động nhập đầu tiên! nếu đang nhập điểm mà bấm tự động nhập thì sẽ mất hết dữ liệu vừa nhập, ID bài kiểm tra lấy từ hệ thống luyện đề  
                            {` ${process.env.REACT_APP_LUYEN_DE_DOMAIN}`} . 
                            Học sinh phải liên kết tài khoản từ hệ thống luyện đề mới có thể tự động nhập!
                          </Alert>
                        </div>
                        <hr />
                        <BootstrapTable
                         
                          keyField="id"
                          data={ students }
                          columns={ columns }
                          cellEdit={ cellEditFactory({
                            mode: 'click',
                            blurToSave: true,
                            afterSaveCell
                        }) }
                          { ...props.baseProps }
                         
                        />
                        
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

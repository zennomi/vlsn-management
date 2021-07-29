import React,{useState, useEffect} from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  // Input,
  Button,
  Modal, 
} from "reactstrap";
import { Formik,FastField, Form  } from 'formik';
import { MDBDataTableV5 } from 'mdbreact';
import { MoreHorizontal } from "react-feather";
import { Autocomplete } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField';
import { ReactstrapInput } from "reactstrap-formik";
// import {getAllStudentAction} from "../../redux/actions/studentInfoAction";
// import {selectListStudent} from "../../redux/selectors/studentInfoSelector";
// import { connect } from "react-redux";
import StudentApi from "../../api/StudentApi";
import ClassroomApi from "../../api/ClassroomApi";
// import avatar1 from "../../assets/img/avatars/avatar.jpg";
// import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
// import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
// import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
// import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

const datatable = {
  columns: [
    {
      label: 'Họ Tên',
      field: 'fullName',
      width: 200,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'fullName',
      },
    },
    {
      label: 'Trường học',
      field: 'school',
      width: 250,
    },
    {
      label: 'SĐT',
      field: 'studentNumber',
      width: 200,
    },
    {
      label: 'Lớp',
      field: 'grade',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Tên PH',
      field: 'parentName',
      sort: 'disabled',
      width: 150,
    },
    {
      label: 'SĐT PH',
      field: 'parentNumber',
      sort: 'disabled',
      width: 100,
    },
    {
      label: 'Action',
      field: 'action',
      width: 150,
    },
  ],
  rows: [
     
  ]
}; 


const ClientsList = (props) =>{ 
  const datatable = {
    columns: [
      {
        label: 'Họ Tên',
        field: 'fullName',
        width: 200,
        
      },
      {
        label: 'Trường học',
        field: 'school',
        width: 250,
      },
      {
        label: 'SĐT',
        field: 'studentNumber',
        width: 200,
      },
      {
        label: 'Lớp',
        field: 'grade',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Tên PH',
        field: 'parentName',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Action',
        field: 'action',
        width: 150,
      },
    ],
    rows: [
       
    ]
  }; 
  
  const [suggestClass, setSuggest] = useState([]);

  const [modalUpdate, setModalUpdate] = useState(false);
  const [student, setStudent] = useState({});
  const [listStudent, setListStudent] = useState([]);
  
  useEffect(() => {
    const getAllStudentList = async () =>{
      const result = await StudentApi.getAllStudent();
      setListStudent(result);
    }
    getAllStudentList();
    console.log("render");
  }, []);
  useEffect(() => {
    console.log("rerender");
  });

  const toggleUpdate = async (rowData) => {
    
    const res = await StudentApi.getStudentById(rowData.id);
    setStudent(res);
    setModalUpdate(!modalUpdate);
    const listSuggest = await ClassroomApi.getListClassroomInGrade(rowData.grade);
    setSuggest(listSuggest);
  
  }
  const redriectToProfile = (id) => {
    props.history.push({
      pathname: '/student/info',
      state: { studentId: id }
    })
  }
 ;
  
  datatable.rows = listStudent;
  datatable.rows.map((row,i) => {
    row.action = <div style={{display:"flex"}}>
                <button  onClick={() => redriectToProfile(i)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>
                </button>
                <button onClick={() => toggleUpdate(row)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
                <button onClick={() => redriectToProfile(i)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
                </div>
      return null;
  })
 
  
  return(
  <> 
    <Card>
      <CardHeader>
        <div className="card-actions float-right">
          <UncontrolledDropdown >
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle tag="h5" className="mb-0">
          Học sinh
        </CardTitle>
      </CardHeader>
      <CardBody>
          <MDBDataTableV5 hover scrollX entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable} />
      </CardBody>
    </Card>
    <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
      <Row>

        <Col>
        <Card>
        <CardBody>
          <Formik
              initialValues={
                {
                  lastName: student.lastName,
                  firstName: student.firstName,
                  grade: student.grade,
                  school: student.school,
                  studentPhone:student.studentNumber,
                  parentPhone:student.parentNumber,
                  parentName:student.parentName || "Chưa có tên PH",
                  listClass:student.listClass
                }
              }
              onSubmit={async (values) => {
                const result = await StudentApi.updateStudentInfo(
                  student.id,
                  values.firstName,
                  values.lastName,
                  student.status,
                  values.school,
                  values.grade,
                  values.studentPhone,
                  values.parentPhone,
                  values.parentName
                )
                const listUpdateClass = [];
                var notChange = true;
                
                if (values.listClass.length !== student.listClass.length){
                    notChange = false;
                }
                else{
                  values.listClass.map((clazz,i) => {
                    if (clazz.id !== student.listClass[i].id){
                        notChange = false;
                        return false;
                    }
                    return true;
                  })
                }
                if(!notChange){
                  values.listClass.map(clazz => 
                    listUpdateClass.push({
                        classId: clazz.id,
                        studentId: student.id
                    })
                  )
                }
                if(result === "Update successful!" && notChange === false){
                    const res = await StudentApi.updateStudentClass(student.id,listUpdateClass);
                    if(res === "Update successful!"){
                        alert("Cập nhật học sinh thành công!");
                        const result = await StudentApi.getAllStudent();
                        setListStudent(result);
                        setModalUpdate(!modalUpdate);
                    }
                    else{
                      alert("Cập nhật lớp học thất bại");
                    }
                }else if (result === "Update successful!" && notChange === true){
                      const result = await StudentApi.getAllStudent();
                      setListStudent(result);
                      alert("Cập nhật học sinh thành công!");
                      setModalUpdate(!modalUpdate);
                }
                else{
                    alert("Cập nhật học sinh thất bại! Xem lại thông tin học sinh");
                }
                
              }}
            >
             {({setFieldValue, values}) => <Form>
                <Row >
                    <Col>
                  
                      <FastField
                        label="Họ và Đệm HS"
                        bsSize="lg"
                        type="text"
                        name="lastName"
                        placeholder="nhập họ và đệm:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                    <Col>
                     
                      <FastField
                        label="Tên HS"
                        bsSize="lg"
                        type="text"
                        name="firstName"
                        placeholder="nhập tên học sinh:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row>
                <Row>
                    <Col>
                      
                      <FastField
                        label="Trường học"
                        bsSize="lg"
                        type="text"
                        name="school"
                        placeholder="nhập trường học:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                    <Col>
      
                      <FastField
                              label="Lớp"
                              bsSize="lg"
                              type="select"
                              name="grade"
                              placeholder="nhập lớp:.. "
                              component={ReactstrapInput}
                              
                            >
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                      </FastField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <div >
                        <div>Lớp học đã đăng ký</div>
                        {/* {values.listClass.map((clazz,index) => <div key={index}>{clazz.className} Thầy {clazz.teacherName} Thứ {clazz.timeTable.day}</div>)} */}
                        <Autocomplete
                          multiple
                          limitTags={2}
                          label="Chọn lớp học"
                          id="multiple-limit-tags"
                          value={values.listClass}
                          name="listClass"
                          onChange={(e, value) => {
                            setFieldValue("listClass", value)
                          }}
                          getOptionSelected={(option, value) => option.id === value.id}
                          options={suggestClass}
                          getOptionLabel={(option) =>option.subjectName +"-"+option.grade + option.className +"-"+ option.teacherId.fullName +"-Thứ "+ option.schedule}
                          renderInput={(params) => (
                            <TextField {...params} name="listClass" variant="outlined" label="Chọn lớp học" placeholder="Tên lớp" />
                          )}
                        />
                      </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"10px"}}>
                      <Col>
                          <FastField
                            label="SĐT học sinh"
                            bsSize="lg"
                            type="text"
                            name="studentPhone"
                            placeholder="nhập sđt học sinh:.."
                            component={ReactstrapInput}
                          />
                      </Col>
                      <Col>
                          <FastField
                            label="SĐT phụ huynh"
                            bsSize="lg"
                            type="text"
                            name="parentPhone"
                            placeholder="nhập sđt phụ huynh:.."
                            component={ReactstrapInput}
                          />
                      </Col>
                </Row>
                <Row>
                      <Col>
                          <FastField
                            label="Họ và Tên phụ huynh"
                            bsSize="lg"
                            type="text"
                            name="parentName"
                            placeholder="nhập họ tên phụ huynh:.."
                            component={ReactstrapInput}
                          />
                      </Col>
                </Row>
                <Row>
                    <Col>
                      <Button  type="submit" >Cập nhật</Button>
                      <Button onClick={() => setModalUpdate(!modalUpdate)} >Hủy</Button>
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
const Single = (props) => {
  


  return(
  
    <Card>
      <CardHeader>
          <CardTitle>Thêm học sinh mới</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{margin:"10px"}}>
        <Formik
              initialValues={
                {
                  lastName: '',
                  firstName: '',
                  grade: 12,
                  school: '',
                  studentPhone:'',
                  parentPhone:'',
                  parentName:'',
                  listClass:[]
                }
              }
              onSubmit={(values) => {
                console.log(values);
                alert("Thêm học sinh thành công!");
              }}
            >
             {({setFieldValue, values}) => <Form>
                <Row >
                    <Col>
                  
                      <FastField
                        label="Họ và đệm"
                        bsSize="lg"
                        type="text"
                        name="lastName"
                        placeholder="nhập họ và đệm:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row>
                <Row>
                    <Col>
                     
                      <FastField
                        label="Tên"
                        bsSize="lg"
                        type="text"
                        name="firstName"
                        placeholder="nhập tên học sinh:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row> 
                <Row>
                    <Col>
      
                      <FastField
                              label="Lớp"
                              bsSize="lg"
                              type="select"
                              name="grade"
                              placeholder="nhập lớp:.. "
                              component={ReactstrapInput}
                              
                            >
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                      </FastField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      
                      <FastField
                        label="Trường học"
                        bsSize="lg"
                        type="text"
                        name="school"
                        placeholder="nhập trường học:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <div >
            
                        <Autocomplete
                          multiple
                          limitTags={2}
                          label="Chọn lớp học"
                          id="multiple-limit-tags"
                          name="listClass"
                          onChange={(e, value) => {
                            setFieldValue("listClass", value)
                          }}
                          options={datatable.rows}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField {...params} name="listClass" variant="outlined" label="Chọn lớp học" placeholder="Tên lớp" />
                          )}
                        />
                      </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"10px"}}>
                      <Col>
                          <FastField
                            label="SĐT học sinh"
                            bsSize="lg"
                            type="text"
                            name="studentPhone"
                            placeholder="nhập sđt học sinh:.."
                            component={ReactstrapInput}
                          />
                      </Col>
                      <Col>
                          <FastField
                            label="SĐT phụ huynh"
                            bsSize="lg"
                            type="text"
                            name="parentPhone"
                            placeholder="nhập sđt phụ huynh:.."
                            component={ReactstrapInput}
                          />
                      </Col>
              </Row>
              <Row>
                      <Col>
                          <FastField
                            label="Họ và Tên phụ huynh"
                            bsSize="lg"
                            type="text"
                            name="parentName"
                            placeholder="nhập họ tên phụ huynh:.."
                            component={ReactstrapInput}
                          />
                      </Col>
                </Row>
                <Row>
                    <Col>
                      <Button  type="submit" >Thêm</Button>
                      <Button onClick={props.handler} >Hủy</Button>
                    </Col>
                </Row>
              </Form>
              }
            </Formik>
        
        </div>
      </CardBody>
    </Card>
  );
}
const Clients = (props) => {

  
  const [modal, setModal] = useState(false);
  
  // const getAllStudent = props.getAllStudentAction;
  
  // useEffect(() => {
  //   const getAllStudentList = async () =>{
  //     const result = await StudentApi.getAllStudent();
  //     console.log(result);
  //     getAllStudent(result);
  //   }
  //   getAllStudentList();
  // }, [getAllStudent]);

  

  const toggle = () => setModal(!modal);
 
  return(
    
  <Container fluid className="p-0">
    <Row>
        <Col style={{display:"flex"}}>
            <h1 className="h3 mb-3">Học Sinh</h1>
            <Button style={{marginLeft:"auto",borderRadius:"15px"}} variant="primary" onClick={toggle}>
                Thêm học sinh mới
            </Button>
        </Col>
    </Row>
    <Row>
      <Col>
        <ClientsList {...props}  />
        
      </Col>
      <Modal isOpen={modal} toggle={toggle}>
            <Single handler = {toggle} />
      </Modal>
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
export default Clients;
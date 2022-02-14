import React,{useState, useEffect} from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
 
  Row,

  Button,
  Input,
  Label,
  Modal, 
} from "reactstrap";
import { Formik,FastField, Form  } from 'formik';
import { MDBDataTableV5 } from 'mdbreact';
import { Autocomplete } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField';
import { ReactstrapInput } from "reactstrap-formik";
import StudentApi from "../../api/StudentApi";
import ClassroomApi from "../../api/ClassroomApi";
import UserApi from "../../api/UserApi";
import FacebookIcon from '@material-ui/icons/Facebook';
import View from "@material-ui/icons/Visibility"
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { CSVLink } from "react-csv";

import * as Yup from 'yup';

const headers = [
  { label: "Họ và Đệm", key: "lastName" },
  { label: "Tên", key: "firstName" },
  { label: "Trường", key: "lastName" },
  { label: "SĐT", key: "studentNumber" },
  { label: "Lớp", key: "grade" },
  { label: "trường học", key: "school" },
  { label: "Tên PH", key: "parentName" },
  { label: "SĐT PH", key: "parentNumber" },
  { label: "Facebook", key: "facebookLink" },
];

const removeAccents = (str) => {
  return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ClientsList = (props) =>{ 
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
        label: 'SĐT',
        field: 'studentNumber',
  
      },
      {
        label: 'Lớp',
        field: 'grade',
        sort: 'asc',
 
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
      {
        label: '',
        field: 'action',
     
      },
    ],
    rows: [
       
    ]
  }; 
  
  const [suggestClass, setSuggest] = useState([]);

  const [modalUpdate, setModalUpdate] = useState(false);
  const [student, setStudent] = useState({});
  const grade = props.grade;
  const setGrade = props.setGrade;
  const listStudent = props.listStudent;
  const setListStudent = props.setListStudent;
  
  

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
  };
  
  const toggleDelete = async (student) => {
    var requested = window.confirm("Bạn có chắc chắn muốn xóa học sinh " + student.fullName);
  
    if ( requested) {
        const res = await StudentApi.deleteStudent(student.id);
        if (res === "delete successful!"){
            const newStudentList = await StudentApi.getAllStudentInGrade(grade);
            setListStudent(newStudentList);
            alert("Xóa học sinh thành công!");
        }
    }
  };
  
  listStudent.map(st => datatable.rows.push(
    {
      id:st.id,
      fullName:st.fullName,
      school:st.school,
      grade:st.grade,
      studentNumber:st.studentNumber,
      parentNumber: st.parentNumber,
      parentName:st.parentName,
      facebookLink: (st.facebookLink !== null) ?
      <a alt={st.facebookLink} href={st.facebookLink} style={{color:"blue",fontWeight:"bolder"}}>
        Xem Facebook <FacebookIcon color="primary"/> 
     </a> : "Chưa có",
     action: <div style={{display:"flex"}}>
                <button style={{background:"none",border:"none"}}  onClick={() => redriectToProfile(st.id)}>
                  <View color ="primary" />
                </button>
                <button style={{background:"none",border:"none"}} onClick={() => toggleUpdate(st)}>
                    <Edit color="action"/>
                </button>
                <button style={{background:"none",border:"none"}} onClick={() => toggleDelete(st)}>
                    <Delete color="secondary"/>
                </button>
            </div>
    }
  ))
  
 
  
  return(
  <> 
    <Card>
      <CardHeader>
                  <Row >
                  <Col xs="auto">
                    <Input 
                              id ="grade"
                              type="select"
                              name="grade"
                              value={grade}
                              onChange={ (e) =>{
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
                  </Row>
      </CardHeader>
      <CardBody>
          <Row>
                <Col>
                  
                      <MDBDataTableV5 
                      hover 
                      responsive
                      pagingTop
                      searchTop
                      searchBottom={false}
                      barReverse
                      exportToCSV
                      entriesOptions={[100,200, 300, 400]} entries={100} pagesAmount={100} data={datatable} />
                  
                      <CSVLink headers={headers} data={listStudent}>Export to CSV</CSVLink>
                </Col>
          </Row>
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
                  facebookLink:student.facebookLink,
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
                  values.parentName,
                  values.facebookLink
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
                          getOptionLabel={(option) => option.subjectName +" - "+option.grade + option.className +" - GV."+ option.teacherId.fullName +" - "+
                                                   ((option.schedule !== "1") ? "Thứ "+option.schedule : "Chủ Nhật")}
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
                          <FastField
                            label="Link Facebook"
                            bsSize="lg"
                            type="text"
                            name="facebookLink"
                            placeholder=""
                            component={ReactstrapInput}
                          />
                      </Col>
                </Row>
                <Row>
                    <Col>
                      <Button color="primary" type="submit" >Cập nhật</Button>
                      <Button color="primary" onClick={() => setModalUpdate(!modalUpdate)} >Hủy</Button>
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
  
  const [suggestClass, setSuggest] = useState([]);
  
  const setModalUpdate = () => props.handler
  const setListStudent = props.setListStudent;
  const grade = props.grade;
  useEffect(() => {
    const getSuggestClass = async () =>{
      const result = await ClassroomApi.getListClassroomInGrade(12);
      setSuggest(result);
    }
    getSuggestClass();
   
  }, []);

  
  

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
                  facebookLink:'',
                  listClass:[]
                }
              }

              validationSchema={
                Yup.object({
                  lastName: Yup.string()
                    .required('bắt buộc'),
  
                  firstName: Yup.string()
                    .required('bắt buộc'),
  
                  studentPhone: Yup.string()
                    .required('bắt buộc')
                    .min(10, 'SĐT phải có 10 chữ số')
                    .max(10, 'SĐT phải có 10 chữ số')
                    .matches(/^[0-9]+$/, "SĐT không chứa kí tự khác")
                    .required('bắt buộc')
                    .test('checkUniqueUsername', 'Tài khoản đã được đăng ký.', async username => {
                      // call api
                      const isExists = await UserApi.existsByUsername(username);
                      return !isExists;
                    }),

                  parentPhone: Yup.string()
                    .min(10, 'SĐT phải có 10 chữ số')
                    .max(10, 'SĐT phải có 10 chữ số')
                    .matches(/^[0-9]+$/, "SĐT không chứa kí tự khác"),
                  
                })
              }


              onSubmit={async (values) => {
              
                
                var lastNameDeleteSpace = values.lastName.replace(/\s+/g, ''); // xóa khoảng trắng
                const lastName = capitalizeFirstLetter(lastNameDeleteSpace);  // viết hoa chữ cái đầu
                const resLast = removeAccents(lastName) // bỏ dấu tiếng việt
                var firstNameDeleteSpace = values.firstName.replace(/\s+/g, ''); // xóa khoảng trắng
                const firstName = capitalizeFirstLetter(firstNameDeleteSpace);  // viết hoa chữ cái đầu
                const resFirst = removeAccents(firstName); // bỏ dấu tiếng việt
                const password = resLast+resFirst;
               

                const newStudentId = await StudentApi.createStudent(
                  values.studentPhone, // username là sđt của học sinh
                  password,
                  values.firstName,
                  values.lastName,
                  values.school,
                  values.grade,
                  values.studentPhone,
                  values.parentPhone,
                  values.parentName,
                  values.facebookLink
                )
                const listClassStudent = [];
                
          
                if(newStudentId !== 0 && values.listClass.length !== 0){

                      values.listClass.map(clazz => 
                        listClassStudent.push({
                            classId: clazz.id,
                            studentId: newStudentId
                        })
                      )
                    const res = await StudentApi.createStudentClass(newStudentId,listClassStudent);
                    if(res === "create successful!"){
                        const result = await StudentApi.getAllStudentInGrade(grade);
                        setListStudent(result);
                        setModalUpdate();
                        alert("thêm học sinh thành công! ID: "+newStudentId + "\r\n"+ 
                        "tài khoản: "+ values.studentPhone + "\r\n"
                         + "mật khẩu:" + password);
                    }
                    else{
                      alert("thêm thất bại");
                    }
                }else if (newStudentId !== 0 && values.listClass.length === 0){
                      const result = await StudentApi.getAllStudentInGrade(grade);
                      setListStudent(result);
                      setModalUpdate();
                      alert("thêm học sinh thành công! ID: "+newStudentId + "\r\n"+ 
                        "tài khoản: "+ values.studentPhone + "\r\n"
                         + "mật khẩu:" + password);
                }
                else{
                    alert("thêm học sinh thất bại! Xem lại thông tin học sinh");
                }
                
                
              }}
              
            >
             {({setFieldValue, values, handleChange}) => <Form>
                <Row >
                    <Col >
                  
                      <FastField
                        label="Họ và đệm"
                        bsSize="lg"
                        type="text"
                        name="lastName"
                        placeholder="Vd: Nguyễn Đức"
                        component={ReactstrapInput}
                      />
                    </Col>
                    <Col > 
                      <FastField
                        label="Tên"
                        bsSize="lg"
                        type="text"
                        name="firstName"
                        placeholder="Vd: Thắng"
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row>
                <Row>
                    <Col>
                      {/* <label>Chọn lớp:</label> */}
                      <Label for="grade">Chọn lớp:</Label>
                      <Input 
                              label="Lớp"
                              bsSize="lg"
                              id ="grade"
                              type="select"
                              name="grade"
                              
                              // component={ReactstrapInput}
                              onChange={ async (e) =>{
                                // do something
                                handleChange(e);
                                console.log(e.target.value);
                                const newSuggest = await ClassroomApi.getListClassroomInGrade(e.target.value);
                                setSuggest(newSuggest);
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
                      <FastField
                        label="Trường học"
                        bsSize="lg"
                        type="text"
                        name="school"
                        placeholder="Vd: Thăng Long"
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
                          options={suggestClass}
                          getOptionSelected={(option, value) => option.id === value.id}
                          getOptionLabel={(option) =>option.subjectName +" - "+option.grade + option.className +" - GV."+ option.teacherId.fullName +" - "+
                                               ((option.schedule !== "1") ? "Thứ "+option.schedule : "Chủ Nhật")}
                          renderInput={(params) => (
                            <TextField {...params} name="listClass" variant="outlined" label="Đăng ký học lớp"  placeholder="Tên lớp" />
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
                            placeholder="Vd:0965993506"
                            component={ReactstrapInput}
                          />
                      </Col>
                      <Col>
                          <FastField
                            label="SĐT phụ huynh"
                            bsSize="lg"
                            type="text"
                            name="parentPhone"
                            placeholder="Vd: 0965993506"
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
                            placeholder="Vd: Nguyễn Hùng Giang"
                            component={ReactstrapInput}
                          />
                      </Col>
                </Row>
                <Row>
                      <Col>
                          <FastField
                            label="Link Facebook"
                            bsSize="lg"
                            type="text"
                            name="facebookLink"
                            placeholder="Vd:https://www.facebook.com/nguyen.ducthang.52056/"
                            component={ReactstrapInput}
                          />
                      </Col>
                </Row>
                <Row>
                    <Col>
                      <Button color="primary"  type="submit" >Thêm</Button>
                      <Button color="primary" onClick={props.handler} >Hủy</Button>
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
  const [grade,setGrade] = useState(12);
  const [listStudent, setListStudent] = useState([]);
  
  useEffect(() => {
    const getAllStudentList = async () =>{
      const result = await StudentApi.getAllStudentInGrade(grade);
      setListStudent(result);
    }
    getAllStudentList();
  }, [grade]);
  
  
  const toggle = () => setModal(!modal);
 
  return(
    
  <Container fluid className="p-0">
    <Row>
        <Col style={{display:"flex"}}>
            <h1 className="h3 mb-3">Học Sinh Khối {grade}</h1>
            <Button style={{marginLeft:"auto"}} color="primary" onClick={toggle}>
                Thêm học sinh mới
            </Button>
        </Col>
    </Row>
    <Row>
      <Col>
        <ClientsList 
          grade ={grade}
          setGrade={setGrade}
         {...props} listStudent={listStudent} setListStudent={setListStudent}/>
        
      </Col>
      <Modal isOpen={modal} toggle={toggle}>
            <Single grade={grade} handler = {toggle} listStudent={listStudent} setListStudent={setListStudent} />
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
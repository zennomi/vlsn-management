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
 
  Modal, 
} from "reactstrap";
import { Formik,FastField, Form  } from 'formik';
import { MDBDataTableV5 } from 'mdbreact';

import * as Yup from 'yup';
import { ReactstrapInput } from "reactstrap-formik";
import AddIcon from '@material-ui/icons/Add';
import TeacherApi from "../../api/TeacherApi";
import UserApi from "../../api/UserApi";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
const TeachersList = (props) =>{ 

  const listTeachers = props.listTeachers;
  const setListTeachers = props.setListTeachers;
  const [modalUpdate, setModalUpdate] = useState(false);
  const [teacher, setTeacher] = useState({});

  const datatable = {
    columns: [
      {
        label: 'ID',
        field: 'teacherId',
     
      },
      {
        label: 'Họ Tên',
        field: 'fullName',
     
      },
      {
        label: 'Môn học',
        field: 'subjectName',
 
      },
      {
        label: '',
        field: 'action',
     
      },
    ],
    rows: [
       
    ]
  }; 
  
  
 

  const toggleUpdate = async (rowData) => {
      const res = await TeacherApi.getTeacherById(rowData.teacherId);
      setTeacher(res);
      setModalUpdate(true);
    
  
  }
  const toggleDelete = async (teacher) => {
    var requested = window.confirm("Bạn có chắc chắn muốn xóa giáo viên " + teacher.fullName);
  
    if ( requested) {
        const res = await TeacherApi.deleteTeacher(teacher.teacherId);
        if (res === "delete successful!"){
            const newTeacherlist = await TeacherApi.getAllTeacher();
            setListTeachers(newTeacherlist);
            alert("Xóa giáo viên thành công!");
        }
    }
  };
 
  
  datatable.rows = listTeachers;
  datatable.rows.map((row,i) => {

  row.action = <div style={{display:"flex"}}>
                <button style={{background:"none",border:"none"}} onClick={() => toggleUpdate(row)}>
                    <Edit color="action"/>
                </button>
                <button style={{background:"none",border:"none"}} onClick={() => toggleDelete(row)}>
                    <Delete color="secondary"/>
                </button>
                </div>
      return null;
  })
 
  
  return(
  <> 
    <Card>
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          Giáo viên
        </CardTitle>
      </CardHeader>
      <CardBody>
          <MDBDataTableV5 
          hover 
          responsive
          entriesOptions={[5,10, 20, 50,100]} entries={20} pagesAmount={20} data={datatable} />
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
                   firstName:(teacher.firstName !== undefined) ? teacher.firstName : "",
                   lastName:(teacher.lastName !== undefined) ? teacher.lastName : "",
                   subjectName:(teacher.subjectName !== undefined) ? teacher.subjectName : "Toán",
                }
              }
              onSubmit={async (values) => {
                    const res = await TeacherApi.updateTeacher(
                      teacher.teacherId,
                      values.subjectName,
                      values.firstName,
                      values.lastName
                    )

                    if(res === "update successful!"){
                      const newteacherlist = await TeacherApi.getAllTeacher();
                      setListTeachers(newteacherlist);
                      alert("Cập nhật thành công!");
                      setModalUpdate(false);
                    }else{
                      alert("Cập nhật thất bại!");
                    }
              }}
            >
             {({setFieldValue, values}) => <Form>
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
                      <FastField
                              label="Chọn môn học"
                              bsSize="lg"
                              type="select"
                              name="subjectName"
                              placeholder="chọn môn học dạy"
                              component={ReactstrapInput}
                          
                            >
                              <option value = "Toán">Toán</option>
                              <option value = "Tiếng Anh">Tiếng Anh</option>
                              <option value = "Lý">Lý</option>
                              <option value = "Hóa">Hóa</option>
                              <option value = "Văn">Văn</option>
                      </FastField>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                      <Button  type="submit" >Cập nhật</Button>
                      <Button onClick={() => setModalUpdate(false)} >Hủy</Button>
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
  
  const setListTeachers = props.setListTeachers;
  const openmodal = props.handler;

  return(
  
    <Card>
      <CardHeader>
          <CardTitle>Thêm giáo viên mới</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{margin:"10px"}}>
        <Formik
              initialValues={
                {
                   userName:"",
                   password:"",
                   confirmpassword:"",
                   firstName:"",
                   lastName:"",
                   subjectName:"",
                }
              }

              validationSchema={
                Yup.object({
                  firstName: Yup.string()
                    .max(50, 'Tên không được vượt quá 50 kí tự')
                    .required('bắt buộc'),
      
                  lastName: Yup.string()
                    .max(50, 'Tên không được vượt quá 50 kí tự')
                    .required('bắt buộc'),

                  subjectName: Yup.string()
                    .required('bắt buộc'),
      
                  userName: Yup.string()
                    .required('bắt buộc')
                    .max(50, 'phải từ 6 đến 50 kí tự')
                    .min(6, 'phải từ 6 đến 50 kí tự')
                    .required('bắt buộc')
                    .test('checkUniqueUsername', 'Tài khoản đã được đăng ký.', async username => {
                      // call api
                      const isExists = await UserApi.existsByUsername(username);
                      return !isExists;
                    }),
      
                  
      
                  password: Yup.string()
                    .max(50, 'phải từ 6 đến 50 kí tự')
                    .min(6, 'phải từ 6 đến 50 kí tự')
                    .required('bắt buộc'),
      
                  confirmpassword: Yup.string()
                    .when("password", {
                      is: value => (value && value.length > 0 ? true : false),
                      then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "nhập sai mật khẩu!"
                      )
                    })
                    .required('bắt buộc')
                })
              }
      

              onSubmit={async (values) => {

                  const res = await TeacherApi.createTeacher(
                    values.subjectName,
                    values.userName,
                    values.password,
                    values.firstName,
                    values.lastName
                  );
                  if(res === "create successful!"){
                    const newteacherlist = await TeacherApi.getAllTeacher();
                    setListTeachers(newteacherlist);
                    alert("Thêm giáo viên mới thành công!");
                    openmodal();
                  }
                  else{
                    alert("Thêm thất bại!");
                  }
                
              }}
              
            >
             {({setFieldValue, values, handleChange, isSubmitting}) => <Form>
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
                      <FastField
                              label="Chọn môn học"
                              bsSize="lg"
                              type="select"
                              name="subjectName"
                              placeholder="chọn môn học dạy"
                              component={ReactstrapInput}
                              
                            >
                              <option value = "Toán">Toán</option>
                              <option value = "Tiếng Anh">Tiếng Anh</option>
                              <option value = "Lý">Lý</option>
                              <option value = "Hóa">Hóa</option>
                              <option value = "Văn">Văn</option>
                      </FastField>
                      
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <FastField
                        label="Tên tài khoản"
                        bsSize="lg"
                        type="text"
                        name="userName"
                        component={ReactstrapInput}
                      />
                      <FastField
                        label="Mật khẩu"
                        bsSize="lg"
                        type="password"
                        name="password"
                        component={ReactstrapInput}
                      />
                      <FastField
                        label="Nhập lại mật khẩu"
                        bsSize="lg"
                        type="password"
                        name="confirmpassword"
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row>
               
                
                <Row>
                    <Col>
                      <Button  type="submit" disabled={isSubmitting} >Thêm</Button>
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
const Teachers = (props) => {

  const [modal, setModal] = useState(false);

  const [listTeachers, setListTeachers] = useState([]);
  
  useEffect(() => {
    const getAllTeacher = async () =>{
        const res = await TeacherApi.getAllTeacher();
        setListTeachers(res);
    }
    getAllTeacher();
    
  }, []);
  

  
  const toggle = () => setModal(!modal);
 
  return(
    
  <Container fluid className="p-0">
    <Row>
        <Col style={{display:"flex"}}>
            <h1 className="h3 mb-3">Học Sinh</h1>
            <Button style={{marginLeft:"auto"}} color="primary" onClick={toggle}>
                Thêm giáo viên mới <AddIcon/>
            </Button>
        </Col>
    </Row>
    <Row>
      <Col>
        <TeachersList {...props} listTeachers={listTeachers} setListTeachers={setListTeachers}/>
        
      </Col>
      <Modal isOpen={modal} toggle={toggle}>
            <Single handler = {toggle} listTeachers={listTeachers} setListTeachers={setListTeachers} />
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
export default Teachers;
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
import MentorApi from "../../api/MentorApi";
import UserApi from "../../api/UserApi";

import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
const MentorsList = (props) =>{ 

  const listMentors = props.listMentors;
  const setListMentors = props.setListMentors;
  const setModalUpdate = props.setModalUpdate;
  const setMentor = props.setMentor;
  const datatable = {
    columns: [
      {
        label: 'ID',
        field: 'mentorId',
     
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
        label: '',
        field: 'action',
     
      },
    ],
    rows: [
       
    ]
  }; 
  
  
  

  const toggleUpdate = async (rowData) => {
      const mentor = await MentorApi.getMentorById(rowData.mentorId);
      setMentor(mentor);
      setModalUpdate(true);
    
  
  }
  const toggleDelete = async (mentor) => {
    var requested = window.confirm("Bạn có chắc chắn muốn xóa trợ giảng " + mentor.fullName);
  
    if ( requested) {
        const res = await MentorApi.deleteMentor(mentor.mentorId);
        if (res === "delete successful!"){
            const newmentorlist = await MentorApi.getAllMentor();
            setListMentors(newmentorlist);
            alert("Xóa trợ giảng thành công!");
        }
    }
  };
 
  
  datatable.rows = listMentors;
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
          Trợ giảng
        </CardTitle>
      </CardHeader>
      <CardBody>
          <MDBDataTableV5 
          hover 
          responsive
          entriesOptions={[5,10, 20, 50,100]} entries={30} pagesAmount={30} data={datatable} />
      </CardBody>
    </Card>
    
  </>
    );
}
const Update = (props) => {

  const modalUpdate = props.modalUpdate;
  const setModalUpdate = props.setModalUpdate;
  const setListMentors = props.setListMentors;
  const mentor = props.mentor;
  
  return (
    <Modal isOpen={modalUpdate} toggle={setModalUpdate}>
    <Row>

      <Col>
      <Card>
      <CardBody>
        <Formik
            initialValues={
              {
                  firstName:(mentor.firstName !== undefined) ? mentor.firstName : "",
                  lastName:(mentor.lastName !== undefined) ? mentor.lastName : "",
                  school:(mentor.school !== undefined) ? mentor.school : "",
              }
            }
            onSubmit={async (values) => {
                  const res = await MentorApi.updateMentor(
                    mentor.mentorId,
                    values.school,
                    values.firstName,
                    values.lastName
                  );
                  if(res === "update successful!"){
                    const newmentorlist = await MentorApi.getAllMentor();
                    setListMentors(newmentorlist);
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
                      <FastField
                          label="Trường học"
                          bsSize="lg"
                          type="text"
                          name="school"
                          placeholder="tên trường học"
                          component={ReactstrapInput}
                        />
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
  )
}

const Single = (props) => {
  
  const setListMentors = props.setListMentors;
  const openmodal = props.handler;

  return(
  
    <Card>
      <CardHeader>
          <CardTitle>Thêm trợ giảng mới</CardTitle>
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
                    school:"",
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

                  school: Yup.string()
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

                  const res = await MentorApi.createMentor(
                    values.school,
                    values.userName,
                    values.password,
                    values.firstName,
                    values.lastName
                  )
          
                  if(res === "create successful!"){
                    const newmentorlist = await MentorApi.getAllMentor();
                    setListMentors(newmentorlist);
                    alert("Thêm trợ giảng mới thành công!");
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
                          label="Tên trường học"
                          bsSize="lg"
                          type="text"
                          name="school"
                          component={ReactstrapInput}
                        />
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
                      <Button  type="submit" disabled={isSubmitting}>Thêm</Button>
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
const Mentors = (props) => {

  const [modal, setModal] = useState(false);
  const [mentor,setMentor] = useState({});
  const [listMentors, setListMentors] = useState([]);
  const [modalUpdate, setModalUpdate] = useState(false);
  
  useEffect(() => {
    const getAllMentor = async () =>{
      const res = await MentorApi.getAllMentor();
      setListMentors(res);
    }
    getAllMentor();
    
  }, []);
  

  
  const toggle = () => setModal(!modal);
 
  return(
    
  <Container fluid className="p-0">
    <Row>
        <Col style={{display:"flex"}}>
            <h1 className="h3 mb-3">Trợ giảng</h1>
            <Button style={{marginLeft:"auto"}} color="primary" onClick={toggle}>
                Thêm trợ giảng mới <AddIcon/>
            </Button>
        </Col>
    </Row>
    <Row>
      <Col>
        <MentorsList 
        {...props} 
        listMentors={listMentors} 
        setMentor={setMentor}
        setModalUpdate={setModalUpdate}
        setListMentors={setListMentors}/>
        <Update 
          setListMentors={setListMentors} 
          mentor={mentor} 
          setMentor={setMentor} 
          modalUpdate={modalUpdate} 
          setModalUpdate={setModalUpdate} />
      </Col>
      <Modal isOpen={modal} toggle={toggle}>
            <Single 
            setMentor={setMentor} 
            handler = {toggle} listMentors={listMentors} setListMentors={setListMentors} setModalUpdate={setModalUpdate} />
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
export default Mentors;
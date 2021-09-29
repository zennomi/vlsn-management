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
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import { MoreHorizontal } from "react-feather";
import { FastField, Formik, Form } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";

const CourseList = (props) =>{


  const [modalLesson,setModalLesson] = useState(false);
  const [modalHomeWork,setModalHomeWork] = useState(false);
  const datatable = {
    columns: [
      {
        label: 'ND Bài Học',
        field: 'lessonName',
        width: 300,
      },
      {
        label: 'Chương',
        field: 'categolory',
        width: 200,
      },
      {
        label: 'Ngày',
        field: 'date',
        width: 200,
      },
      {
        label: 'Sĩ Số',
        field: 'numberStudent',
        width: 150,
      },
      {
        label: 'VIDEO',
        field: 'linkLesson',
        width: 150,
      },
      {
        label: 'BTVN',
        field: 'linkHomeWork',
        width: 150,
      },
      
    ],
    rows: [
        {
          lessonName:"Bài 1 - Đồ Thị Hàm Số Bậc 3 ( tiếp )",
          categolory:"Chương 1 - Hàm Số",
          date:"30-08-2021",
          linkLesson: <Button onClick={() => setModalLesson(true)} color="primary">Thêm</Button>,
          linkHomeWork: <Button onClick={() => setModalHomeWork(true)}  color="primary">Thêm</Button>,
          numberStudent:"78",
        }
    ],
  };  
  const datatable2 = {
    columns: [
      {
        label: 'Họ Tên',
        field: 'fullName',
      },
      {
        label: 'Trường',
        field: 'school',
 
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
        sort: 'asc',
      
      },
      
    ],
    rows: [
      
    ],
  }; 
  
    const clazz = props.clazz;
  

    useEffect(() => {
      
      
    }, []);

  

  return(
  <>
      <Row>
            <Col lg="6">
                <Card className="flex-fill w-100">
                    <CardHeader>
                      
                      <CardTitle tag="h5" className="mb-0">
                          DANH SÁCH BÀI HỌC
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                          <MDBDataTableV5  scrollX hover  entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable} />
                      </CardBody>
                  </Card>
                 
                    <Modal isOpen={modalLesson} toggle={setModalLesson}>
                          <ModalHeader>
                                Thêm Video Bài Giảng
                          </ModalHeader>
                          <ModalBody>
                              <Formik
                                    initialValues={
                                      {
                                          linkLesson:""
                                      }
                                    }
                                    onSubmit={async (values) => {
                                        alert(values)
                                      
                                    }}
                                
                                >
                                {({setFieldValue, values}) => 
                                    <Form>
                                          <FastField
                                                label="Thêm Link Video"
                                                bsSize="lg"
                                                type="text"
                                                name="linkLesson"
                                                component={ReactstrapInput}
                                              />

                                          <Button color="primary" type="submit" >Thêm</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalLesson(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 
               
            
                    <Modal isOpen={modalHomeWork} toggle={setModalHomeWork}>
                          <ModalHeader>
                                Thêm BTVN
                          </ModalHeader>
                          <ModalBody>
                              <Formik
                                    initialValues={
                                      {
                                          linkHomeWork:"",
                                          linkHomeWorkAnswer:"",
                                      }
                                    }
                                    onSubmit={async (values) => {
                                        alert(values)
                                      
                                    }}
                                
                                >
                                {({setFieldValue, values}) => 
                                    <Form>
                                        <FastField
                                                label="Thêm Link BTVN"
                                                bsSize="lg"
                                                type="text"
                                                name="linkHomeWork"
                                                component={ReactstrapInput}
                                              />
                                        <FastField
                                                label="Thêm Link Đáp Án"
                                                bsSize="lg"
                                                type="text"
                                                name="linkHomeWorkAnswer"
                                                component={ReactstrapInput}
                                              />
                                        <Button color="primary" type="submit">Thêm</Button>
                                    </Form>
                                  }
                              </Formik>
                              
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={() => setModalHomeWork(false)}>Hủy</Button>
                          </ModalFooter>
                    </Modal> 
       
            </Col>
            <Col lg="6">
                <Card className="flex-fill w-100">
                  <CardHeader>
                    
                    <CardTitle tag="h5" className="mb-0">
                        HỌC SINH THIẾU BTVN
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                        <MDBDataTableV5 responsive hover  entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable2} />
                    </CardBody>
                </Card>
            </Col>
      </Row>
      
  </>
  );
}

const AttendanceList = (props) => {
  const datatable = {
    columns: [
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
        label: 'SĐT PH',
        field: 'parentNumber',
        sort: 'asc',
      
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
      
    }
    getAllExamMark();
 
  }, []);



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
            DANH SÁCH HỌC SINH
        </CardTitle>
      </CardHeader>
      <CardBody>
            <MDBDataTableV5 responsive hover bordered borderless={false}  entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={4} data={datatable} />
        </CardBody>
    </Card>
    );
}
const Course = (props) =>{

  
  const [exam, setExam] = useState(1);

  return(
  <>  
   
       
    <CourseList {...props} setExam={setExam} exam={exam} />
    <Row>
        <Col>
              <AttendanceList/>
        </Col>
    </Row>
  </>
  );
}
export default Course;

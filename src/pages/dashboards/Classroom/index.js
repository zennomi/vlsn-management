import React, {useState} from "react";
import { Container, Row, Col, Button, Modal, ModalBody, Label, Input } from "reactstrap";

// import Activity from "./Activity";
// import BarChart from "./BarChart";
import Header from "./Header";
// import LineChart from "./LineChart";
import ClassList from "./ClassList";
import Statistics from "./Statistics";
import Course from "./Course";
// import Statistics from "./Statistics";
// import USAMap from "./USAMap";
import { ReactstrapInput } from "reactstrap-formik";
import { Autocomplete } from '@material-ui/lab';
import { Formik,FastField, Form  } from 'formik';
import TextField from '@material-ui/core/TextField';
import TeacherApi from "../../../api/TeacherApi";

const Ecommerce = (props) =>{

  const [clazz, setClass] = useState({});
  const [modal,setModal] = useState(false);
  const [modalUpdateClass, setModalUpdateClass] = useState(false);

  const [suggestTeacher, setSuggestTeacher] = useState([]);
  
  const [suggestMentor, setSuggestMentor] = useState([]);

  return(
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col className="d-flex">
        <ClassList 
          setClass={setClass}
          modalUpdateClass={modalUpdateClass}
          setModalUpdateClass={setModalUpdateClass}
          {...props} setWatch={setModal} 
          isWatching={modal} 
          setSuggestTeacher={setSuggestTeacher}
          setSuggestMentor={setSuggestMentor}
          />
      </Col>
    </Row>
    {(modal) ? <Statistics clazz={clazz} {...props} /> : null}
    {(modal) ? <Course clazz={clazz} {...props} /> : null}
    <Modal isOpen={modalUpdateClass} toggle={setModalUpdateClass}>
                        <ModalBody>
                                <h1>Cập nhật thông tin lớp học</h1>
                                <Formik
                                        initialValues={
                                          {
                                            grade: (Object.keys(clazz).length === 0) ? "" : clazz.grade,
                                            subject: (Object.keys(clazz).length === 0) ? "" : clazz.subjectName,
                                            className: (Object.keys(clazz).length === 0) ? "" : clazz.className,
                                            teacher:(Object.keys(clazz).length === 0) ? "" : clazz.teacherId,
                                            date: (Object.keys(clazz).length === 0) ? "" : clazz.schedule,
                                            start: (Object.keys(clazz).length === 0) ? "" : clazz.startTime,
                                            end: (Object.keys(clazz).length === 0) ? "" : clazz.endTime,
                                            listMentor: (Object.keys(clazz).length === 0) ? "" : clazz.listMentor
                                          }
                                        }
                                        onSubmit={async (values) => {
                                            console.log(values);
                                        }}
                                    
                                    >
                                    {({setFieldValue, values,handleChange}) => 
                                        <Form>
                                            <Row >
                                                  <Col>
                                                    
                                                      <FastField 
                                                              label="Lớp"
                                                              bsSize="lg"
                                                              id ="grade"
                                                              type="select"
                                                              name="grade"
                                                              component={ReactstrapInput}
                                                            >
                                                              <option value = "12">12</option>
                                                              <option value = "11">11</option>
                                                              <option value = "10">10</option>
                                                              <option value = "9">9</option>
                                                              <option value = "8">8</option>
                                                              <option value = "7">7</option>
                                                              <option value = "6">6</option>
                                                      </FastField>
                                                    
                                                  </Col>
                                                  <Col>
                                                          <Label for="subject">Chọn môn học:</Label>
                                                          <Input
                                                            
                                                            bsSize="lg"
                                                            type="select"
                                                            name="subject"
                                                            id = "subject"
                                                            value={values.subject}
                                                            onChange={ async (e) =>{
                                                             
                                                              handleChange(e);
                                                              console.log(e.target.value);
                                                              if(e.target.value === "Toán Đại" || e.target.value === "Toán Hình" ){
                                                                  const newSuggest = await TeacherApi.getListTeacherBySubject("Toán");
                                                                  setSuggestTeacher(newSuggest);
                                                              }
                                                              else {
                                                                const newSuggest = await TeacherApi.getListTeacherBySubject(e.target.value);
                                                                setSuggestTeacher(newSuggest);
                                                              }
                                                              
                                                            }}
                                                          >
                                                            <option value="Toán Đại">Toán Đại</option>
                                                            <option value="Toán Hình">Toán Hình</option>
                                                            <option value="Tiếng Anh">Tiếng Anh</option>
                                                            <option value="Hóa">Hóa</option>
                                                            <option value="Văn">Văn</option>
                                                            <option value="Lý">Lý</option>
                                                          </Input>
                                                  </Col>
                                            </Row>
                                            <Row>
                                                  <Col>
                                                      
                                                      <FastField
                                                        label ="Tên lớp học"
                                                        bsSize="lg"
                                                        type="text"
                                                        name="className"
                                                        placeholder="Enter Date Attendance"
                                                        component={ReactstrapInput}
                                                      />
                                                  </Col>
                                                  <Col>
                                                      
                                                          <Label style={{marginBottom: "4px"}}>Chọn giáo viên</Label>
                                                          <Autocomplete
                                                            id="multiple-limit-tags1"
                                                            name="teacher"
                                                            value={values.teacher}
                                                            onChange={(e, value) => {
                                                              setFieldValue("teacher", value)
                                                            }}
                                                            options={suggestTeacher}
                                                            getOptionSelected={(option,value) => option.teacherId === value.teacherId}
                                                            getOptionLabel={(option) => option.fullName}
                                                            renderInput={(params) => (
                                                              <TextField {...params} name="teacher" variant="outlined" label="Chọn giáo viên" placeholder="Tên giáo viên" />
                                                            )}
                                                          />
                                                      
                                                  </Col>
                                                    
                                              </Row> 
                                              <Row>
                                            
                                                  <Col>
                                                          <FastField
                                                            label="Thời gian bắt đầu"
                                                            bsSize="lg"
                                                            type="time"
                                                            name="start"
                                                            component={ReactstrapInput}
                                                            
                                                          />
                                                  </Col>
                                                  <Col>
                                                          <FastField
                                                            label="Thời gian kết thúc"
                                                            bsSize="lg"
                                                            type="time"
                                                            name="end"
                                                            component={ReactstrapInput}
                                                            
                                                          />
                                                  </Col>
                                              </Row>
                                              <Row>
                                                    <Col>
                                                      <div >
                                                          <Label>Chọn trợ giảng</Label>
                                                          <Autocomplete
                                                            multiple
                                                            limitTags={2}
                                                            id="multiple-limit-tags"
                                                            name="listMentor"
                                                            value={values.listMentor}
                                                            onChange={(e, value) => {
                                                              console.log(value)
                                                              setFieldValue("listMentor", value)
                                                            }}
                                                            options={suggestMentor}
                                                            getOptionSelected={(option,value) => option.mentorId === value.mentorId}
                                                            getOptionLabel={(option) => option.fullName}
                                                            renderInput={(params) => (
                                                              <TextField {...params} name="listMentor" variant="outlined" label="thêm trợ giảng" placeholder="Tên trợ giảng" />
                                                            )}
                                                          />
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        
                                                          <FastField
                                                            label="Chọn thời khóa biểu"
                                                            bsSize="lg"
                                                            type="select"
                                                            name="date"
                                                            component={ReactstrapInput}
                                                            
                                                          >
                                                            <option value="2">Thứ 2</option>
                                                            <option value="3">Thứ 3</option>
                                                            <option value="4">Thứ 4</option>
                                                            <option value="5">Thứ 5</option>
                                                            <option value="6">Thứ 6</option>
                                                            <option value="7">Thứ 7</option>
                                                            <option value="1">Chủ Nhật</option>
                                                          </FastField>
                                                  </Col>
                                              </Row>

                                            
                                            <Button color="primary" type="submit">Lưu</Button>
                                            <Button color="primary" onClick={() => setModalUpdateClass(false)}>Hủy</Button>
                                        </Form>
                                      }
                                  </Formik>
                        </ModalBody>
                </Modal>
  </Container>
);
}
export default Ecommerce;

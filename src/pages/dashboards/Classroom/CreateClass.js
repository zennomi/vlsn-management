import React, {useState, useEffect} from "react";
import {
  Card,
  CardBody,
  CardHeader,
 
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
import * as Yup from 'yup';
import TeacherApi from "../../../api/TeacherApi";
import MentorApi from "../../../api/MentorApi";
import ClassroomApi from "../../../api/ClassroomApi";
const CreateClass = () => {
  
  const [suggestTeacher, setSuggest] = useState([]);
  
  const [suggestMentor, setSuggestMentor] = useState([]);

  useEffect(() => {
    const getSuggestTeacher = async () =>{
      const result = await TeacherApi.getListTeacherBySubject("Toán");
      console.log(result);
      setSuggest(result);
    }
    const getSuggestMentor = async () =>{
      const result = await MentorApi.getAllMentor();
      setSuggestMentor(result);
    }
    getSuggestTeacher();
    getSuggestMentor();
    
  }, []);

  


  return(
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Tạo Lớp học mới</h1>

    <Row>
      <Col>
        <Card>
          <CardHeader>
            
          </CardHeader>
          <CardBody>
          <Formik
            initialValues={
              {
                grade: 6,
                subject: "Toán Đại",
                className: '',
                teacher:{},
                date: 2,
                start: "",
                end: "",
                listMentor: []
              }
            }

            validationSchema={
              Yup.object({
                className: Yup.string()
                  .required('bắt buộc'),

                date: Yup.string()
                  .required('bắt buộc'),

                start: Yup.string()
                  .required('bắt buộc'),

                end: Yup.string()
                  .required('bắt buộc'),
                
                
              })
            }

            onSubmit={async (values) => {

              console.log(values);
              
              const result = await ClassroomApi.createClass(
                values.className,
                values.subject,
                values.grade, 
                values.start,
                values.end,
                values.date,
                values.teacher.teacherId
                )
              
              const listMentor = [];
              if(values.listMentor.length !== 0 && result !== null){
                  values.listMentor.map(mentor => listMentor.push(
                      {
                        classId: result,
                        mentorId: mentor.mentorId
                      }
                  ))
                  const res = await ClassroomApi.createMentorClass(result,listMentor);
                  if(res === "create successful!"){
                    alert("Thêm lớp học mới thành công!");
                  }
              }
              else if (values.listMentor.length === 0 && result !== null){
                  console.log(result);
                  alert("Thêm lớp học mới thành công! lớp học chưa có trợ giảng vui lòng vào DS Lớp học để cập nhật trợ giảng");
              }
              else{
                alert("Thêm lớp học mới thất bại!");
              }

            }}
          >
            {({setFieldValue, values, handleChange}) => <Form>
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
                              // do something
                              handleChange(e);
                              console.log(e.target.value);
                              if(e.target.value === "Toán Đại" || e.target.value === "Toán Hình" ){
                                  const newSuggest = await TeacherApi.getListTeacherBySubject("Toán");
                                  setSuggest(newSuggest);
                              }
                              else {
                                const newSuggest = await TeacherApi.getListTeacherBySubject(e.target.value);
                                setSuggest(newSuggest);
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
                            onChange={(e, value) => {
                             
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
                    <Col></Col>
              </Row>
              <Row>
                    <Col>
                      <Button color="primary" type="submit" >Tạo lớp học</Button>
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

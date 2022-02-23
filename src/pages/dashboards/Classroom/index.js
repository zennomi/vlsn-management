import React, {useState, useEffect} from "react";
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
import ClassroomApi from "../../../api/ClassroomApi";
import ScheduleApi from "../../../api/ScheduleApi";
import { produce } from "immer";

const Ecommerce = (props) =>{

  const [clazz, setClass] = useState({});
  const [modal,setModal] = useState(false);
  const [modalUpdateClass, setModalUpdateClass] = useState(false);
  const [grade,setGrade] = useState(12);
  const [suggestTeacher, setSuggestTeacher] = useState([]);
  
  const [suggestMentor, setSuggestMentor] = useState([]);

  const [schedule,setSchedule] = useState([]);

  const [classes, setClasses] = useState([]);

  const [id,setId] = useState(1);

  useEffect(() => {
    const getAllClassList = async () =>{
      const result = await ClassroomApi.getListClassroomInGrade(grade);
      setClasses(result);
    }
    getAllClassList();
    
  }, [grade]);


  return(
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col className="d-flex">
        <ClassList 
          setGrade={setGrade}
          grade={grade}
          classes={classes}
          setSchedule={setSchedule}
          setClasses={setClasses}
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
    <Modal size="lg" isOpen={modalUpdateClass} toggle={setModalUpdateClass}>
                        <ModalBody>
                                <h1>Cập nhật thông tin lớp học</h1>
                                <Formik
                                        initialValues={
                                          {
                                            grade: (Object.keys(clazz).length === 0) ? "" : clazz.grade,
                                            subject: (Object.keys(clazz).length === 0) ? "" : clazz.subjectName,
                                            className: (Object.keys(clazz).length === 0) ? "" : clazz.className,
                                            teacher:(Object.keys(clazz).length === 0) ? "" : clazz.teacherId,
                                            listMentor: (Object.keys(clazz).length === 0) ? [] : clazz.listMentor
                                          }
                                        }
                                        onSubmit={async (values) => {

                                          var validationSchedule = true;

                                          for (var i = 0 ; i < schedule.length ; i ++){
                                            if(schedule[i].startTime === "" || schedule[i].endTime === ""){
                                              validationSchedule = false;
                                              break;
                                            }
                                          }

                                          if(validationSchedule){
                                            const update = await ClassroomApi.updateClass(
                                              clazz.id,
                                              values.className,
                                              values.subject,
                                              values.grade,
                                              values.teacher.teacherId
                                            );
                                            const updateSchedule = await ScheduleApi.updateClassSchedule(clazz.id,schedule);
                                            const body = [];
                                           
                                            if(values.listMentor !== 0){
                                                values.listMentor.map(mentor => body.push({
                                                classId: clazz.id,
                                                mentorId: mentor.mentorId
                                                }))
                                                const updateMentor = await ClassroomApi.updateMentorClass(
                                                clazz.id,
                                                body
                                                )
                                                if(updateMentor === "update successful!" && update === "update successful!" && updateSchedule === "update successful!" ){
                                                  
                                                  const result = await ClassroomApi.getListClassroomInGrade(grade);
                                                  setClasses(result);
                                                  setModalUpdateClass(false);
                                                  alert("Cập nhật thành công!");
                                                }
                                                else{
                                                  alert("Cập nhật trợ giảng thất bại!");
                                                }
                                            }
                                            else{
                                              if(update === "update successful!" && updateSchedule === "update successful!"){
                                                alert("Cập nhật thành công!");
                                                const result = await ClassroomApi.getListClassroomInGrade(grade);
                                                setClasses(result);
                                                setModalUpdateClass(false);
                                              }
                                            }
                                          }else{
                                            alert("Lịch học không thể trống thời gian bắt đầu hoặc kết thúc");
                                          }


                                            

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
                                              {
                                                schedule.map((s,index) => 
                                                  <Row key={index}>
                                                      <Col >
                                                              <Label for="schedule" style={{marginBottom: "4px"}}>Chọn thời khóa biểu</Label>
                                                              <Input
                                                                label="Chọn thời khóa biểu"
                                                                bsSize="lg"
                                                                type="select"
                                                                name="schedule"
                                                                onChange={e => {
                                                                  const sc = e.target.value;
                                                                  setSchedule(currentSchedule =>
                                                                    produce(currentSchedule, v => {
                                                                      v[index].schedule = sc;
                                                                    })
                                                                  );
                                                                }}
                                                                value={s.schedule}
                                                                
                                                              >
                                                                <option value="2">Thứ 2</option>
                                                                <option value="3">Thứ 3</option>
                                                                <option value="4">Thứ 4</option>
                                                                <option value="5">Thứ 5</option>
                                                                <option value="6">Thứ 6</option>
                                                                <option value="7">Thứ 7</option>
                                                                <option value="1">Chủ Nhật</option>
                                                              </Input>
                                                      </Col>
                                                      <Col>   
                                                              <Label for="start" style={{marginBottom: "4px"}}>Thời gian bắt đầu</Label>
                                                              <Input
                                                                label="Thời gian bắt đầu"
                                                                bsSize="lg"
                                                                type="time"
                                                                name="startTime"
                                                                onChange={e => {
                                                                  const startTime = e.target.value;
                                                                  setSchedule(currentSchedule =>
                                                                    produce(currentSchedule, v => {
                                                                      v[index].startTime = startTime;
                                                                    })
                                                                  );
                                                                }}
                                                                value={s.startTime}
                                                              />
                                                      </Col>
                                                      <Col>
                                                              <Label for="endTime" style={{marginBottom: "4px"}}>Thời gian kết thúc</Label>
                                                              <Input
                                                                label="Thời gian kết thúc"
                                                                bsSize="lg"
                                                                type="time"
                                                                name="endTime"
                                                                onChange={e => {
                                                                  const endTime = e.target.value;
                                                                  setSchedule(currentSchedule =>
                                                                    produce(currentSchedule, v => {
                                                                      v[index].endTime = endTime;
                                                                    })
                                                                  );
                                                                }}
                                                                value={s.endTime}
                                                              />
                                                      </Col>
                                                      <button
                                                        type="button"
                                                        style={{
                                                          backgroundColor:"white",
                                                          border:"none",
                                                          fontWeight:"bolder",
                                                          fontSize:"larger"
                                                        }}

                                                        onClick={() => {
                                                          setSchedule(currentSchedule =>
                                                            currentSchedule.filter(x => x.id !== s.id)
                                                          );
                                                        }}
                                                      >
                                                        x
                                                      </button>
                                                  </Row>
                                                )
                                              }
                                              <Row>
                                                  <Col>
                                                    <Button
                                                      color="primary"
                                                      size="sm"
                                                      onClick={() => {
                                                        setSchedule(currentSchedule => [
                                                          ...currentSchedule,
                                                          {
                                                            id:id,
                                                            schedule: "2",
                                                            startTime: "",
                                                            endTime: ""
                                                          }
                                                        ]);
                                                        var newId = id + 1;
                                                        setId(newId);
                                                      }}                    
                                                    >Thêm lịch</Button>
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

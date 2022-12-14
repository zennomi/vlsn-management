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
      <Col>
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
                                <h1>C???p nh???t th??ng tin l???p h???c</h1>
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
                                                  alert("C???p nh???t th??nh c??ng!");
                                                }
                                                else{
                                                  alert("C???p nh???t tr??? gi???ng th???t b???i!");
                                                }
                                            }
                                            else{
                                              if(update === "update successful!" && updateSchedule === "update successful!"){
                                                alert("C???p nh???t th??nh c??ng!");
                                                const result = await ClassroomApi.getListClassroomInGrade(grade);
                                                setClasses(result);
                                                setModalUpdateClass(false);
                                              }
                                            }
                                          }else{
                                            alert("L???ch h???c kh??ng th??? tr???ng th???i gian b???t ?????u ho???c k???t th??c");
                                          }


                                            

                                        }}
                                    
                                    >
                                    {({setFieldValue, values,handleChange}) => 
                                        <Form>
                                            <Row >
                                                  <Col>
                                                    
                                                      <FastField 
                                                              label="L???p"
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
                                                          <Label for="subject">Ch???n m??n h???c:</Label>
                                                          <Input
                                                            
                                                            bsSize="lg"
                                                            type="select"
                                                            name="subject"
                                                            id = "subject"
                                                            value={values.subject}
                                                            onChange={ async (e) =>{
                                                             
                                                              handleChange(e);
                                                              console.log(e.target.value);
                                                              if(e.target.value === "To??n ?????i" || e.target.value === "To??n H??nh" ){
                                                                  const newSuggest = await TeacherApi.getListTeacherBySubject("To??n");
                                                                  setSuggestTeacher(newSuggest);
                                                              }
                                                              else {
                                                                const newSuggest = await TeacherApi.getListTeacherBySubject(e.target.value);
                                                                setSuggestTeacher(newSuggest);
                                                              }
                                                              
                                                            }}
                                                          >
                                                            <option value="L??">L??</option>
                                                            <option value="To??n ?????i">To??n ?????i</option>
                                                            <option value="To??n H??nh">To??n H??nh</option>
                                                            <option value="Ti???ng Anh">Ti???ng Anh</option>
                                                            <option value="H??a">H??a</option>
                                                            <option value="V??n">V??n</option>
                                                          </Input>
                                                  </Col>
                                            </Row>
                                            <Row>
                                                  <Col>
                                                      
                                                      <FastField
                                                        label ="T??n l???p h???c"
                                                        bsSize="lg"
                                                        type="text"
                                                        name="className"
                                                        placeholder="Enter Date Attendance"
                                                        component={ReactstrapInput}
                                                      />
                                                  </Col>
                                                  <Col>
                                                      
                                                          <Label style={{marginBottom: "4px"}}>Ch???n gi??o vi??n</Label>
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
                                                              <TextField {...params} name="teacher" variant="outlined" label="Ch???n gi??o vi??n" placeholder="T??n gi??o vi??n" />
                                                            )}
                                                          />
                                                      
                                                  </Col>
                                                    
                                              </Row> 
                                              {
                                                schedule.map((s,index) => 
                                                  <Row key={index}>
                                                      <Col >
                                                              <Label for="schedule" style={{marginBottom: "4px"}}>Ch???n th???i kh??a bi???u</Label>
                                                              <Input
                                                                label="Ch???n th???i kh??a bi???u"
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
                                                                <option value="2">Th??? 2</option>
                                                                <option value="3">Th??? 3</option>
                                                                <option value="4">Th??? 4</option>
                                                                <option value="5">Th??? 5</option>
                                                                <option value="6">Th??? 6</option>
                                                                <option value="7">Th??? 7</option>
                                                                <option value="1">Ch??? Nh???t</option>
                                                              </Input>
                                                      </Col>
                                                      <Col>   
                                                              <Label for="start" style={{marginBottom: "4px"}}>Th???i gian b???t ?????u</Label>
                                                              <Input
                                                                label="Th???i gian b???t ?????u"
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
                                                              <Label for="endTime" style={{marginBottom: "4px"}}>Th???i gian k???t th??c</Label>
                                                              <Input
                                                                label="Th???i gian k???t th??c"
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
                                                    >Th??m l???ch</Button>
                                                  </Col>
                                              </Row>
                                              <Row>
                                                    <Col>
                                                      <div >
                                                          <Label>Ch???n tr??? gi???ng</Label>
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
                                                              <TextField {...params} name="listMentor" variant="outlined" label="th??m tr??? gi???ng" placeholder="T??n tr??? gi???ng" />
                                                            )}
                                                          />
                                                        </div>
                                                    </Col>
                                                    
                                              </Row>

                                            
                                            <Button color="primary" type="submit">L??u</Button>
                                            <Button color="primary" onClick={() => setModalUpdateClass(false)}>H???y</Button>
                                        </Form>
                                      }
                                  </Formik>
                        </ModalBody>
                </Modal>
  </Container>
);
}
export default Ecommerce;

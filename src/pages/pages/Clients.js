import React,{useState, useEffect} from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
 
  Row,
  Badge,
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter, 
} from "reactstrap";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik,FastField, Form  } from 'formik';
import { MDBDataTableV5 } from 'mdbreact';
import { Autocomplete } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField';
import { ReactstrapInput } from "reactstrap-formik";
import StudentApi from "../../api/StudentApi";
import DeactivedStudentApi from "../../api/DeactivedStudentApi";
import ReasonLeftApi from "../../api/ReasonLeftApi";
import ClassroomApi from "../../api/ClassroomApi";
import UserApi from "../../api/UserApi";
import FacebookIcon from '@material-ui/icons/Facebook';
import View from "@material-ui/icons/Visibility"
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { CSVLink } from "react-csv";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import { produce } from "immer";
import * as Yup from 'yup';
import Header from "../dashboards/Ecommerce/Header";
import Statistics from "../dashboards/Ecommerce/Statistics";
import LineChart from "../dashboards/Ecommerce/LineChart";
import { selectFullName, selectRole, selectAvatarUrl, selectFistName } from "../../redux/selectors/userLoginInfoSelector";
const headers = [
  { label: "Họ và Đệm", key: "lastName" },
  { label: "Tên", key: "firstName" },
  { label: "SĐT", key: "studentNumber" },
  { label: "Lớp", key: "grade" },
  { label: "trường học", key: "school" },
  { label: "Tên PH", key: "parentName" },
  { label: "SĐT PH", key: "parentNumber" },
  { label: "Facebook", key: "facebookLink" },
];

function printSchedule (listSchedule) {
    var schedules = "Thứ ";
    for (var i = 0 ; i < listSchedule.length ; i ++){
      schedules += (listSchedule[i].schedule !== "1") ? listSchedule[i].schedule +", " : "Chủ Nhật, ";
    }
    return schedules.slice(0,-2);
}

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

  const setListDeactivedStudent = props.setListDeactivedStudent
  
  const [isDeletingStudent, setIsDeletingStudent] = useState(false);

  const [deletingStudentInfo, setDeletingStudentInfo] = useState({});



  const [id,setId] = useState(1);

  const [listReason, setListReason] = useState([
    {
        id: 0,
        reasonLeft:"",
        departmentName:"",
    }
  ]);
  

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

        setIsDeletingStudent(true);
        setDeletingStudentInfo(student);



        // const res = await StudentApi.deleteStudent(student.id);
        // if (res === "delete successful!"){
        //     const newStudentList = await StudentApi.getAllStudentInGrade(grade);
        //     setListStudent(newStudentList);
        //     alert("Xóa học sinh thành công!");
        // }
    }
  };
  
  listStudent.map(st => datatable.rows.push(
    {
      id:st.id,
      fullName:<>
                    <img
                    src={(st.avatarUrl !== null && st.avatarUrl !== "null") ? (`${process.env.REACT_APP_AVATAR_URL}/${st.avatarUrl}`) : avatar1 }
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt=""
                    />
                    {st.fullName}
                </>,
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
            </div>,
    }
  ))
  
 
  
  return(
  <> 

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
    

          <Row>
                <Col>
                  
                      <MDBDataTableV5 
                      hover 
                      responsive
                      pagingTop
                      bordered
                      searchTop
                      searchBottom={false}
                      exportToCSV
                      entriesOptions={[30,200, 300, 400]} entries={30} pagesAmount={30} data={datatable} />
                      
                </Col>
          </Row>
          <CSVLink className="ml-auto" headers={headers} data={listStudent}>Export to CSV</CSVLink>
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
                        const result = await StudentApi.getAllStudentInGrade(grade);
                        setListStudent(result);
                        setModalUpdate(!modalUpdate);
                    }
                    else{
                      alert("Cập nhật lớp học thất bại");
                    }
                }else if (result === "Update successful!" && notChange === true){
                      const result = await StudentApi.getAllStudentInGrade(grade);
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
                                                   printSchedule(option.listSchedule)}
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

    <Modal size="lg" isOpen={isDeletingStudent} toggle={setIsDeletingStudent}>
            <Formik
                    initialValues={
                      {
                        leftdate:""
                      }
                    }

                    validationSchema={
                      Yup.object({
                        leftdate: Yup.string()
                          .required('bắt buộc'),
                        
                       
                        
                        
                      })
                    }

                    onSubmit={async (values) => {
                      
                      var validationReason = true;

                      for (var i = 0 ; i < listReason.length ; i ++){
                        if(listReason[i].reasonLeft === "" || listReason[i].departmentName === ""){
                          validationReason = false;
                          break;
                        }
                      }

                      if(validationReason){

                          const resCreateDeactivedStudent = await DeactivedStudentApi.createDeactivedStudent(
                            deletingStudentInfo.firstName,
                            deletingStudentInfo.lastName,
                            deletingStudentInfo.school,
                            deletingStudentInfo.grade,
                            deletingStudentInfo.studentNumber,
                            deletingStudentInfo.parentNumber,
                            deletingStudentInfo.parentName,
                            values.leftdate
                          )

                          const resCreateReasonLeft = await ReasonLeftApi.createReasonLeft(resCreateDeactivedStudent,listReason);

                          if (resCreateReasonLeft === "create successful!"){

                            const newDeactivedList = await DeactivedStudentApi.getAllDeactivedStudentInGrade(grade);
                            setListDeactivedStudent(newDeactivedList);

                            const res = await StudentApi.deleteStudent(deletingStudentInfo.id);
                            if (res === "delete successful!"){
                                const newStudentList = await StudentApi.getAllStudentInGrade(grade);
                                setListStudent(newStudentList);
                                alert("Xóa học sinh thành công!");
                                setIsDeletingStudent(false);
                            }else{
                              alert("Xóa học sinh thất bại!");
                            }
                               
                          }else{
                            alert("thêm lí do không thành công!");
                          }
                          
                          

                      }


                    

                    }}
                >
                  {({setFieldValue, values}) => <Form>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                
                      {listReason.map((reason,index) => 
                      <Row key={index}>
                          <Col>
                                < Label for="reasonleft" style={{marginBottom: "4px"}}>Lí do nghỉ học</Label>
                                <Input
                                  bsSize="lg"
                                  type="text"
                                  name="reasonleft"
                                  onChange={e => {
                                    const sc = e.target.value;
                                    setListReason(currentSchedule =>
                                      produce(currentSchedule, v => {
                                        v[index].reasonLeft = sc;
                                      })
                                    );
                                  }}
                                  value={reason.reasonLeft}
                                  
                                >
                                </Input>

                          </Col>
                          <Col>
                                < Label for="departmentName" style={{marginBottom: "4px"}}>Phòng ban</Label>
                                <Input
                                  bsSize="lg"
                                  type="text"
                                  name="departmentName"
                                  onChange={e => {
                                    const sc = e.target.value;
                                    setListReason(currentSchedule =>
                                      produce(currentSchedule, v => {
                                        v[index].departmentName = sc;
                                      })
                                    );
                                  }}
                                  value={reason.departmentName}
                                  
                                >
                                </Input>
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
                                setListReason(currentSchedule =>
                                  currentSchedule.filter(x => x.id !== reason.id)
                                );
                              }}
                            >
                              x
                            </button>
                      </Row>)}
                      <Row>
                          <Col>
                            <Button
                              type="button"
                              color="primary"
                              size="sm"
                              onClick={() => {
                                setListReason(currentSchedule => [
                                  ...currentSchedule,
                                  {
                                    id:id,
                                    reasonLeft: "",
                                    departmentName: "",
                                  }
                                ]);
                              
                                setId(id + 1);
                              }}                    
                            >Thêm lí do</Button>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                                <FastField
                              label="Thời gian nghỉ học"
                              bsSize="lg"
                              type="datetime-local"
                              name="leftdate"
                              component={ReactstrapInput}
                            />
                          </Col>
                      </Row>
                
            </ModalBody>
            <ModalFooter>
                      <Button color="primary"  type="submit" >Xác nhận</Button>
                      <Button color="primary" onClick={() => setIsDeletingStudent(false)}>Hủy</Button>
            </ModalFooter>
             </Form>}
             </Formik>
    </Modal>
  </>
    );
}

const DeactivedClientsList = (props) => {
  const datatable = {
    columns: [
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
        label: 'Ngày nghỉ học',
        field: 'leftDate'
      },
      {
        label: 'Lí do - Phòng ban',
        field: 'reason'
      },
      {
          label: 'Tình trạng xử lý',
          field: 'processStatus'
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

  

  const grade = props.grade;
  const setGrade = props.setGrade;
  const listDeactivedStudent = props.listDeactivedStudent;
  const setListDeactivedStudent = props.setListDeactivedStudent;
  const setListStudent = props.setListStudent;

  const [listCheckState, setListCheckState] = useState({
    
  });

  const toggleUpdate = async (rowData) => {
    console.log(rowData);
    // const res = await StudentApi.getStudentById(rowData.id);
    // setStudent(res);
    // setModalUpdate(!modalUpdate);
    // const listSuggest = await ClassroomApi.getListClassroomInGrade(rowData.grade);
    // setSuggest(listSuggest);
  
  }

  const toggleDelete = async (student) => {
    var requested = window.confirm("Bạn có chắc chắn muốn thêm học sinh trở lại " + student.fullName);
  
    if ( requested) {

                var lastNameDeleteSpace = student.lastName.replace(/\s+/g, ''); // xóa khoảng trắng
                const lastName = capitalizeFirstLetter(lastNameDeleteSpace);  // viết hoa chữ cái đầu
                const resLast = removeAccents(lastName) // bỏ dấu tiếng việt
                var firstNameDeleteSpace = student.firstName.replace(/\s+/g, ''); // xóa khoảng trắng
                const firstName = capitalizeFirstLetter(firstNameDeleteSpace);  // viết hoa chữ cái đầu
                const resFirst = removeAccents(firstName); // bỏ dấu tiếng việt
                const password = resLast+resFirst;
               

                const newStudentId = await StudentApi.createStudent(
                  student.studentNumber, // username là sđt của học sinh
                  password,
                  student.firstName,
                  student.lastName,
                  student.school,
                  student.grade,
                  student.studentNumber,
                  student.parentNumber,
                  student.parentName,
                  student.facebookLink
                )

                if(newStudentId !== 0 ){
                  const deleteDeactived = await DeactivedStudentApi.deleteDeactivedStudent(student.id);
                  if (deleteDeactived === "delete successful!"){
                    const newDeactivedList = await DeactivedStudentApi.getAllDeactivedStudentInGrade(grade);
                    setListDeactivedStudent(newDeactivedList);
                    const newStudentList = await StudentApi.getAllStudentInGrade(grade);
                    setListStudent(newStudentList);
                      alert("thêm học sinh thành công! ID: "+newStudentId + "\r\n"+ 
                    "tài khoản: "+ student.studentNumber + "\r\n"
                     + "mật khẩu:" + password);

                  }else{
                    alert("Xóa học sinh đã nghỉ thất bại!");
                  }
                }else{
                  alert("Học sinh đã tồn tại! Bạn đã thêm học sinh này, vui lòng tìm kiếm trên danh sách học sinh có tên " + student.fullName);

                }
               
        // const res = await StudentApi.deleteStudent(student.id);
        // if (res === "delete successful!"){
        //     const newStudentList = await StudentApi.getAllStudentInGrade(grade);
        //     setListStudent(newStudentList);
        //     alert("Xóa học sinh thành công!");
        // }
    }
  };

  useEffect(() => {
    const getCheckedStatus = () =>{
        var studentCheckedState = {}
        for(var k = 0 ; k < listDeactivedStudent.length ; k ++){
            studentCheckedState[listDeactivedStudent[k].id] = (listDeactivedStudent[k].processStatus === "0") ? false : true;
        }
        setListCheckState(studentCheckedState);
    }
    getCheckedStatus();
  }, [listDeactivedStudent]);
  
  console.log(listCheckState);

  listDeactivedStudent.map(st => datatable.rows.push(
    {
      id:st.id,
      fullName:<>
                    
                    {st.fullName}
                </>,
      processStatus: <div >
                          <input
                            type="checkbox"
                            style={{width:"30px"}}
                            checked={(listCheckState[st.id]) ? true : false}
                            onChange={ async e => {
                                console.log(e.target.checked);
                                const newListCheckstate = {
                                  ...listCheckState
                                }
                                newListCheckstate[st.id] = e.target.checked;
                                setListCheckState(newListCheckstate);
                                const updateStudentProceessStatus = await DeactivedStudentApi.updateDeactivedStudent(st.id,(e.target.checked) ? "1" : "0");
                                if (updateStudentProceessStatus === "update successful!"){
                                  const newDeactivedList = await DeactivedStudentApi.getAllDeactivedStudentInGrade(grade);
                                  setListDeactivedStudent(newDeactivedList);
                                  
                                  alert("thay đổi thành công!");
                                }

                            }}
                          >
                          </input>
                      </div>,
      school:st.school,
      leftDate:st.leftDate,
      reason: <>
                  
                  {st.listReason.map((reason,i) =><> <p>{reason.reasonLeft} - <Badge color="success">{reason.departmentName}</Badge></p></>)}
              </>,
      studentNumber:st.studentNumber,
      parentNumber: st.parentNumber,
      parentName:st.parentName,
      facebookLink: (st.facebookLink !== null) ?
      <a alt={st.facebookLink} href={st.facebookLink} style={{color:"blue",fontWeight:"bolder"}}>
        Xem Facebook <FacebookIcon color="primary"/> 
     </a> : "Chưa có",
     action: <div style={{display:"flex"}}>
                <button style={{background:"none",border:"none"}} onClick={() => toggleUpdate(st)}>
                    <Edit color="action"/>
                </button>
                <button style={{background:"none",border:"none"}} onClick={() => toggleDelete(st)}>
                    <Delete color="secondary"/>
                </button>
            </div>,
    }
  ))
  

  

    return (
      <>
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
            <Row>
                <Col>
                  
                      <MDBDataTableV5 
                      hover 
                      responsive
                      pagingTop
                      bordered
                      searchTop
                      searchBottom={false}
                      exportToCSV
                      entriesOptions={[30,100, 300, 400]} entries={30} pagesAmount={30} data={datatable} />
                      
                </Col>
          </Row>
          <CSVLink className="ml-auto" headers={headers} data={listDeactivedStudent}>Export to CSV</CSVLink>
      </>
    )
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
                                          printSchedule(option.listSchedule)    
                                          }
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

  const date = new Date();
  const nowMonth = date.getMonth() + 1;

  const [modal, setModal] = useState(false);
  const [grade,setGrade] = useState(12);
  const [listStudent, setListStudent] = useState([]);
  const [listDeactivedStudent, setListDeactivedStudent] = useState([]);
  const [month, setMonth] = useState(nowMonth);

  const [statisticsMonth, setStatisticsMonth] = useState([
    {
      numberOfStatisticStudentThisMonth:0,
      percentDeltaCurrentMonth:0,
    },
    {
      numberOfStatisticStudentThisMonth:0,
      percentDeltaCurrentMonth:0,
    },
    {
      numberOfStatisticStudentThisMonth:0,
      percentDeltaCurrentMonth:0,
    },
  ]);
  
  useEffect(() => {
    const getAllStudentList = async () =>{
      const result = await StudentApi.getAllStudentInGrade(grade);
      const resultDeactived = await DeactivedStudentApi.getAllDeactivedStudentInGrade(grade);
      const statisticMonthChoosed = await StudentApi.getStudentStatisticInMonthAtGrade(month,grade);
      setStatisticsMonth(statisticMonthChoosed);
      setListDeactivedStudent(resultDeactived);
      setListStudent(result);
    }
    getAllStudentList();
  }, [grade, month]);

  
  
  const toggle = () => setModal(!modal);
 
  return(
    
  <Container fluid className="p-0">
    <Header 
      {...props} 
      grade ={grade}
      month={month}
      setMonth={setMonth}
      setGrade={setGrade}
    />
    <Statistics 
        statisticsMonth={statisticsMonth}
        grade ={grade}
        {...props} 
        month={month}
        setMonth={setMonth}
        setGrade={setGrade}
    />
    
    <Row>
        <Col>
              <LineChart
                    grade ={grade}
                    {...props} 
                    month={month}
                    setMonth={setMonth}
                    setGrade={setGrade}

              />
        </Col>
    </Row>
    <Row>
        <Col style={{display:"flex"}}>
            <h1 className="h3 mb-3" style={{fontWeight:"bold"}}>Học sinh khối {grade}</h1>
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
          setListDeactivedStudent={setListDeactivedStudent}
         {...props} listStudent={listStudent} setListStudent={setListStudent}/>
        
      </Col>
      <Modal isOpen={modal} toggle={toggle}>
            <Single grade={grade} handler = {toggle} listStudent={listStudent} setListStudent={setListStudent}
             />
      </Modal>
    </Row>
    <br/>
    
    {/* học sinh đã nghỉ học */}
    <Row>
      <Col>
        <h3 className="h3 mb-3" style={{fontWeight:"bold"}}>Học sinh đã nghỉ khối {grade}</h3>
      </Col>
    </Row>
    <Row>
      <Col>
          <DeactivedClientsList 
          grade ={grade}
          setGrade={setGrade}
         {...props} listDeactivedStudent={listDeactivedStudent} setListStudent={setListStudent} setListDeactivedStudent={setListDeactivedStudent}/>
      </Col>
    </Row>
  </Container>
  );
}
// const mapGlobalStateToProps = state => {
//   return {
//     students: selectListStudent(state)
//   };
// };
const mapGlobalStateToProps = state => {
  return {
    app: state.app,
    sidebar: state.sidebar,
    layout: state.layout,
    fullName: selectFullName(state),
    role: selectRole(state),
    avatarUrl: selectAvatarUrl(state),
    firstName: selectFistName(state),
  };
};
// export default connect(mapGlobalStateToProps, { getAllStudentAction })(Clients);
export default withRouter(connect(mapGlobalStateToProps)(Clients));
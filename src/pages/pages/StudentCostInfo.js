import React, {useEffect,useState} from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Button
} from "reactstrap";

import { MDBDataTableV5 } from 'mdbreact';
import Header from "./Header";
import ClassroomApi from "../../api/ClassroomApi";




const StudentCostInfo = (props) =>{ 

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
        width: 200,
      },
      {
        label: 'Học Phí',
        field: 'status',
        width: 100,
      },
      {
        label: 'Lớp',
        field: 'classroom',
        width: 100,
      },
      {
        label: 'SĐT',
        field: 'studentNumber',
        width: 200,
      },
      {
        label: 'Tên PH',
        field: 'parentName',
        width: 150,
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        width: 100,
      },
    ],
    rows: [
       
    ]
  };

  const datatable1 = {
    columns: [
      {
        label: 'Họ Tên',
        field: 'fullName',
        width: 200,
      },
      {
        label: 'Trường học',
        field: 'school',
        width: 200,
      },
      {
        label: 'Học Phí',
        field: 'status',
        width: 100,
      },
      {
        label: 'Lớp',
        field: 'classroom',
        width: 100,
      },
      {
        label: 'SĐT',
        field: 'studentNumber',
        width: 200,
      },
      {
        label: 'Tên PH',
        field: 'parentName',
        width: 150,
      },
      {
        label: 'SĐT PH',
        field: 'parentNumber',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        width: 100,
      },
    ],
    rows: [
       
    ]
  }; 

  const [grade,setGrade] = useState(12);
  const [subject,setSubject] = useState("Toán Đại");
  const [listActiveStudent, setListActive] = useState([]);
  const [listInActiveStudent, setListInActive] = useState([]);


  const deleteActiveStudentInfo = async (studentId,classId) => {
   
      const res = await ClassroomApi.changeCostStatusStudent(classId,studentId,"inactive");
      if(res === "update successful!"){
        alert("Cập nhật thành công!");
        resetForm();
      }
  }
  const deleteInActiveStudentInfo = async (studentId,classId) => {
  
    const res = await ClassroomApi.changeCostStatusStudent(classId,studentId,"active");
    if(res === "update successful!"){
      alert("Cập nhật thành công!");
      resetForm();
    }
  }

  const resetForm = async () => {
          const listActive = await ClassroomApi.getListStudentCostInfoByStatusInGradeAndSubject(grade,subject,"active");
          const listInActive = await ClassroomApi.getListStudentCostInfoByStatusInGradeAndSubject(grade,subject,"inactive");
          setListActive(listActive);
          setListInActive(listInActive);
  }

  useEffect(() => {
    const getCostInfo = async () =>{
          const listActive = await ClassroomApi.getListStudentCostInfoByStatusInGradeAndSubject(grade,subject,"active");
          const listInActive = await ClassroomApi.getListStudentCostInfoByStatusInGradeAndSubject(grade,subject,"inactive");
          setListActive(listActive);
          setListInActive(listInActive);
    }
    getCostInfo();
    console.log("rerender!");
  }, [grade,subject]);


  listInActiveStudent.map(st => datatable.rows.push({
    id: st.id,
    firstName: st.firstName,
    lastName: st.lastName,
    fullName: st.fullName,
    status: st.status,
    school: st.school,
    grade: st.grade,
    className: st.className,
    classroomId:st.classroomId,
    classroom: st.grade + st.className,
    studentNumber: st.studentNumber,
    parentNumber: st.parentNumber,
    parentName: st.parentName
  }))
  listActiveStudent.map(st => datatable1.rows.push({
    id: st.id,
    firstName: st.firstName,
    lastName: st.lastName,
    fullName: st.fullName,
    status: st.status,
    school: st.school,
    grade: st.grade,
    className: st.className,
    classroomId:st.classroomId,
    classroom: st.grade + st.className,
    studentNumber: st.studentNumber,
    parentNumber: st.parentNumber,
    parentName: st.parentName
  }))

  datatable.rows.map(row => 
     row.action = <Button color="primary" style={{borderRadius: "25px"}} onClick={() => {if(window.confirm('Bạn có chắc chắn muốn xóa không?')){deleteInActiveStudentInfo(row.id,row.classroomId)};}}>Delete</Button>  
  )
  datatable1.rows.map(row => 
    row.action = <Button color="primary" style={{borderRadius: "25px"}} onClick={() => {if(window.confirm('Bạn có chắc chắn muốn xóa không?')){deleteActiveStudentInfo(row.id,row.classroomId)};}}>Delete</Button>  
)
  return(
  <> 
    <Card>
      <CardHeader>
        <div style={{display:"flex", justifyContent:"flex-start"}}>
        <CardTitle tag="h5" className="mb-0">
          Học Sinh Chưa Nộp Học Phí
        </CardTitle>
        
              <Row className="ml-auto">
                    <Col  >
                        <Input 
                              
                  
                              id ="subject"
                              type="select"
                              name="subject"
                              value={subject}
                              onChange={ async (e) =>{
                                  setSubject(e.target.value);
                              }}
                            >
                              <option value = "Toán Đại">Toán Đại</option>
                              <option value = "Toán Hình">Toán Hình</option>
                              <option value = "Tiếng Anh">Tiếng Anh</option>
                              <option value = "Lý">Lý</option>
                              <option value = "Hóa">Hóa</option>
                              <option value = "Văn">Văn</option>
                            
                      </Input>
                    </Col>
                    
                    <Col  >
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
            
        </div>
      </CardHeader>
      <CardBody>
          <MDBDataTableV5 hover scrollX entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable} />
      </CardBody>
    </Card>
    <Card>
      <CardHeader>
        <div style={{display:"flex", justifyContent:"flex-start"}}>
        <CardTitle tag="h5" className="mb-0">
          Học Sinh Đã Nộp Học Phí
        </CardTitle>
        
              <Row className="ml-auto">
                    <Col  >
                        <Input 
                              
                  
                              id ="subject"
                              type="select"
                              name="subject"
                              value={subject}
                              onChange={ async (e) =>{
                                  setSubject(e.target.value);
                              }}
                            >
                              <option value = "Toán Đại">Toán Đại</option>
                              <option value = "Toán Hình">Toán Hình</option>
                              <option value = "Tiếng Anh">Tiếng Anh</option>
                              <option value = "Lý">Lý</option>
                              <option value = "Hóa">Hóa</option>
                              <option value = "Văn">Văn</option>
                            
                      </Input>
                    </Col>
                    <Col  >
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
            
        </div>
      </CardHeader>
      <CardBody>
          <MDBDataTableV5 hover scrollX entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable1} />
      </CardBody>
    </Card>
  </>
    );
}
const CostInfo = (props) => {

  
 
  return(
    
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col>
        <StudentCostInfo {...props}/>
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

// export default connect(mapGlobalStateToProps, { getAllStudentAction })(Clients);
export default CostInfo;
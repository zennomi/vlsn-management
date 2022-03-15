import React, {useEffect,useState} from "react";

import {
  Col,
  Container,
  Input,
  Row,
  Button,
  Badge,
  Modal,
  ModalBody
} from "reactstrap";

import { MDBDataTableV5 } from 'mdbreact';
import Header from "./Header";
import ClassroomApi from "../../api/ClassroomApi";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import { Filter } from "react-feather";
import { selectFistName } from "../../redux/selectors/userLoginInfoSelector";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";
import { Box } from "@material-ui/core";
import ManagerApi from "../../api/ManagerApi";

const StudentCostInfo = (props) =>{ 

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
        label: 'Học Phí',
        field: 'status',
   
      },
      {
        label: 'Lớp',
        field: 'classroom',

      },
      {
        label: 'SĐT',
        field: 'studentNumber',
   
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
        label: 'Action',
        field: 'action',
   
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
 
      },
      {
        label: 'Trường học',
        field: 'school',

      },
      {
        label: 'Học Phí',
        field: 'status',

      },
      {
        label: 'Lớp',
        field: 'classroom',
   
      },
      {
        label: 'SĐT',
        field: 'studentNumber',
 
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
        label: 'Action',
        field: 'action',

      },
    ],
    rows: [
       
    ]
  }; 

  const [grade,setGrade] = useState(12);
  const [subject,setSubject] = useState("Toán Đại");
  const [listActiveStudent, setListActive] = useState([]);
  const [listInActiveStudent, setListInActive] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [success,setSuccess] = useState(false);
  const [isLoadingResetMonth,setIsLoadingResetMonth] = useState(false);
  const [successResetMonth,setSuccesResetMonth] = useState(false);

  const handleResetCostInfo = async () => {
    var requested = window.confirm("Bạn có chắc chắn muốn tạo lại chu kì học phí mới");
        if(!isLoading && requested){
          setSuccess(false);
          setIsLoading(true);
          const reset = await ManagerApi.resetCostInSubjectInGrade(subject,grade);
          if(reset === "reset successful!"){
            setSuccess(true);
            resetForm();
            setTimeout(() => {
              setIsLoading(false);
            },1000)
          }
        }
  }

  const handleResetMonth = async () => {
    var requested = window.confirm("Bạn có chắc chắn muốn xóa các bản điểm danh và bản ghi btvn trước đây 3 tháng ");

    if(!isLoadingResetMonth && requested){
      setSuccesResetMonth(false);
      setIsLoadingResetMonth(true);
      const reset = await ManagerApi.resetMonth();
      if(reset === "reset successful!"){
        setSuccesResetMonth(true);
        setTimeout(() => {
          setIsLoadingResetMonth(false);
          resetForm();
        },1500)
       
      }
    }
}

  const deleteActiveStudentInfo = async (studentId,classId) => {
   
      const res = await ClassroomApi.changeCostStatusStudent(subject,studentId,"inactive");
      if(res === "update successful!"){
        alert("Cập nhật thành công!");
        resetForm();
      }
  }
  const deleteInActiveStudentInfo = async (studentId,classId) => {
  
    const res = await ClassroomApi.changeCostStatusStudent(subject,studentId,"active");
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
    status: <Badge color="danger" className="mr-1 my-1">
                {st.status}
            </Badge>,
    school: st.school,
    grade: st.grade,
    classroom: (st.listClass.map((c,i) =>
                    <div key={i}>
                        {c.grade + c.className}
                        <br/>
                    </div>
                )),
    studentNumber: st.studentNumber,
    parentNumber: st.parentNumber,
    parentName: st.parentName
  }))
  listActiveStudent.map(st => datatable1.rows.push({
    id: st.id,
    firstName: st.firstName,
    lastName: st.lastName,
    fullName: st.fullName,
    status: <Badge color="success" className="mr-1 my-1">
              {st.status}
            </Badge>,
    school: st.school,
    grade: st.grade,
    classroom: (st.listClass.map((c,i) =>
                    <div key={i}>
                        {c.grade + c.className}
                        <br/>
                    </div>
                )),
    studentNumber: st.studentNumber,
    parentNumber: st.parentNumber,
    parentName: st.parentName
  }))

  datatable.rows.map(row => 
     row.action = 
     <Button color="primary" style={{borderRadius: "25px"}} 
     onClick={() => {
       if(window.confirm('Bạn có chắc chắn muốn xóa không?')){deleteInActiveStudentInfo(row.id,row.classroomId)};
      }}>Delete</Button>  
  )
  datatable1.rows.map(row => 
    row.action = 
    <Button color="primary" 
    style={{borderRadius: "25px"}}
     onClick={() => {if(window.confirm('Bạn có chắc chắn muốn xóa không?')){deleteActiveStudentInfo(row.id,row.classroomId)};}}
     >Delete</Button>  
)
  return(
  <> 
    <Row >
      <Col xs="auto" className="ml-auto text-right mt-n1">
            <Button onClick={() => handleResetCostInfo()} color="primary" className="shadow-sm mr-1">
              <Filter className="feather" /> Chu kỳ mới
            </Button>
            <Button onClick={() => handleResetMonth()} color="primary" className="shadow-sm mr-1">
              <Filter className="feather" /> Reset tháng
            </Button>
      </Col>
        <Modal isOpen={isLoading} toggle={setIsLoading}>
          <ModalBody>
                {!success ? 
                <>
                Đang tạo lại chu kỳ học phí mới.... 
                <CircularProgress />
                </> : <> <CheckIcon style={{color:green[500]}}/> thành công </> }
          </ModalBody>
                    
      </Modal> 
      <Modal isOpen={isLoadingResetMonth} toggle={setIsLoadingResetMonth}>
          <ModalBody>
                {!successResetMonth ? 
                <>
                Đang xóa các bản ghi cách đây 3 tháng... 
                <CircularProgress />
                </> :<Box> <CheckIcon style={{color:green[500]}} /> Xóa thành công </Box> }
          </ModalBody>
                    
      </Modal> 
    </Row>
    <Row style={{marginTop:"10px"}}>
      <Col>
      
        
            <div style={{display:"flex", justifyContent:"flex-start"}}>
            <h4 style={{fontWeight:"bold"}}>
              Học sinh chưa nộp học phí
            </h4>
            
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


              <MDBDataTableV5 
              hover 
              responsive
              bordered
              searchTop
              searchBottom={false}
              entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable} />
            <br/>

            <div style={{display:"flex", justifyContent:"flex-start", marginTop:"20px"}}>
            <h4 style={{fontWeight:"bold"}}>
              Học sinh đã nộp học phí
            </h4>
            
                  
                
            </div>

  
              <MDBDataTableV5 
                hover
                responsive
                searchTop
                bordered
                searchBottom={false}
                entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable1} />


      </Col>
    </Row>
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
const mapGlobalStateToProps = state => {
  return {
    firstName: selectFistName(state),
    // role: selectRole(state),

  };
};
export default withRouter(connect(mapGlobalStateToProps)(CostInfo));
// export default connect(mapGlobalStateToProps, { getAllStudentAction })(Clients);
// export default CostInfo;
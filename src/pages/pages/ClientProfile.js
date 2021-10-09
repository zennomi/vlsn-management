import React, { useState,useEffect } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId } from "../../redux/selectors/userLoginInfoSelector";
import {
  // Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  
  Row,

} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import ClientApi from "../../api/ClientApi";
// import {
//   Briefcase,
//   Home,
//   MapPin,
//   MessageSquare,
//   MoreHorizontal
// } from "react-feather";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGlobe } from "@fortawesome/free-solid-svg-icons";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import {
//   faFacebook,
//   faInstagram,
//   faLinkedin,
//   faTwitter
// } from "@fortawesome/free-brands-svg-icons";

// import avatar1 from "../../assets/img/avatars/avatar.jpg";
// import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
// import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

// import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
// import unsplash2 from "../../assets/img/photos/unsplash-2.jpg";
import {
  Clock as ClockIcon,
  Camera as CameraIcon
} from "react-feather";

import  QRCode  from "qrcode.react";

const StudentProfileDetails = (props) =>{ 

  const studentId = props.studentId;
  const [student,setStudent] = useState({
    fullName:"",
    grade:"",
    listClass:[],
    subjectStatus:[]
  });
  var totalMark = 0;
  var takedSubjectExam = 0;

  useEffect(() => {
    const getStudentStudyStatus = async () =>{
        const res = await ClientApi.getStudentStudyInfo(studentId);
        setStudent(res);
        console.log(res);
    }
    getStudentStudyStatus();
    
  }, [studentId]);

  student.subjectStatus.map(subject => totalMark += subject.avgMark);
  for(var i = 0 ; i < student.subjectStatus.length ; i ++){
    if(student.subjectStatus[i].avgMark !== 0){
      takedSubjectExam ++;
    }
  }
  var avgStudentMark = 0;
  if(takedSubjectExam !== 0){
    avgStudentMark = totalMark/takedSubjectExam;
  }
  
  
  return(
  <Card>
   
    <CardBody className="text-center">
      <img
        src={avatar4}
        alt="Stacie Hall"
        className="img-fluid rounded-circle mb-2"
        width="128"
        height="128"
      />
      <CardTitle  className="mb-0">
            <h4>{student.fullName} - {student.grade}</h4>
            <h6>{student.school}</h6>
      </CardTitle>
     

      <div>
        <Button size="sm" color="primary" className="mr-1">
            <CameraIcon></CameraIcon>
        </Button>
      </div>
      
      <div>
          <div>
              <a href="https://www.google.com/">LINK ĐIỂM DANH</a>
          </div>
          <QRCode value="https://www.google.com/" />
      </div>
      
    </CardBody>

    <hr className="my-0" />

    <CardBody>
      <CardTitle >Lớp học đã đăng ký</CardTitle>
      {student.listClass.map((clazz,i) => 
        <div key={i} className="d-flex justify-content-between flex-wrap">
            <div>
                {clazz.subjectName} {clazz.grade}{clazz.className}
            </div>
            <div>
                <ClockIcon></ClockIcon> 
                {(clazz.schedule === "1") ? "CN" : "T"+clazz.schedule }  {clazz.startTime}-{clazz.endTime}
            </div>
        </div>
        
      )}
      
    </CardBody>

    <hr className="my-0" />
    <CardBody>
          
          <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <h5 style={{fontWeight:"bold"}}>Điểm Trung Bình: {avgStudentMark}
                    </h5>
                </div>
                <div>
                    <h5 style={{fontWeight:"bold"}}>Hạng</h5>
                </div>
          </div>
          {student.subjectStatus.map((subject,i) =>
            <div key={i} className="d-flex justify-content-between flex-wrap">
                  <div>
                      <h5>{subject.subjectName} - {(subject.avgMark === 0) ? "Chưa KTra" : subject.avgMark}</h5>
                  </div>
                  <div>
                      <h5>{(subject.avgMark === 0) ? "Chưa Xếp hạng" : subject.rank}</h5>
                  </div>
            </div>
          )}
    </CardBody>
    <hr className="my-0" />
    <CardBody>
        <h5 style={{textAlign:"center",fontWeight:"bold"}}>Xếp Hạng: 
        {(avgStudentMark >= 9) ? <p style={{color:"red"}}>Vàng (Xuất Sắc)</p> :
        (avgStudentMark >= 8 && avgStudentMark < 9) ? <p style={{color:"red"}}>Bạc (Giỏi)</p> :
        (avgStudentMark >= 5 && avgStudentMark < 8) ? <p style={{color:"red"}}>Đồng (Khá)</p> : 
        (avgStudentMark > 0 && avgStudentMark < 5) ?<p style={{color:"red"}}>Gỗ (Yếu)</p> : 
        <p style={{color:"black"}}>Chưa Xếp Hạng</p>}
        </h5>
        <div style={{margin: "0 auto"}}>

              <div style={{width:"50%",margin: "0 auto"}} >
                {(avgStudentMark >= 9) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Gold.png')}></img> :
                (avgStudentMark >= 8 && avgStudentMark < 9) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Sliver.png')}></img> :
                (avgStudentMark >= 5 && avgStudentMark < 8) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Bronze1.png')}></img> : 
                (avgStudentMark > 0 && avgStudentMark < 5) ?  <img width="100%" alt="medal" src={require('../../assets/img/medalrank/bronze.png')}></img> : 
                <img width="100%" alt="medal" src={require('../../assets/img/medalrank/none.png')}></img>}
                  
              </div>
              
        </div>
    </CardBody>
  </Card>
);
}
const Activities = (props) => {
  const studentId = props.studentId;
  const [student,setStudent] = useState({
    fullName:"",
    grade:"",
    listClass:[],
    subjectStatus:[]
  });

  useEffect(() => {
    const getStudentStudyStatus = async () =>{
        const res = await ClientApi.getStudentStudyInfo(studentId);
        setStudent(res);
        console.log(res);
    }
    getStudentStudyStatus();
    
  }, [studentId]);
  
  const listDataTable = [];
  student.subjectStatus.map((subject,i) => listDataTable.push(
    {
      columns:[

      ],
      rows:[
          {
            id:i+subject
          }
      ]
    }
  ))
  student.subjectStatus.map((subject,i) => 
          subject.examList.map(exam => {
                listDataTable[i].columns.push(
                  {
                    label: exam.examName,
                    field: exam.examId,
                  }
                );
                listDataTable[i].rows.map(ex => ex[exam.examId] = exam.mark)
                return null;
              }
          )
    
  )
    console.log(listDataTable);
  return(
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Bảng Điểm
      </CardTitle>
    </CardHeader>
    <CardBody>
        {student.subjectStatus.map((subject,i) => 
            <div key={i} style={{marginTop:"5px"}}>
                  <Row>
                        <Col xs="auto" lg="9">
                            <div style={{margin: "0 auto"}}>
                                  <h5 style={{margin: "0 auto",fontWeight:"bold"}}>
                                      {subject.subjectName}
                                  </h5>
                                  <h5 style={{margin: "0 auto"}}>Trung Bình: {subject.avgMark}</h5>
                                  <h5 style={{margin: "0 auto"}}>Hạng: {subject.rank}</h5>
                                  <h5 style={{fontWeight:"bold"}}>Rank: 
                                  {(subject.avgMark >= 9) ? <p style={{color:"red"}}>Vàng (Xuất Sắc)</p> :
                                  (subject.avgMark >= 8 && subject.avgMark < 9) ? <p style={{color:"blue"}}>Bạc (Giỏi)</p> :
                                  (subject.avgMark >= 5 && subject.avgMark < 8) ? <p style={{color:"brown"}}>Đồng (Khá)</p> : 
                                  (subject.avgMark > 0 && subject.avgMark < 5) ?<p style={{color:"brown"}}>Gỗ (Yếu)</p> : 
                                  <p style={{color:"black"}}>Chưa Xếp Hạng</p>}</h5>
                            </div>
                            <MDBDataTableV5 
                              hover 
                              paging={false} 
                              displayEntries={false} 
                              responsive 
                              bordered borderless={false} 
                              key={i}
                              searching={false} 
                              entries={10} 
                              pagesAmount={4} 
                              info={false}
                              data={listDataTable[i]} />
                        </Col>
                        <Col xs="auto" lg="3">
                            <div style={{margin: "0 auto"}}>

                                <div style={{width:"100%",margin: "0 auto"}} >
                                {(subject.avgMark >= 9) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Gold.png')}></img> :
                                (subject.avgMark >= 8 && subject.avgMark < 9) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Sliver.png')}></img> :
                                (subject.avgMark >= 5 && subject.avgMark < 8) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Bronze1.png')}></img> : 
                                (subject.avgMark > 0 && subject.avgMark < 5) ?  <img width="100%" alt="medal" src={require('../../assets/img/medalrank/bronze.png')}></img> : 
                                <img width="100%" alt="medal" src={require('../../assets/img/medalrank/none.png')}></img>}
                                </div>

                            </div>
                        </Col>
                  </Row>
            </div>
        
        )}
    </CardBody>
  </Card>
  );
}
const ClientProfile = (props) =>{ 
  
  const studentId = props.id;
 
  
  return(
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Thông tin học sinh </h1>

    <Row>
      <Col md="5" xl="4">
        <StudentProfileDetails studentId={studentId} />
      </Col>
      <Col md="7" xl="8">
        <Activities studentId={studentId} />
      </Col>
    </Row>
  </Container>
);
}
// export default ClientProfile;
const mapGlobalStateToProps = state => {
  return {
    fullName: selectFullName(state),
    role: selectRole(state),
    id:selectId(state)
  };
};
export default withRouter(connect(mapGlobalStateToProps)(ClientProfile));

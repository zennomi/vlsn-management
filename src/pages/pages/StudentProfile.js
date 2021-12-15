import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId } from "../../redux/selectors/userLoginInfoSelector";
import { Formik,FastField, Form  } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Media,
  Row,

} from "reactstrap";
import * as Yup from 'yup';
import { MDBDataTableV5 } from 'mdbreact';
import ClientApi from "../../api/ClientApi";
import StudentCommentApi from "../../api/StudentCommentApi";
import avatar1 from "../../assets/img/avatars/avatar.jpg";

import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import StarIcon from "@material-ui/icons/Star";
import {
  Clock as ClockIcon,
} from "react-feather";

import  QRCode  from "qrcode.react";

const removeLastThreeChar = (str) => {
  return str.slice(0,-3)
}

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
            <h4>{student.fullName} - Lớp {student.grade}</h4>
            <h5>Số sao: {student.score} <StarIcon style={{color:"yellow",marginBottom:"4px"}}/></h5>
      </CardTitle>
     
      
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
                {(clazz.schedule === "1") ? "CN" : "T"+clazz.schedule } - {removeLastThreeChar(clazz.startTime)} - {removeLastThreeChar(clazz.endTime)}
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
const Comment = (props) => {

  const studentId = props.studentId;

  const [comments,setComments] = useState([]);
  const user = props.user;

  useEffect(() => {
    const getAllComent = async () =>{
        const res = await ClientApi.getTopTenStudentComment(studentId);
        setComments(res);
      
    }
    getAllComent();
    
  }, [studentId]);

  return(
    <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Nhận xét từ trợ giảng và giáo viên:
      </CardTitle>
    </CardHeader>
    <CardBody>
      
      { (comments.length !== 0) ? comments.map((comment,i) => 
      <>
      <Media key={i}>
        <img
          src={avatar1}
          width="36"
          height="36"
          className="rounded-circle mr-2"
          alt="Chris Wood"
        />
        <Media body>
          <strong>{comment.role} - {comment.fullName}</strong> đã đăng lời nhận xét{" "}
          <br />
          <small className="text-muted">{comment.commentDate}</small>
          <h5 className="border text-muted p-2 mt-1">
            {comment.comment}
          </h5>
        </Media>
      </Media>

      <hr />
      </>
      ): <h5>Không có lời nhận xét nào</h5>}
      <Formik
            initialValues={
              {
                  comment:""
              }
            }
            validationSchema={
              Yup.object({
                comment: Yup.string()
                  .required('Không thể trống!'),
                
              })
            }
    
            onSubmit={async (values) => {
                
                const res = await StudentCommentApi.commentForStudent(
                  studentId,
                  user.id,
                  values.comment
                )
                if(res === "create successful!"){
                  const res = await ClientApi.getTopTenStudentComment(studentId);
                  setComments(res);
                  alert("Thêm nhận xét thành công!");
                }
                  
            }}
          >
            {({isSubmitting}) => 
            <Form>
                <Media>
                  <img
                    src={avatar1}
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt="Chris Wood"
                  />
                  <Media body>
                    <strong>{user.role} - {user.fullName}</strong>{" "}
                    <br />      
                      <FastField
                        bsSize="lg"
                        type="textarea"
                        name="comment"
                        placeholder="Thêm nhận xét"
                        component={ReactstrapInput}
                      />
                      <Button color="primary"  disabled={isSubmitting} type="submit">Thêm nhận xét</Button>
                  </Media>
                  
                </Media>
                
            </Form>
            }
          </Formik>

    </CardBody>
  </Card>
  )
}

const DailyStatus = (props) => {

  const studentId = props.studentId;

  const [listDailyInfo, setListDailyInfo] = useState([]);


  useEffect(() => {
    const getAllStudentDailyInfo = async () =>{
        const res = await ClientApi.getAllStudentDailyStatus(studentId);
        setListDailyInfo(res);
    }
    getAllStudentDailyInfo();
    
  }, [studentId]);

  const datatable = {
    columns: [
      {
        label: 'Nội dung bài học',
        field: 'lessonName',
        
      },
      {
        label: 'Ngày',
        field: 'lessonDate',
        sort: 'asc',
     
      },
      {
        label: "Điểm danh",
        field: 'attendanceStatus',
        sort: 'asc',
    
      },
      {
        label: "BTVN",
        field: 'homeWorkStatus',
        sort: 'asc',
    
      },
      {
        label: "Video bài giảng",
        field: 'lessonLink',
        sort: 'asc',
    
      }
    ],
    rows: []
  };
  // listDailyInfo.reverse();
  listDailyInfo.map(day => datatable.rows.push(
    {
        lessonName: day.lessonName,
        lessonDate: day.lessonDate,
        attendanceStatus: (day.attendanceStatus === "P") ? 
          <Badge color="success" className="mr-1 my-1">
              Đúng giờ
          </Badge> :
          (day.attendanceStatus === "L") ? 
          <Badge color="warning" className="mr-1 my-1">
              Đi muộn
          </Badge> :
          <Badge color="danger" className="mr-1 my-1">
              Nghỉ học
          </Badge>,
        homeWorkStatus: (day.homeWorkStatus === "P") ? 
                <Badge color="success" className="mr-1 my-1">
                    Hoàn thành
                </Badge> :
                (day.homeWorkStatus === "none") ?
                <Badge color="warning" className="mr-1 my-1">
                    Không có
                </Badge> :
                <Badge color="danger" className="mr-1 my-1">
                    Chưa hoàn thành
                </Badge>,
        lessonLink:(day.lessonLink !== "none") ? 
        <a style={{color:"blue",fontWeight:"bolder"}} href={day.lessonLink}>Xem bài giảng</a> : "Không có video"
    }
  ))

  return(
     <Card>
        <CardHeader>
          <CardTitle>Thông tin từng buổi học</CardTitle>
        </CardHeader>
        <CardBody>
            <MDBDataTableV5
                hover 
                responsive
                paging={false}
                searchTop
                searchBottom={false}
                barReverse
                entries={24}
                data={datatable}
            />
        </CardBody>
     </Card>
  )
}

const StudentProfile = (props) =>{ 
  
  const studentId = props.history.location.state.studentId;
  const user = {
    id: props.id,
    fullName:props.fullName,
    role:props.role
  }
  
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
    <Row>
      <Col md="5" xl="4">
        <Comment user={user} studentId={studentId} />
      </Col>
      <Col md="7" xl="8">
        <DailyStatus studentId={studentId} />
      </Col>
    </Row>
  </Container>
);
}
const mapGlobalStateToProps = state => {
  return {
    fullName: selectFullName(state),
    role: selectRole(state),
    id:selectId(state)
  };
};
export default withRouter(connect(mapGlobalStateToProps)(StudentProfile));


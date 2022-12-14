import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId, selectAvatarUrl, selectFacebookAvatarUrl } from "../../redux/selectors/userLoginInfoSelector";
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
        src={(student.avatarUrl !== "null" && student.avatarUrl !== null ) ? (`${process.env.REACT_APP_AVATAR_URL}/${student.avatarUrl}`) : 
              (student.facebookUrl !== "null" && student.facebookUrl !== null) ? student.facebookUrl :
             avatar4 }
        alt={student.fullName}
        className="img-fluid rounded-circle mb-2"
        width="128"
        height="128"
      />
      <CardTitle  className="mb-0">
            <h4>{student.fullName} - L???p {student.grade}</h4>
            <h5>S??? sao: {student.score} <StarIcon style={{color:"yellow",marginBottom:"4px"}}/></h5>
      </CardTitle>
     
      
      <div>
          <div>
              <a href={`${window.location.origin}/attend/info/${studentId}`}>LINK ??I???M DANH</a>
          </div>
          <QRCode value={`${window.location.origin}/attend/info/${studentId}`} />
      </div>
      
    </CardBody>

    <hr className="my-0" />

    <CardBody>
      <CardTitle style={{fontWeight:"bold"}} >L???p h???c ???? ????ng k??</CardTitle>
      {student.listClass.map((clazz,i) => 
        <div key={i}>
          <div key={i} className="d-flex justify-content-between flex-wrap">
              <div>
                  {clazz.subjectName} {clazz.grade}{clazz.className}
              </div>
              <div>
                {clazz.listSchedule.map((schedule,i) => 
                <div key={i}>
                  <ClockIcon></ClockIcon> 
                  {(schedule.schedule === "1") ? "CN" : "T"+schedule.schedule } - {removeLastThreeChar(schedule.startTime)} - {removeLastThreeChar(schedule.endTime)}
                </div>
                )}
              </div>
          </div>
          <br/>
        </div>
      )}
      
    </CardBody>

    <hr className="my-0" />
    <CardBody>
          
          <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <h5 style={{fontWeight:"bold"}}>??i???m Trung B??nh: {avgStudentMark.toFixed(2)}
                    </h5>
                </div>
                <div>
                    <h5 style={{fontWeight:"bold"}}>H???ng</h5>
                </div>
          </div>
          {student.subjectStatus.map((subject,i) =>
            <div key={i} className="d-flex justify-content-between flex-wrap">
                  <div>
                      <h5>{subject.subjectName} - {(subject.avgMark === 0) ? "Ch??a KTra" : subject.avgMark.toFixed(2)}</h5>
                  </div>
                  <div>
                      <h5>{(subject.avgMark === 0) ? "Ch??a X???p h???ng" : subject.rank}</h5>
                  </div>
            </div>
          )}
    </CardBody>
    <hr className="my-0" />
    <CardBody>
        <h5 style={{textAlign:"center",fontWeight:"bold"}}>X???p H???ng: 
        {(avgStudentMark >= 9) ? <p style={{color:"red"}}>V??ng (Xu???t S???c)</p> :
        (avgStudentMark >= 8 && avgStudentMark < 9) ? <p style={{color:"red"}}>B???c (Gi???i)</p> :
        (avgStudentMark >= 5 && avgStudentMark < 8) ? <p style={{color:"red"}}>?????ng (Kh??)</p> : 
        (avgStudentMark > 0 && avgStudentMark < 5) ?<p style={{color:"red"}}>G??? (Y???u)</p> : 
        <p style={{color:"black"}}>Ch??a X???p H???ng</p>}
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
 
  return(
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0" style={{fontWeight:"bold"}}>
        B???ng ??i???m
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
                                  <h5 style={{margin: "0 auto"}}>Trung B??nh: {subject.avgMark.toFixed(2)}</h5>
                                  <h5 style={{margin: "0 auto"}}>H???ng: {subject.rank}</h5>
                                  <h5 style={{fontWeight:"bold"}}>Rank: 
                                  {(subject.avgMark >= 9) ? <p style={{color:"red"}}>V??ng (Xu???t S???c)</p> :
                                  (subject.avgMark >= 8 && subject.avgMark < 9) ? <p style={{color:"blue"}}>B???c (Gi???i)</p> :
                                  (subject.avgMark >= 5 && subject.avgMark < 8) ? <p style={{color:"brown"}}>?????ng (Kh??)</p> : 
                                  (subject.avgMark > 0 && subject.avgMark < 5) ?<p style={{color:"brown"}}>G??? (Y???u)</p> : 
                                  <p style={{color:"black"}}>Ch??a X???p H???ng</p>}</h5>
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
      <CardTitle tag="h5" className="mb-0" style={{fontWeight:"bold"}}>
        Nh???n x??t t??? tr??? gi???ng v?? gi??o vi??n:
      </CardTitle>
    </CardHeader>
    <CardBody>
      
      { (comments.length !== 0) ? comments.map((comment,i) => 
      <div key={i}>
      <Media >
        <img
          src={(comment.avatarUrl !== null && comment.avatarUrl !== "null") ? (`${process.env.REACT_APP_AVATAR_URL}/${comment.avatarUrl}`) : 
              (comment.facebookUrl !== null && comment.facebookUrl !== "null") ? comment.facebookUrl :
              avatar1 }
          width="36"
          height="36"
          className="rounded-circle mr-2"
          alt=""
        />
        <Media body>
          <strong>{comment.role} - {comment.fullName}</strong> ???? ????ng l???i nh???n x??t{" "}
          <br />
          <small className="text-muted">{comment.commentDate}</small>
          <h5 >
            {comment.comment}
          </h5>
        </Media>
      </Media>

      <hr />
      </div>
      ): <h5>Kh??ng c?? l???i nh???n x??t n??o</h5>}
      <Formik
            initialValues={
              {
                  comment:""
              }
            }
            validationSchema={
              Yup.object({
                comment: Yup.string()
                  .required('Kh??ng th??? tr???ng!'),
                
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
                  alert("Th??m nh???n x??t th??nh c??ng!");
                }
                  
            }}
          >
            {({isSubmitting}) => 
            <Form>
                <Media>
                  <img
                    src={(user.avatarUrl !== null && user.avatarUrl !== "null") ? (`${process.env.REACT_APP_AVATAR_URL}/${user.avatarUrl}`) : 
                          (user.facebookUrl !== null && user.facebookUrl !== "null") ? user.facebookUrl :
                        avatar1 }
                    width="36"
                    height="36"
                    className="rounded-circle mr-2"
                    alt=""
                  />
                  <Media body>
                    <strong>{user.role} - {user.fullName}</strong>{" "}
                    <br />      
                      <FastField
                        bsSize="lg"
                        type="textarea"
                        name="comment"
                        placeholder="Th??m nh???n x??t"
                        component={ReactstrapInput}
                      />
                      <Button color="primary"  disabled={isSubmitting} type="submit">Th??m nh???n x??t</Button>
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
        label: 'N???i dung b??i h???c',
        field: 'lessonName',
        
      },
      {
        label: 'Ng??y',
        field: 'lessonDate',
        sort: 'asc',
     
      },
      {
        label: "??i???m danh",
        field: 'attendanceStatus',
        sort: 'asc',
    
      },
      {
        label: "BTVN",
        field: 'homeWorkStatus',
        sort: 'asc',
    
      },
      {
        label: "Video b??i gi???ng",
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
              ????ng gi???
          </Badge> :
          (day.attendanceStatus === "L") ? 
          <Badge color="warning" className="mr-1 my-1">
              ??i mu???n
          </Badge> :
          <Badge color="danger" className="mr-1 my-1">
              Ngh??? h???c
          </Badge>,
        homeWorkStatus: (day.homeWorkStatus === "P") ? 
                <Badge color="success" className="mr-1 my-1">
                    Ho??n th??nh
                </Badge> :
                (day.homeWorkStatus === "none") ?
                <Badge color="warning" className="mr-1 my-1">
                    Kh??ng c??
                </Badge> :
                <Badge color="danger" className="mr-1 my-1">
                    Ch??a ho??n th??nh
                </Badge>,
        lessonLink:(day.lessonLink !== "none") ? 
        <a style={{color:"blue",fontWeight:"bolder"}} href={day.lessonLink}>Xem b??i gi???ng</a> : "Kh??ng c?? video"
    }
  ))

  return(
     <Card>
        <CardHeader>
          <CardTitle style={{fontWeight:"bold"}}>Th??ng tin t???ng bu???i h???c</CardTitle>
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
    role:props.role,
    avatarUrl:props.avatarUrl,
    facebookUrl:props.facebookUrl
  }
  
  return(
  <Container fluid className="p-0">
    <h1 className="h3 mb-3" style={{fontWeight:"bold"}}>Th??ng tin h???c sinh </h1>

    <Row>
      <Col md="5" xl="4">
        <StudentProfileDetails studentId={studentId} {...props} />
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
    id:selectId(state),
    avatarUrl:selectAvatarUrl(state),
    facebookUrl: selectFacebookAvatarUrl(state)
  };
};
export default withRouter(connect(mapGlobalStateToProps)(StudentProfile));


import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId } from "../../redux/selectors/userLoginInfoSelector";
import {
  Card,
  CardBody,
 
  Col,
  Button,
  Row,
} from "reactstrap";
import {
  Clock as ClockIcon,
  Calendar as CalendarIcon
} from "react-feather";
import ClientApi from "../../api/ClientApi";
const ListCourse = (props) => {

  const clientIp = props.id;

  const redriectToCourseVideo = (clazz) => {
    props.history.push({
      pathname: '/course/lesson',
      state: { 
        classId: clazz.id, 
        grade:clazz.grade,
        subjectName:clazz.subjectName,
        teacher:clazz.teacherId
       }
    })
  }

  const [classes,setClasses] = useState([]);

  useEffect(() => {
    const getAllClassesOfStudent = async () =>{
        const res = await ClientApi.getStudentClasses(clientIp);
        setClasses(res);
    }
    getAllClassesOfStudent();
  }, [clientIp]);

  return(
    <>
        <div className="d-flex justify-content-between flex-wrap">
            <p className="h4 font-weight-bold">
                  Lớp học đã đăng ký
                  
            </p>
        </div>
        <Row>
            {classes.map((clazz,i) =>
            <Col lg="4" key={i}>
              <div>
                <Card>
                    <CardBody>
                          <div style={{padding:"15px",borderRadius:"10px"}}>
                            <img alt=" " style={{width:"100%"}} src={require("../../assets/img/brands/logo.png")}></img>
                          </div>
                          <a  href="google.com">
                          <h6 style={{fontWeight:"bold"}}>{clazz.subjectName} {clazz.grade}{clazz.className}</h6>
                          </a>
                        <div>
                             <h6 style={{fontWeight:"bold"}}>Giáo Viên: {clazz.teacherId.fullName}</h6>
                        </div>
                        {clazz.listSchedule.map((schedule,i) => 
                        <div key={i} className="d-flex justify-content-between flex-wrap" >
                              <div>
                                 <CalendarIcon></CalendarIcon> {(schedule.schedule === "1") ? "Chủ Nhật" : "Thứ " + schedule.schedule}
                              </div>
                              <div>
                                  <ClockIcon></ClockIcon> {schedule.startTime} - {schedule.endTime}
                              </div>
                        </div>
                        )}
                    </CardBody>
                    <Button onClick={() => redriectToCourseVideo(clazz)} color="primary" style={{borderRadius:"20px",fontWeight:"bold"}}>Học Bài</Button>
                </Card>
              </div>
            </Col>
            )}
        </Row>
        
    </>
  )
}

const Course = (props) =>{ 

  
  
  return(
  <> 
      <ListCourse {...props}></ListCourse>
     
  </>
    );
}

 

// export default connect(mapGlobalStateToProps, { getAllStudentAction })(Clients);
const mapGlobalStateToProps = state => {
  return {
    fullName: selectFullName(state),
    role: selectRole(state),
    id:selectId(state)
  };
};
export default withRouter(connect(mapGlobalStateToProps)(Course));

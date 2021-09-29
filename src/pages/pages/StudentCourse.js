import React, {} from "react";

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

const ListCourse = (props) => {

  const redriectToCourseVideo = () => {
    props.history.push({
      pathname: '/course/lesson',
      state: { studentId: 1 }
    })
  }

  return(
    <>
        <div className="d-flex justify-content-between flex-wrap">
            <p className="h4 font-weight-bold">
                  Lớp học đã đăng ký
                  
            </p>
        </div>
        <Row>
            <Col lg="4">
              <div>
                <Card>
                    <CardBody>
                          <div style={{padding:"15px",borderRadius:"10px"}}>
                            <img alt=" " style={{width:"100%"}} src={require("../../assets/img/brands/logo.png")}></img>
                          </div>
                          <a  href="google.com">
                          <h6 style={{fontWeight:"bold"}}>Toán Đại 12A</h6>
                          </a>
                        <div>
                             <h6 style={{fontWeight:"bold"}}>Giáo Viên: Nguyễn Chí Chung</h6>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap" >
                              <div>
                                 <CalendarIcon></CalendarIcon> Thứ 4
                              </div>
                              <div>
                                  <ClockIcon></ClockIcon> 18h10-19h40
                              </div>
                        </div>
                        
                    </CardBody>
                    <Button onClick={() => redriectToCourseVideo()} color="primary" style={{borderRadius:"20px",fontWeight:"bold"}}>Học Bài</Button>
                </Card>
              </div>
            </Col>
            
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
export default Course;
import React from "react";

import {
  Card,
  CardBody,
  Col,
  Row,
  Button
} from "reactstrap";
import {
  Book as BookIcon,
  Key as KeyIcon,
  Calendar as CalendarIcon
} from "react-feather";
const NewHomeWork = (props) => {


  return(
    <>
        <div className="d-flex justify-content-between flex-wrap">
            <p className="h4 font-weight-bold">
                  Bài tập mới
                  
            </p>
        </div>
        <Row>
            <Col lg="3">
              <div>
                <Card>
                    <CardBody>
                          <div style={{padding:"15px",borderRadius:"10px"}}>
                            <img alt="BTVN" style={{width:"100%"}} src={require("../../assets/img/brands/logo.png")}/>
                          </div>
                          <a  href="google.com">
                          <h6 style={{fontWeight:"bold"}}>Hàm Số Bậc 3</h6>
                      </a>
                        <div className="d-flex justify-content-between flex-wrap" >
                               <div>
                                  <CalendarIcon></CalendarIcon> 31-08-2021
                              </div>
                              <div>
                                 <BookIcon></BookIcon> Đề Bài
                              </div>
                        </div>
                    </CardBody>
              
                </Card>
              </div>
            </Col>
            
        </Row>
        <Row>
          <Button style={{marginLeft:"auto"}} color="primary">Xem thêm</Button>
        </Row>
    </>
  )
}


const SubmittedHomeWork = (props) => {


  return(
    <>
        <div className="d-flex justify-content-between flex-wrap">
            <p className="h4 font-weight-bold">
                  Bài tập đã làm
                  
            </p>
        </div>
        <Row>
            <Col lg="3">
              <div>
                <Card>
                    <CardBody>
                          <div style={{padding:"15px",borderRadius:"10px"}}>
                            <img alt="BTVN" style={{width:"100%"}} src={require("../../assets/img/brands/logo.png")}></img>
                          </div>
                          <a  href="google.com">
                          <h6 style={{fontWeight:"bold"}}>Hàm Số Bậc 3</h6>
                          </a>
                        <div className="d-flex justify-content-between flex-wrap" >
                              <div>
                                 <BookIcon></BookIcon> Đề Bài
                              </div>
                              <div>
                                  <KeyIcon></KeyIcon> Đáp Án
                              </div>
                        </div>
                    </CardBody>
              
                </Card>
              </div>
            </Col>
            
            
        </Row>
        <Row>
          <Button style={{marginLeft:"auto"}} color="primary">Xem thêm</Button>
        </Row>
    </>
  )
}

const UnSubmittedHomeWork = (props) => {


  return(
    <>
        <div className="d-flex justify-content-between flex-wrap">
            <p className="h4 font-weight-bold">
                  Bài tập chưa làm
                  
            </p>
        </div>
        <Row>
            <Col lg="3">
              <div>
                <Card>
                    <CardBody>
                          <div style={{padding:"15px",borderRadius:"10px"}}>
                            <img alt="BTVN" style={{width:"100%"}} src={require("../../assets/img/brands/logo.png")}></img>
                          </div>
                          <a  href="google.com">
                          <h6 style={{fontWeight:"bold"}}>Hàm Số Bậc 3</h6>
                      </a>
                        <div className="d-flex justify-content-between flex-wrap" >
                              <div>
                                  <CalendarIcon></CalendarIcon> 31-08-2021
                              </div>
                              <div>
                                 <BookIcon></BookIcon> Đề Bài
                              </div>
                        </div>
                    </CardBody>
              
                </Card>
              </div>
            </Col>
           
            
        </Row>
        <Row>
          <Button style={{marginLeft:"auto"}} color="primary">Xem thêm</Button>
        </Row>
    </>
  )
}

const HomeWork = (props) =>{ 

  
  
  return(
  <> 
      <NewHomeWork></NewHomeWork>
      <br/>
      <UnSubmittedHomeWork></UnSubmittedHomeWork>
      <br/>
      <SubmittedHomeWork></SubmittedHomeWork>
     
  </>
    );
}

 

// export default connect(mapGlobalStateToProps, { getAllStudentAction })(Clients);
export default HomeWork;
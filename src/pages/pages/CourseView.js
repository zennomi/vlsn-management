import React, {} from "react";

import {
  Card,
  CardBody,
  Input,
  Col,
  Button,
  Row,

} from "reactstrap";
import {
  Calendar as CalendarIcon,
  Play as PlayIcon
} from "react-feather";
import ReactPlayer from "react-player";

const playerWarpper ={
    position: "relative",
    paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */
}
const reactPlayer = {
    position: "absolute",
    top: "0",
    left: "0",
}
const View = (props) => {

  return(
    <>
        <Row>
              <Col lg="8">
                <h3 style={{fontWeight:"bold"}}>Bài 1 Tính Đơn Điệu Của Hàm Số</h3>
                <div style={playerWarpper}>
                    <ReactPlayer
                      style={reactPlayer}
                      url='https://www.youtube.com/watch?v=6hAPVLSSHJE'
                      width='100%'
                      height='100%'
                      controls={true}
                    />
                </div>
                <div style={{marginTop:"10px"}} className="d-flex justify-content-between flex-wrap" >
                    <div>
                        <h5 style={{fontWeight:"bold"}}>Giáo Viên: Nguyễn Chí Chung</h5>
                        <CalendarIcon></CalendarIcon> 02-09-2021
                    </div>
                    <div>
                          <Button color="primary">Bài Tập Về Nhà</Button>
                    </div>
                </div>
              </Col>  
              <Col lg="4">
                  <div  style={{
                    
                    padding: "10px",
                    borderRadius: "10px"
                  }}>
                        <h5 style={{textAlign:"center",color:"black",fontWeight:"bold"}}>DANH SÁCH CHƯƠNG</h5>
                        <Input 
                          bsSize="lg"
                          type="select"
                          name="Category"
                        >
                            <option>Chương 1 - Hàm Số</option>
                            <option>Chương 2 - Mũ Logarit</option>
                            <option>Chương 3 - Tích Phân</option>
                            <option>Chương 4 - Số Phức</option>
                          
                        </Input>
                  </div>
                    
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between ">
                              <div>
                                  <div>
                                      <h6 style={{fontWeight:"bold"}}>Bài 1 Tính Đơn Điệu Của Hàm Số</h6>
                                  </div>
                                  <div>
                                        <CalendarIcon></CalendarIcon> 02-09-2021
                                  </div>
                              </div>
                              <div >
                                    <Button color="primary" style={{borderRadius:"15px", padding:"10px 27px"}}>
                                          <PlayIcon></PlayIcon>
                                    </Button>
                              </div>
                            </div>
                        </CardBody>
                      
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between ">
                              <div>
                                  <div>
                                      <h6 style={{fontWeight:"bold"}}>Bài 2 Tính Đơn Điệu Của Hàm Số (Tiếp)</h6>
                                  </div>
                                  <div>
                                        <CalendarIcon></CalendarIcon> 07-09-2021
                                  </div>
                              </div>
                              <div >
                                    <Button color="primary" style={{borderRadius:"15px", padding:"10px 27px"}}>
                                          <PlayIcon></PlayIcon>
                                    </Button>
                              </div>
                            </div>
                        </CardBody>
                      
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                              <div>
                                  <div>
                                      <h6 style={{fontWeight:"bold"}}>Bài 3 Cực Trị Của Hàm Số</h6>
                                  </div>
                                  <div>
                                        <CalendarIcon></CalendarIcon> 14-09-2021
                                  </div>
                              </div>
                              <div >
                                    <Button color="primary" style={{borderRadius:"15px", padding:"10px 27px"}}>
                                          <PlayIcon></PlayIcon>
                                    </Button>
                              </div>
                            </div>
                        </CardBody>
                      
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                              <div>
                                  <div>
                                      <h6 style={{fontWeight:"bold"}}>Bài 4 Cực Trị Của Hàm Số (Tiếp)</h6>
                                  </div>
                                  <div>
                                        <CalendarIcon></CalendarIcon> 21-09-2021
                                  </div>
                              </div>
                              <div >
                                    <Button color="primary" style={{borderRadius:"15px", padding:"10px 27px"}}>
                                          <PlayIcon></PlayIcon>
                                    </Button>
                              </div>
                            </div>
                        </CardBody>
                      
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between ">
                              <div>
                                  <div>
                                      <h6 style={{fontWeight:"bold"}}>Bài 5 Cực Trị Của Hàm Số (Tiếp)</h6>
                                  </div>
                                  <div>
                                        <CalendarIcon></CalendarIcon> 28-09-2021
                                  </div>
                              </div>
                              <div >
                                    <Button color="primary" style={{borderRadius:"15px", padding:"10px 27px"}}>
                                          <PlayIcon></PlayIcon>
                                    </Button>
                              </div>
                            </div>
                        </CardBody>
                      
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between ">
                              <div>
                                  <div>
                                      <h6 style={{fontWeight:"bold"}}>Bài 6 Tìm Min-Max Hàm Số</h6>
                                  </div>
                                  <div>
                                        <CalendarIcon></CalendarIcon> 07-10-2021
                                  </div>
                              </div>
                              <div >
                                    <Button color="primary" style={{borderRadius:"15px", padding:"10px 27px"}}>
                                          <PlayIcon></PlayIcon>
                                    </Button>
                              </div>
                            </div>
                        </CardBody>
                      
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                              <div>
                                  <div>
                                      <h6 style={{fontWeight:"bold"}}>Bài 7 Tìm Min-Max Hàm Số (Tiếp)</h6>
                                  </div>
                                  <div>
                                        <CalendarIcon></CalendarIcon> 17-10-2021
                                  </div>
                              </div>
                              <div >
                                    <Button color="primary" style={{borderRadius:"15px", padding:"10px 27px"}}>
                                          <PlayIcon></PlayIcon>
                                    </Button>
                              </div>
                            </div>
                        </CardBody>
                      
                    </Card>
              </Col> 
        </Row>  
    </>
  )
}

const CourseView = (props) =>{ 

  
  
  return(
  <> 
      <View {...props}></View>
     
  </>
    );
}

 

// export default connect(mapGlobalStateToProps, { getAllStudentAction })(Clients);
export default CourseView;
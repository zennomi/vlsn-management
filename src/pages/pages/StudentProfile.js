import React from "react";
import { Link } from "react-router-dom";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import {
  Briefcase,
  Home,
  MapPin,
  MessageSquare,
  MoreHorizontal
} from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
import unsplash2 from "../../assets/img/photos/unsplash-2.jpg";
import {
  Clock as ClockIcon,
  Camera as CameraIcon
} from "react-feather";

import  QRCode  from "qrcode.react";

const StudentProfileDetails = () => (
  <Card>
   
    <CardBody className="text-center">
      <img
        src={avatar4}
        alt="Stacie Hall"
        className="img-fluid rounded-circle mb-2"
        width="128"
        height="128"
      />
      <CardTitle tag="h5" className="mb-0">
            <h4>Lê Ngọc Ánh - Lớp 12</h4>
            <h6>Level:108</h6>
      </CardTitle>
     

      <div>
        <Button size="sm" color="primary" className="mr-1">
            <CameraIcon></CameraIcon>
        </Button>
      </div>
      
      <div>
          <div>
              <a href="">LINK ĐIỂM DANH</a>
          </div>
          <QRCode value="https://www.google.com/" />
      </div>
      
    </CardBody>

    <hr className="my-0" />

    <CardBody>
      <CardTitle tag="h5"><h4>Lớp học đã đăng ký</h4></CardTitle>
      <div className="d-flex justify-content-between flex-wrap">
          <div>
               Toán Đại 12A
          </div>
          <div>
               <ClockIcon></ClockIcon> T6-18h10:19h40
          </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
          <div>
               Toán Hình 12A
          </div>
          <div>
               <ClockIcon></ClockIcon> T3-18h10:19h40
          </div>
      </div>
    </CardBody>

    <hr className="my-0" />
    <CardBody>
          <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <h5 style={{fontWeight:"bold"}}>Điểm Trung Bình: 9.0</h5>
                </div>
                <div>
                    <h5 style={{fontWeight:"bold"}}>Hạng</h5>
                </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <h5>Toán Đại - 8.8</h5>
                </div>
                <div>
                    <h5>14</h5>
                </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <h5>Toán Hình - 9.5</h5>
                </div>
                <div>
                    <h5>5</h5>
                </div>
          </div>
    </CardBody>
    <hr className="my-0" />
    <CardBody>
        <h5 style={{textAlign:"center",fontWeight:"bold"}}>Xếp Hạng: <p style={{color:"red"}}>Vàng (Xuất Sắc)</p></h5>
        <div style={{margin: "0 auto"}}>

              <div style={{width:"50%",margin: "0 auto"}} >
                  <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Gold.png')}></img>
              </div>
              
        </div>
    </CardBody>
  </Card>
);

const Activities = () => {
  const datatable = {
    columns: [
      {
        label: 'Hàm Số',
        field: '12/9',
      },
      {
        label: 'Mũ Lôgarit',
        field: '13/9',
      },
      {
        label: 'Tích Phân',
        field: '14/9',
      },
      {
        label: 'Số Phức',
        field: '15/9',
      },
    ],
    rows: [
      {
        "12/9":9,
        "13/9":10,
        "14/9":9,
        "15/9":8,
        "16/9":9.5,
        "17/9":9.5,
        "18/9":9.5,
        "19/9":9.5,
        "20/9":9.5,
        "21/9":9.5,
        "22/9":9.5,
      },
    ],
  };
  const datatable1 = {
    columns: [
      {
        label: 'Thể Tích Khối Đa Diện',
        field: '12/9',
      },
      {
        label: 'Thể Tích Khối Tròn Xoay',
        field: '13/9',
      },
      {
        label: 'Hình Học Oxyz',
        field: '14/9',
      },
      {
        label: 'Số Phức',
        field: '15/9',
      },
    ],
    rows: [
      {
        "12/9":9,
        "13/9":10,
        "14/9":9,
        "15/9":8,
        "16/9":9.5,
        "17/9":9.5,
        "18/9":9.5,
        "19/9":9.5,
        "20/9":9.5,
        "21/9":9.5,
        "22/9":9.5,
      },
    ],
  };
  const datatable2 = {
    columns: [
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
      {
        label: 'Đề 1',
        field: '12/9',
      },
    ],
    rows: [
      {
        "12/9":9,
      },
    ],
  };
  const listDataTable = [];
  listDataTable.push(datatable);
  listDataTable.push(datatable1);
  listDataTable.push(datatable2)
  return(
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Bảng Điểm
      </CardTitle>
    </CardHeader>
    <CardBody>
          <div style={{marginTop:"5px"}}>
                <Row>
                      <Col xs="auto" lg="8">
                          <div style={{margin: "0 auto"}}>
                                <h5 style={{margin: "0 auto",fontWeight:"bold"}}>
                                    Toán Đại
                                </h5>
                                <h5 style={{margin: "0 auto"}}>Trung Bình: 9.0</h5>
                                <h5 style={{margin: "0 auto"}}>Hạng: 14</h5>
                                <h5 style={{fontWeight:"bold"}}>Rank: <p style={{color:"red"}}>Vàng (Xuất Sắc)</p></h5>
                          </div>
                          <MDBDataTableV5 
                            hover 
                            paging={false} 
                            displayEntries={false} 
                            responsive 
                            bordered borderless={false} 
                       
                            searching={false} 
                            entries={10} 
                            pagesAmount={4} 
                            info={false}
                            data={listDataTable[0]} />
                      </Col>
                      <Col xs="auto" lg="4">
                          <div style={{margin: "0 auto"}}>

                              <div style={{width:"100%",margin: "0 auto"}} >
                                  <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Gold.png')}></img>
                              </div>

                          </div>
                      </Col>
                </Row>
          </div>
       
          <div style={{marginTop:"5px"}}>
                <Row>
                      <Col xs="auto" lg="8">
                          <div style={{margin: "0 auto"}}>
                                <h5 style={{margin: "0 auto",fontWeight:"bold"}}>
                                    Toán Hình
                                </h5>
                                <h5 style={{margin: "0 auto"}}>Trung Bình: 8.8</h5>
                                <h5 style={{margin: "0 auto"}}>Hạng: 14</h5>
                                <h5 style={{fontWeight:"bold"}}>Rank: <p style={{color:"blue"}}>Bạc (Giỏi)</p></h5>
                          </div>
                          <MDBDataTableV5 
                            hover 
                            paging={false} 
                            displayEntries={false} 
                            responsive 
                            bordered borderless={false} 
                        
                            searching={false} 
                            entries={10} 
                            pagesAmount={4} 
                            info={false}
                            data={listDataTable[1]} />
                      </Col>
                      <Col xs="auto" lg="4">
                          <div style={{margin: "0 auto"}}>

                              <div style={{width:"100%",margin: "0 auto"}} >
                                  <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Sliver.png')}></img>
                              </div>

                          </div>
                      </Col>
                </Row>
                
          </div>
          <div style={{marginTop:"5px"}}>
                <Row>
                      <Col xs="auto" lg="8">
                          <div style={{margin: "0 auto"}}>
                                <h5 style={{margin: "0 auto",fontWeight:"bold"}}>
                                    Luyện Đề
                                </h5>
                                <h5 style={{margin: "0 auto"}}>Trung Bình: 8.8</h5>
                                <h5 style={{margin: "0 auto"}}>Hạng: 14</h5>
                                <h5 style={{fontWeight:"bold"}}>Rank: <p style={{color:"blue"}}>Bạc (Giỏi)</p></h5>
                          </div>
                          <MDBDataTableV5 
                            hover 
                            paging={false} 
                            displayEntries={false} 
                            responsive 
                            bordered borderless={false} 
                        
                            searching={false} 
                            entries={10} 
                            pagesAmount={4} 
                            info={false}
                            data={listDataTable[2]} />
                      </Col>
                      <Col xs="auto" lg="4">
                          <div style={{margin: "0 auto"}}>

                              <div style={{width:"100%",margin: "0 auto"}} >
                                  <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Sliver.png')}></img>
                              </div>

                          </div>
                      </Col>
                </Row>
                
          </div>
    </CardBody>
  </Card>
  );
}
const StudentProfile = (props) => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Thông tin học sinh </h1>

    <Row>
      <Col md="5" xl="4">
        <StudentProfileDetails />
      </Col>
      <Col md="7" xl="8">
        <Activities />
      </Col>
    </Row>
  </Container>
);

export default StudentProfile;

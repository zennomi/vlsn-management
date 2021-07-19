import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button
} from "reactstrap";
import Moment from 'moment';
import { Formik,FastField, Form  } from 'formik';
import { MDBDataTable } from 'mdbreact';


const Attendance = (props) =>{ 
    
    const today = Moment(Date.now()).format('DD-MM-YYYY');
    const content = "";
    const clazz = {
        classId: "1",
        className: "Hình 12A",
        teacherName: "Nguyên",
        mentorId: 1,
        timeTable: {
          start: "18h10",
          end: "19h40",
          day:"6"
        }
      }
      const data = {
        columns: [
          {
            label: 'Họ Tên',
            field: 'name',
            sort: 'asc',
            width: 150
          },
          {
            label: 'SĐT',
            field: 'phone',
            sort: 'asc',
            width: 150
          },
          
        ],
        rows: [
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang5",
              phone: "0965993506"
            },
            {
              name: "thang4",
              phone: "0965993506"
            },
            {
              name: "thang3",
              phone: "0965993506"
            },
            {
              name: "thang",
              phone: "0965993506"
            },
            {
              name: "thang1",
              phone: "0965993506"
            },
            {
              name: "thang2",
              phone: "0965993506"
            },
        ]
      };
    
    return (
        <Container fluid className="p-0">
            <h1 className="h3 mb-3">Thông Tin Lớp Học Ngày {today}</h1>
            <Row>
            <Col>
                <Card>
                <CardHeader>
                {/* <h2>{props.location.state.classId}</h2> */}
                <h5>{clazz.className +" - Thầy " + clazz.teacherName + " Thứ " + clazz.timeTable.day + ": " + 
                    clazz.timeTable.start + " - " + clazz.timeTable.end} </h5>
                <Formik
                  initialValues={
                    {
                      contentTitle: '',
                    }
                  }
                  onSubmit={(values) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                    }, 500);
                  }}
                >
                    <Form>
                      <Row>
                        <Col>
                          <Label>Nội Dung Bài Học:{content}</Label>
                          <FastField
                              
                              type="text"
                              name="contentTitle"
                              placeholder="Nhập nội dung bài học"
                              component={Input}      
                          />
                        </Col>
                        <Col>
                          <Button style={ {marginTop:"28px", borderRadius: "15px"}} type="submit" >Xác nhận</Button>
                        </Col>
                        <Col>
                        </Col>
                      </Row>
                    </Form>
                </Formik>
                </CardHeader>
                  
                  <CardBody>
                    <Row>
                      <Col style={{display:"flex"}}>
                        <h5>Tổng số học sinh đi học: {44}</h5> 
                        <div style={{marginLeft:"10px"}}>
                          <button style={{border:"1px solid", backgroundColor:"white", color:"black", borderRadius:"5px",padding: "3px 10px"}}>
                          
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                              <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                            </svg>
                          
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <MDBDataTable
                      keyField='name'
                      data={data}
                      hover
                      bordered
                      scrollX
                      scrollY
                      
                    />
                  </CardBody>
                  <CardBody>
                    <Row>
                      <Col style={{display:"flex"}}>
                        <h5>Tổng số học sinh đi học bù: {44}</h5> 
                        <div style={{marginLeft:"10px"}}>
                          <button style={{border:"1px solid", backgroundColor:"white", color:"black", borderRadius:"5px",padding: "3px 10px"}}>
                          
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                              <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                            </svg>
                          
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <MDBDataTable
                      keyField='name'
                      data={data}
                      hover
                      bordered
                      scrollX
                      scrollY
                      
                    />
                  </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
    );
}
export default Attendance;

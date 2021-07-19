import React from "react";
import {
  Card,
  CardBody,
  Col,
  CardHeader,
  Container,
  Row,
  Label,
  Button
} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Formik,FastField, Form  } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";
import Moment from 'moment';

const products = [ 
  {
    classId: "1",
    className: "Hình 12A",
    teacherName: "Nguyên",
    mentorId: 1,
    timeTable: {
      start: "18h10",
      end: "19h40",
      day:"6"
    }
  },
  {
    classId: "2",
    className: "Hình 12B",
    teacherName: "Nguyên",
    mentorId: 2,
    timeTable: {
      start: "18h10",
      end: "19h40",
      day:"6"
    }
  },
  {
    classId: "3",
    className: "Đại 12A",
    teacherName: "Chung",
    mentorId: 1,
    timeTable: {
      start: "18h10",
      end: "19h40",
      day:"6"
    }
  },
  {
    classId: "4",
    className: "Đại 12B",
    teacherName: "Chung",
    mentorId: 1,
    timeTable: {
      start: "18h10",
      end: "19h40",
      day:"6"
    }
  },
  {
    classId: "4",
    className: "Đại 12B",
    teacherName: "Chung",
    mentorId: 1,
    timeTable: {
      start: "18h10",
      end: "19h40",
      day:"6"
    }
  },
  {
    classId: "4",
    className: "Đại 12B",
    teacherName: "Chung",
    mentorId: 1,
    timeTable: {
      start: "18h10",
      end: "19h40",
      day:"6"
    }
  },
  {
    classId: "4",
    className: "Đại 12B",
    teacherName: "Chung",
    mentorId: 1,
    timeTable: {
      start: "18h10",
      end: "19h40",
      day:"6"
    }
  },

];
const mystyle = {
with: "100%",
display: "flex",
borderRadius: "10px",
padding: "10px",
backgroundColor: "lightcyan"
}
const mystyle1 = {
display: "flex",
padding: "10px",
borderRadius: "10px",
}
const today = Moment(Date.now()).format('DD-MM-YYYY');
const mentorId = 2;

const ListClass = (props) => {
  const redirect = (classId) => {
    console.log(classId);
    props.history.push({
      pathname: '/pages/attendance',
      state: { classId: classId }
    })
  } 
  const columns = [
  {
  dataField: 'className',
  text: 'DANH SÁCH LỚP HỌC NGÀY '+today ,
  headerStyle: (colum, colIndex) => {
    return { width: '100%', textAlign: 'center',bordered:"none",fontSize: "20px",fontWeight: "bolder"  };
  },
  sort: true,
  formatter: (cell,row) => {
    
    return (
        <>
          {(row.mentorId === mentorId) ? 
              <div style={mystyle} >
                  <h5>{row.className +" - Thầy " + row.teacherName + " Thứ " + row.timeTable.day + ": " + 
                    row.timeTable.start + " - " + row.timeTable.end} </h5> 
                    <Button onClick ={() => redirect(row.classId)} style ={{marginLeft:"auto", backgroundColor: "red",borderRadius:"20px"}}>
                      Tham Gia
                    </Button>
              </div> :
              <div style={mystyle1} >
              <h5>{row.className +" - Thầy " + row.teacherName + " Thứ " + row.timeTable.day + ": " + 
                row.timeTable.start + " - " + row.timeTable.end} </h5> 
                    <Button onClick ={() => redirect(row.classId)}  style ={{marginLeft:"auto", borderRadius:"20px"}}>
                        Tham Gia
                    </Button>
              </div> 
          }
        </>
    );
  }

  }
  ];
 

    return (
      <Container fluid className="p-0">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <Formik
                  initialValues={
                    {
                      class: '',
                      subject: 'Toán Đại',
                      grade: '6'
                    }
                  }
                  onSubmit={(values) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                    }, 500);
                  }}
                >
                  <Form>
                    <Row style={{ alignItems: "center" }}>
                        <Col >
                          <Label>
                            Tên lớp:
                          </Label>
                          <FastField
                            bsSize="lg"
                            type="text"
                            name="class"
                            placeholder="Nhập tên lớp"
                            component={ReactstrapInput}
                          />
                        </Col>
                      
                        <Col  >
                          <Label >
                            Chọn Môn Học
                          </Label>
                          <FastField
                            bsSize="lg"
                            type="select"
                            name="subject"
                            placeholder="Nhập môn "
                            component={ReactstrapInput}
                            
                          >
                            <option>Toán Đại</option>
                            <option>Toán Hình</option>
                            <option>Tiếng Anh</option>
                            <option>Hóa</option>
                            <option>Văn</option>
                          </FastField>
                  
                        </Col>
                          <Col  >
                            <Label >
                              Chọn Khối
                            </Label>
                            <FastField
                              bsSize="lg"
                              type="select"
                              name="grade"
                              placeholder="Chọn khối"
                              component={ReactstrapInput}
                            >
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                            </FastField>
                            
                          </Col>
                          <Col >
                              <Button style={{marginTop:"45px", borderRadius:"20px"}} type="submit" >Serach</Button>
                          </Col>
                      </Row>
                  </Form>
                </Formik>
              </CardHeader>
              <CardBody>
                  <BootstrapTable 
                    keyField='id' 
                    data={ products } 
                    columns={ columns } 
                    bordered = {false}
                    hover
                    pagination={paginationFactory({
                      sizePerPage: 5,
                      nextPageText: '>',
                      prePageText: '<',
                      withFirstAndLast: false,
                      alwaysShowAllBtns: true,
                      hideSizePerPage: true,
                    })}
                    
                    />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
} 

export default ListClass;

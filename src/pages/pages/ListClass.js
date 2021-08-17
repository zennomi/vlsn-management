import React, {useState, useEffect} from "react";
import {
  Card,
  CardBody,
  Col,
  CardHeader,
  Container,
  Row,
  Button
} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Formik,FastField, Form  } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";
import Moment from 'moment';
import ClassroomApi from "../../api/ClassroomApi"

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
const weeklyToday = new Date().getDay() + 1;
const mentorId = 4;

const ListClass = (props) => {

  const redirect = (clazz) => {
    props.history.push({
      pathname: '/pages/attendance',
      state: { 
        classId: clazz.classId,
        mentorList: clazz.mentorList,
        className: clazz.className,
        teacherName:clazz.teacherName,
        day: clazz.day,
        start: clazz.start,
        end: clazz.end,
      }
    })
  } 

  const products = [];


  const [listClassToday, setListClass] = useState([]);

  useEffect(() => {
    const getAllClassListToday = async () =>{
      const result = await ClassroomApi.getListClassroomToday(weeklyToday);
      setListClass(result);
    }
    getAllClassListToday();
    console.log("render");
  }, []);
  
  useEffect(() => {
    console.log("rerender listClass!");
  });
  console.log(listClassToday);
  listClassToday.map(clazz => 
      products.push(
        {
          mentorList: clazz.listMentor,
          className: clazz.subjectName + " " + clazz.grade + clazz.className,
          classId: clazz.id,
          teacherName:clazz.teacherId.fullName,
          day: clazz.schedule,
          start: clazz.startTime,
          end: clazz.endTime,
        }
      )
  )

  const columns = [
  {
    dataField: 'className',
    text: 'DANH SÁCH LỚP HỌC'+((weeklyToday !== 1) ?' THỨ '+ weeklyToday : ' CHỦ NHẬT') +' NGÀY '+today,
    headerStyle: (colum, colIndex) => {
      return { width: '100%', textAlign: 'center',bordered:"none",fontSize: "20px",fontWeight: "bolder"  };
    },
    sort: true,
    formatter: (cell,row) => {
      console.log(row);
      console.log(weeklyToday);
      var isMentorClazz = false;
      row.mentorList.forEach(element => {
        if(element.mentorId === mentorId){
          isMentorClazz = true;
        }
        return null;
      });

      return (
          <>
            {(isMentorClazz) ? 
                <div style={mystyle} key={row.classId}>
                    <h5 >{row.className +" - GV." + row.teacherName + "-" + 
                      row.start + " - " + row.end} </h5> 
                      <Button  onClick ={() => redirect(row)} style ={{marginLeft:"auto", backgroundColor: "red",borderRadius:"20px"}}>
                        Tham Gia
                      </Button>
                </div> :
                <div style={mystyle1} key={row.classId} >
                <h5 >{row.className +" - GV." + row.teacherName + "-"+ 
                  row.start + " - " + row.end} </h5> 
                      <Button  onClick ={() => redirect(row)}  style ={{marginLeft:"auto", borderRadius:"20px"}}>
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
                          
                          <FastField
                            label="Tên lớp:"
                            bsSize="lg"
                            type="text"
                            name="class"
                            placeholder="Nhập tên lớp"
                            component={ReactstrapInput}
                          />
                        </Col>
                      
                        <Col  >
                          
                          <FastField
                            label="Chọn Môn Học"
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
                            <FastField
                              label="Chọn Khối"
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
                              <Button style={{marginTop:"20px", borderRadius:"5px"}} type="submit" >Serach</Button>
                          </Col>
                      </Row>
                  </Form>
                </Formik>
              </CardHeader>
              <CardBody>
                  <BootstrapTable 
                    keyField='classId' 
                    data={ products } 
                    columns={ columns } 
                    bordered = {false}
                    hover
                    pagination={paginationFactory({
                      sizePerPage: 7,
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

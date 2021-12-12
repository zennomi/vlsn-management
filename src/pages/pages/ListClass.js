import React, {useState, useEffect} from "react";
import {
  Card,
  CardBody,
  Col,
  
  Container,
  Row,
  Button
} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import Moment from 'moment';
import ClassroomApi from "../../api/ClassroomApi"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId } from "../../redux/selectors/userLoginInfoSelector";
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


const ListClass = (props) => {

  const mentorId = props.id;

  const redirect = (clazz) => {
    props.history.push({
      pathname: '/pages/attendance',
      state: { 
        classId: clazz.classId,
        mentorList: clazz.mentorList,
        className: clazz.className,
        subjectName:clazz.subjectName,
        grade:clazz.grade,
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
    
  }, []);
  
 
 
  listClassToday.map(clazz => 
      products.push(
        {
          mentorList: clazz.listMentor,
          className: clazz.subjectName + " " + clazz.grade + clazz.className,
          classId: clazz.id,
          subjectName:clazz.subjectName,
          grade:clazz.grade,
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
                      <Button color="primary"  onClick ={() => redirect(row)}  style ={{marginLeft:"auto", borderRadius:"20px"}}>
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
const mapGlobalStateToProps = state => {
  return {
    fullName: selectFullName(state),
    role: selectRole(state),
    id:selectId(state)
  };
};
export default withRouter(connect(mapGlobalStateToProps)(ListClass));


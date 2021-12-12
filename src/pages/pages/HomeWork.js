import React, { useState,useEffect } from "react";

import {
  Card,
  CardBody,
  Col,
  Row,
  
} from "reactstrap";
import {
  Book as BookIcon,
  Key as KeyIcon,
  Calendar as CalendarIcon
} from "react-feather";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId } from "../../redux/selectors/userLoginInfoSelector";
import ClientApi from "../../api/ClientApi";
const NewHomeWork = (props) => {

  const newHomeWork = (props.newHomeWork !== [] ) ? props.newHomeWork : [{
    name:"",
    link:"",
    misson:"",
    date:""
  }];
  console.log(newHomeWork);

  return(
    <>
        <div className="d-flex justify-content-between flex-wrap">
            <p className="h4 font-weight-bold">
                  Bài tập mới
                  
            </p>
        </div>
        <Row>
            { (newHomeWork.length !== 0) ? newHomeWork.map((homework,i) => 
              (homework !== undefined) ?
              <Col key={i} lg="3">
                <div>
                  <Card>
                      <CardBody>
                            <div style={{padding:"15px",borderRadius:"10px"}}>
                              <img alt="BTVN" style={{width:"100%"}} src={require("../../assets/img/brands/logo.png")}/>
                            </div>
                            <a  href={homework.link}>
                              <h6 style={{fontWeight:"bold"}}>{homework.name}</h6>
                              <h6 style={{fontWeight:"bold"}}>{homework.misson}</h6>
                            </a>
                          <div className="d-flex justify-content-between flex-wrap" >
                                <div>
                                    <CalendarIcon></CalendarIcon> {homework.date}
                                </div>
                                <div>
                                  <BookIcon></BookIcon> <a href={homework.link}>Đề bài</a>
                                </div>
                          </div>
                      </CardBody>
                
                  </Card>
                </div>
              </Col> : null
            ) : null}
        </Row>
        
    </>
  )
}


const SubmittedHomeWork = (props) => {

  const submitedHomeWorks = (props.submitedHomeWorks !== [] ) ? props.submitedHomeWorks : [{
    name:"",
    link:"",
    misson:"",
    date:""
  }];;

  return(
    <>
        <div className="d-flex justify-content-between flex-wrap">
            <p className="h4 font-weight-bold">
                  Bài tập đã làm
                  
            </p>
        </div>
        <Row>
            { (submitedHomeWorks.length !== 0) ? submitedHomeWorks.map((homework,i) => 
            <Col key={i} lg="3">
              <div>
                <Card>
                    <CardBody>
                          <div style={{padding:"15px",borderRadius:"10px"}}>
                            <img alt="BTVN" style={{width:"100%"}} src={require("../../assets/img/brands/logo.png")}></img>
                          </div>
                          <a  href={homework.link}>
                            <h6 style={{fontWeight:"bold"}}>{homework.name}</h6>
                          </a>
                        <div className="d-flex justify-content-between flex-wrap" >
                              <div>
                                 <BookIcon></BookIcon> <a href={homework.link}>Đề bài</a>
                              </div>
                              {(homework.keyLink !== undefined) ?
                              <div>
                                  <KeyIcon></KeyIcon> <a href={homework.keyLink}>Đáp án</a>
                              </div> : null }
                        </div>
                    </CardBody>
              
                </Card>
              </div>
            </Col>
            ) : null}
            
        </Row>
        
    </>
  )
}

const UnSubmittedHomeWork = (props) => {

  
  const unSubmitHomeWorks = (props.unSubmitHomeWorks !== [] ) ? props.unSubmitHomeWorks : [{
    name:"",
    link:"",
    misson:"",
    date:""
  }];
  return(
    <>
        <div className="d-flex justify-content-between flex-wrap">
            <p className="h4 font-weight-bold">
                  Bài tập chưa làm
                  
            </p>
        </div>
        <Row>
            {(unSubmitHomeWorks.length !== 0) ? unSubmitHomeWorks.map((homework,i) => 
            
            <Col key={i} lg="3">
              <div>
                <Card>
                    <CardBody>
                          <div style={{padding:"15px",borderRadius:"10px"}}>
                            <img alt="BTVN" style={{width:"100%"}} src={require("../../assets/img/brands/logo.png")}></img>
                          </div>
                          <a  href={homework.link}>
                              <h6 style={{fontWeight:"bold"}}>{homework.name}</h6>
                              <h6 style={{fontWeight:"bold"}}>{homework.misson}</h6>
                          </a>
                        <div className="d-flex justify-content-between flex-wrap" >
                              <div>
                                  <CalendarIcon></CalendarIcon> {homework.date}
                              </div>
                              <div>
                                 <BookIcon></BookIcon> <a href={homework.link}>Đề bài</a>
                              </div>
                        </div>
                    </CardBody>
              
                </Card>
              </div>
            </Col>
            ) : null}
            
        </Row>
       
    </>
  )
}

const HomeWork = (props) =>{ 

  const studentId = props.id;

  const [homeworks,setHomeWorks] = useState([]);
  

  useEffect(() => {
    const getAllHomeWork = async () =>{
        const res = await ClientApi.getAllHomeWorkOfStudent(studentId);
        setHomeWorks(res);
    }
    getAllHomeWork();
  }, [studentId]);

  var unSubmitHomeWorks = [];
  var submitedHomeWorks = []
  homeworks.map(homework => (homework.status === "A") ? unSubmitHomeWorks.push(homework) : submitedHomeWorks.push(homework) )
  var newHomeWork = [];
  for(var i = 0 ; i < 2 ; i ++){
    newHomeWork.push(unSubmitHomeWorks[i]);
  }
  console.log(unSubmitHomeWorks);
  console.log(submitedHomeWorks);
  console.log(newHomeWork);
  console.log(homeworks);

  return(
  <> 
      <NewHomeWork newHomeWork={newHomeWork} setHomeWorks={setHomeWorks}></NewHomeWork>
      <br/>
      <UnSubmittedHomeWork unSubmitHomeWorks={unSubmitHomeWorks} setHomeWorks={setHomeWorks}></UnSubmittedHomeWork>
      <br/>
      <SubmittedHomeWork submitedHomeWorks={submitedHomeWorks} setHomeWorks={setHomeWorks}></SubmittedHomeWork>
     
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
export default withRouter(connect(mapGlobalStateToProps)(HomeWork));
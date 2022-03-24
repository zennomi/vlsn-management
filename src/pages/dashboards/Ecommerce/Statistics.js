import React from "react";
import { Col, Card, CardBody, CardHeader, Progress, Row } from "reactstrap";

const Statistics = (props) =>{ 
  
  const statisticsMonth = props.statisticsMonth;

  const month = props.month;
  
  return(
  <Row>
    <Col lg="6" xl="4">
      <Card className="flex-fill">
        <CardHeader>
          <span className="badge badge-primary float-right">Tháng {month}</span>
          <h5 className="card-title mb-0">Học sinh mới</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="8">
              <h2 className="d-flex align-items-center mb-0 font-weight-light">
                +{statisticsMonth[0].numberOfStatisticStudentThisMonth}
              </h2>
            </Col>
            <Col xs="4" className="text-right">
              <span className="text-muted">{ 
              (statisticsMonth[0].percentDeltaCurrentMonth !== -96.6996) ? 
              (statisticsMonth[0].percentDeltaCurrentMonth > 0) ?
               <p style={{fontWeight:"bold", color:"green"}}>+{statisticsMonth[0].percentDeltaCurrentMonth.toFixed(2) +"%"}</p> : 
               <p style={{fontWeight:"bold", color:"red"}}>{statisticsMonth[0].percentDeltaCurrentMonth.toFixed(2) +"%"}</p> :
               <p style={{fontWeight:"bold", fontSize:"25px"}}>&#8734;</p>}
              </span>
            </Col>
          </Row>

          <Progress
            color="primary"
            value={ (statisticsMonth[0].percentDeltaCurrentMonth !== -96.6996) ? statisticsMonth[0].percentDeltaCurrentMonth.toFixed(2) : 100}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="4">
      <Card className="flex-fill">
        <CardHeader>
          <span className="badge badge-warning float-right">Tháng {month}</span>
          <h5 className="card-title mb-0">Học sinh nghỉ</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="8">
              <h2 className="d-flex align-items-center mb-0 font-weight-light">
                -{statisticsMonth[1].numberOfStatisticStudentThisMonth}
              </h2>
            </Col>
            <Col xs="4" className="text-right">
              <span className="text-muted " >
                {
                  (statisticsMonth[1].percentDeltaCurrentMonth !== -96.6996) ? 
                  (statisticsMonth[1].percentDeltaCurrentMonth < 0) ?
                   <p style={{fontWeight:"bold", color:"green"}}>{statisticsMonth[1].percentDeltaCurrentMonth.toFixed(2) +"%"}</p> : 
                   <p style={{fontWeight:"bold", color:"red"}}>+{statisticsMonth[1].percentDeltaCurrentMonth.toFixed(2) +"%"}</p> :
                   <p style={{fontWeight:"bold", fontSize:"25px"}}>&#8734;</p>
                }
              </span>
            </Col>
          </Row>

          <Progress
            color="warning"
            value={(statisticsMonth[1].percentDeltaCurrentMonth !== -96.6996) ?  statisticsMonth[1].percentDeltaCurrentMonth.toFixed(2) : (statisticsMonth[1].numberOfStatisticStudentThisMonth > 0 ) ? 0 : 100 }
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="4">
      <Card className="flex-fill">
        <CardHeader>
          <span className="badge badge-success float-right">Tháng {month}</span>
          <h5 className="card-title mb-0">Tốc độ tăng trưởng</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="8">
              <h2 className="d-flex align-items-center mb-0 font-weight-light">
                số học sinh: {statisticsMonth[2].numberOfStatisticStudentThisMonth} 
              </h2>
            </Col>
            <Col xs="4" className="text-right">
              <span className="text-muted ">
              {
                  (statisticsMonth[2].percentDeltaCurrentMonth !== -96.6996) ? 
                  (statisticsMonth[2].percentDeltaCurrentMonth > 0) ?
                   <p style={{fontWeight:"bold", color:"green"}}>{statisticsMonth[2].percentDeltaCurrentMonth.toFixed(2) +"%"}</p> : 
                   <p style={{fontWeight:"bold", color:"red"}}>+{statisticsMonth[2].percentDeltaCurrentMonth.toFixed(2) +"%"}</p> :
                   <p style={{fontWeight:"bold", fontSize:"25px"}}>&#8734;</p>
                }
              </span>
            </Col>
          </Row>
          <Progress
            color="success"
            value={(statisticsMonth[0].percentDeltaCurrentMonth !== -96.6996) ? statisticsMonth[0].percentDeltaCurrentMonth.toFixed(2) : 100}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
  );
}
export default Statistics;

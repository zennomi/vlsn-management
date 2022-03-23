import React from "react";
import { Col, Card, CardBody, CardHeader, Progress, Row } from "reactstrap";

const Statistics = () => (
  <Row>
    <Col lg="6" xl="4">
      <Card className="flex-fill">
        <CardHeader>
          <span className="badge badge-primary float-right">Tháng 3</span>
          <h5 className="card-title mb-0">Học sinh mới</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="8">
              <h2 className="d-flex align-items-center mb-0 font-weight-light">
                +30
              </h2>
            </Col>
            <Col xs="4" className="text-right">
              <span className="text-muted text-success">+57%</span>
            </Col>
          </Row>

          <Progress
            color="primary"
            value={57}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="4">
      <Card className="flex-fill">
        <CardHeader>
          <span className="badge badge-warning float-right">Tháng 3</span>
          <h5 className="card-title mb-0">Học sinh nghỉ</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="8">
              <h2 className="d-flex align-items-center mb-0 font-weight-light">
                -11
              </h2>
            </Col>
            <Col xs="4" className="text-right">
              <span className="text-muted text-success" >- 82%</span>
            </Col>
          </Row>

          <Progress
            color="warning"
            value={82}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="4">
      <Card className="flex-fill">
        <CardHeader>
          <span className="badge badge-success float-right">Tháng 3</span>
          <h5 className="card-title mb-0">Chênh lệch</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="8">
              <h2 className="d-flex align-items-center mb-0 font-weight-light">
                +19
              </h2>
            </Col>
            <Col xs="4" className="text-right">
              <span className="text-muted text-success">+32%</span>
            </Col>
          </Row>

          <Progress
            color="success"
            value={32}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default Statistics;

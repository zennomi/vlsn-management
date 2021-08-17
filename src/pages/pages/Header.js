import React from "react";

import {
  Col,
  Row,
} from "reactstrap";






const Header = () => {

  // const weeklyToday = new Date().getDay() + 1;

  return (
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Welcome back, Chris!</h3>
      </Col>
    </Row>
  );
};

export default Header;

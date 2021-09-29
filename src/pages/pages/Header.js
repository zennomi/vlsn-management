import React from "react";

import {
  Col,
  Row,
} from "reactstrap";




import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";

import { selectFistName } from "../../redux/selectors/userLoginInfoSelector";

const Header = (props) => {

  // const weeklyToday = new Date().getDay() + 1;

  return (
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Welcome back, {props.firstName}!</h3>
      </Col>
    </Row>
  );
};

const mapGlobalStateToProps = state => {
  return {
    firstName: selectFistName(state),
    // role: selectRole(state),

  };
};
export default withRouter(connect(mapGlobalStateToProps)(Header));

import React from "react";

import {
  Button,
  Col,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import {  withRouter,Link } from "react-router-dom";
import { Filter, RefreshCw } from "react-feather";
import { selectFistName } from "../../../redux/selectors/userLoginInfoSelector";
const Header = (props) => {
  return (
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Welcome back, {props.firstName}!</h3>
      </Col>

      <Col xs="auto" className="ml-auto text-right mt-n1">
        <Link to="/create/results">
            <Button  color="primary" className="shadow-sm mr-1">
              <Filter className="feather" /> Nhập Điểm
            </Button>
        </Link>
        <Link to="/create/">
            <Button  color="primary" className="shadow-sm mr-1">
              <Filter className="feather" /> Tạo Lớp Học
            </Button>
        </Link>
        
        <Button color="primary" className="shadow-sm">
          <RefreshCw className="feather" />
        </Button>
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
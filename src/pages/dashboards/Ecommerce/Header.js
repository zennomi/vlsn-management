import React from "react";

import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from "reactstrap";

import { Calendar } from "react-feather";

const Header = () => {
  return (
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Welcome back, Chris!</h3>
      </Col>

      <Col xs="auto" className="ml-auto text-right mt-n1">
        <UncontrolledDropdown className="d-inline mr-2">
          <DropdownToggle caret color="light" className="bg-white shadow-sm">
            <Calendar className="feather align-middle mt-n1" /> Lớp 12
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Seperated link</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown className="d-inline mr-2">
          <DropdownToggle caret color="light" className="bg-white shadow-sm">
            <Calendar className="feather align-middle mt-n1" /> Toán
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Seperated link</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

      </Col>
    </Row>
  );
};

export default Header;

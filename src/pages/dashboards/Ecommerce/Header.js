import React from "react";

import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from "reactstrap";

import { Calendar, User } from "react-feather";

const Header = (props) => {

  const month = props.month;
  const setMonth = props.setMonth;

  const grade = props.grade;
  const setGrade = props.setGrade;

  const firstName = props.firstName;

  return (
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Welcome back, {firstName}!</h3>
      </Col>

      <Col xs="auto" className="ml-auto text-right mt-n1">
        <UncontrolledDropdown className="d-inline mr-2">
          <DropdownToggle caret color="light" className="bg-white shadow-sm">
            <User className="feather align-middle mt-n1" /> Lớp {grade}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => setGrade(12)}>Lớp 12</DropdownItem>
            <DropdownItem onClick={() => setGrade(11)}>Lớp 11</DropdownItem>
            <DropdownItem onClick={() => setGrade(10)}>Lớp 10</DropdownItem>
            <DropdownItem onClick={() => setGrade(9)}>Lớp 9</DropdownItem>
            <DropdownItem onClick={() => setGrade(8)}>Lớp 8</DropdownItem>
            <DropdownItem onClick={() => setGrade(7)}>Lớp 7</DropdownItem>
            <DropdownItem onClick={() => setGrade(6)}>Lớp 6</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown className="d-inline mr-2">
          <DropdownToggle caret color="light" className="bg-white shadow-sm">
            <Calendar className="feather align-middle mt-n1" /> Tháng {month}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => setMonth(1)}>Tháng 1</DropdownItem>
            <DropdownItem onClick={() => setMonth(2)}>Tháng 2</DropdownItem>
            <DropdownItem onClick={() => setMonth(3)}>Tháng 3</DropdownItem>
            <DropdownItem onClick={() => setMonth(4)}>Tháng 4</DropdownItem>
            <DropdownItem onClick={() => setMonth(5)}>Tháng 5</DropdownItem>
            <DropdownItem onClick={() => setMonth(6)}>Tháng 6</DropdownItem>
            <DropdownItem onClick={() => setMonth(7)}>Tháng 7</DropdownItem>
            <DropdownItem onClick={() => setMonth(8)}>Tháng 8</DropdownItem>
            <DropdownItem onClick={() => setMonth(9)}>Tháng 9</DropdownItem>
            <DropdownItem onClick={() => setMonth(10)}>Tháng 10</DropdownItem>
            <DropdownItem onClick={() => setMonth(11)}>Tháng 11</DropdownItem>
            <DropdownItem onClick={() => setMonth(12)}>Tháng 12</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

      </Col>
    </Row>
  );
};

export default Header;

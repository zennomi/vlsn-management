import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">
        <Col xs="6" className="text-left">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="https://www.facebook.com/vatlysieunham" target="_blank" rel="noopener noreferrer">
                Fanpage  
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.facebook.com/groups/305247567884632" target="_blank" rel="noopener noreferrer">
                Group  
              </a>
            </li>
            
          </ul>
        </Col>
        <Col xs="6" className="text-right">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <span href="/" className="text-muted">
              Số 10 Tạ Quang Bửu, Bách Khoa, Hà Nội
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;

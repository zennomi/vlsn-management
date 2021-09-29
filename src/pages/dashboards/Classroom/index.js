import React, {useState} from "react";
import { Container, Row, Col } from "reactstrap";

// import Activity from "./Activity";
// import BarChart from "./BarChart";
import Header from "./Header";
// import LineChart from "./LineChart";
import ClassList from "./ClassList";
import Statistics from "./Statistics";
import Course from "./Course";
// import Statistics from "./Statistics";
// import USAMap from "./USAMap";

const Ecommerce = (props) =>{

  const [clazz, setClass] = useState({});
  const [modal,setModal] = useState(false);

  return(
  <Container fluid className="p-0">
    <Header />
    <Row>
      <Col className="d-flex">
        <ClassList setClass={setClass} {...props} setWatch={setModal} isWatching={modal} />
      </Col>
    </Row>
    {(modal) ? <Statistics clazz={clazz} {...props} /> : null}
    {(modal) ? <Course clazz={clazz} {...props} /> : null}
  </Container>
);
}
export default Ecommerce;

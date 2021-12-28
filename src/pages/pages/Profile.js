import React from "react";


import {
  
  Card,
  CardBody,
  Badge,
  CardTitle,
  Col,
  Container,

  Row,

} from "reactstrap";


import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId, selectAvatarUrl } from "../../redux/selectors/userLoginInfoSelector";


import avatar4 from "../../assets/img/avatars/avatar-4.jpg";


const ProfileDetails = (props) => (
  <Card>
  
    <CardBody className="text-center">
      <img
        src={(props.avatarUrl !== null) ? (`${process.env.REACT_APP_AVATAR_URL}/${props.avatarUrl}`) : avatar4 }
        alt={props.fullName}
        className="img-fluid rounded-circle mb-2"
        width="128"
        height="128"
      />
      <CardTitle tag="h5" className="mb-0">
        {props.fullName}
      </CardTitle>
      <div className="text-muted mb-2"><Badge color="success">{props.role}</Badge></div>

     
    </CardBody>
    
  </Card>
);



const Profile = (props) => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Thông tin</h1>

    <Row>
      <Col >
        <ProfileDetails {...props} />
      </Col>
      
    </Row>
  </Container>
);


const mapGlobalStateToProps = state => {
  return {
    fullName: selectFullName(state),
    role: selectRole(state),
    id:selectId(state),
    avatarUrl:selectAvatarUrl(state)
  };
};
export default withRouter(connect(mapGlobalStateToProps)(Profile));
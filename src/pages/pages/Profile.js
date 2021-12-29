import React, {useRef, useState} from "react";


import {
  
  Card,
  CardBody,
  Badge,
  CardTitle,
  Col,
  Container,
  Button,
  Row,

} from "reactstrap";

import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId, selectAvatarUrl } from "../../redux/selectors/userLoginInfoSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toastr } from "react-redux-toastr";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import FileApi from "../../api/FileApi";

const ProfileDetails = (props) =>{
   
  const avatarInputFileRef = useRef(null);

  const [previewAvatarUrl, setPreviewAvatarUrl] = useState();

  const [previewAvatarFile, setPreviewAvatarFile] = useState();

  const [isDisabledSaveButton, setDisabledSaveButton] = useState(false);

  const onChangeAvatarInputFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewAvatarUrl(reader.result);
      setPreviewAvatarFile(file);
    }
  };

  const showSucessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right"
    };

    // show notification
    toastr.success(title, message, options);
  }

  const handleSave = async () => {
    try {
      setDisabledSaveButton(true);
      // upload avatar
      const nameImage = await FileApi.uploadUserAvatarImage(previewAvatarFile,props.id);
     localStorage.setItem("avatarUrl",nameImage);
      setDisabledSaveButton(false);
      showSucessNotification(
        "Change Profile",
        "Change Profile Successfully!"
      );
    } catch (error) {
      setDisabledSaveButton(false);
      console.log(error);
    }
  }

  
  return(
    <Card>
    
      <CardBody className="text-center">
        <img
          src={
            previewAvatarUrl ?
            previewAvatarUrl :
            (props.avatarUrl !== "null" && props.avatarUrl !== null ) ? (`${process.env.REACT_APP_AVATAR_URL}/${props.avatarUrl}`) : avatar4 }
          alt={props.fullName}
          className="img-fluid rounded-circle mb-2"
          width="128"
          height="128"
        />
        <CardTitle tag="h5" className="mb-0">
          {props.fullName}
        </CardTitle>
        <div className="text-muted mb-2"><Badge color="success">{props.role}</Badge></div>
        <input id="avatarInput"
                    type="file"
                    accept="image/*"
                    ref={avatarInputFileRef}
                    onChange={onChangeAvatarInputFile}
                    style={{ display: 'none' }}
        />
        <Button color="primary" onClick={(e) => avatarInputFileRef.current.click()}>
            <FontAwesomeIcon icon={faUpload} /> Upload
        </Button>
        <Button color="primary" disabled={isDisabledSaveButton} onClick={handleSave}>Save changes</Button>
      </CardBody>
      
    </Card>
  );
}


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
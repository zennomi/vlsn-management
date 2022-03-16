import React, {useRef, useState} from "react";


import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  CardBody,
  Badge,
  CardTitle,
  Col,
  Container,
  Button,
  Row,

} from "reactstrap";


import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import getCroppedImg from "./CropImage";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId, selectAvatarUrl } from "../../redux/selectors/userLoginInfoSelector";
import { toastr } from "react-redux-toastr";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import FileApi from "../../api/FileApi";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { IconButton } from "@material-ui/core";

const dataURLtoFile = (dataurl, filename) => {
	const arr = dataurl.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) u8arr[n] = bstr.charCodeAt(n);

	return new File([u8arr], filename, { type: mime });
};


const ProfileDetails = (props) =>{
   
  const avatarInputFileRef = useRef(null);

  const [previewAvatarUrl, setPreviewAvatarUrl] = useState();

  const [previewAvatarFile, setPreviewAvatarFile] = useState();

  const [isDisabledSaveButton, setDisabledSaveButton] = useState(false);

  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);

  const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

  const onChangeAvatarInputFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
			let reader = new FileReader();
      let file = e.target.files[0];
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setPreviewAvatarUrl(reader.result);
        setPreviewAvatarFile(file);
        setModalChangeAvatar(true);
      }
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
    const canvas = await getCroppedImg(previewAvatarUrl, croppedArea);
    
    const imageCroppedFile = dataURLtoFile(canvas.toDataURL("image/jpeg"),previewAvatarFile.name);
    try {
      setDisabledSaveButton(true);
      // upload avatar
      const nameImage = await FileApi.uploadUserAvatarImage(imageCroppedFile,props.id);
      localStorage.setItem("avatarUrl",nameImage);
      sessionStorage.setItem("avatarUrl",nameImage);
      setDisabledSaveButton(false);
      showSucessNotification(
        "Change Profile",
        "Change Profile Successfully!"
      );
      setModalChangeAvatar(false);
    } catch (error) {
      setDisabledSaveButton(false);
      console.log(error);
    }
  }

  
  return(
  <>
    <Modal size="xl" isOpen={modalChangeAvatar} toggle={setModalChangeAvatar}>
      <ModalHeader>
            Kéo để đặt vị trí
      </ModalHeader>
      <ModalBody>
      <div style={{
          height: "50vh",
          width: "55vw"
      }}>
        <div style={{
          height: "90%",
          padding: "10px"
        }}>
        {previewAvatarUrl ? (
          <>
            <div style={{
              height: "90%",
             
            }}>
              <Cropper
                image={previewAvatarUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div style={{
                height: "10%",
                display: "flex",
                alignItems: "center",
                margin: "auto",
                width: "60%",
            }}>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
    </ModalBody>
    <ModalFooter>
            <Button color="primary" onClick={handleSave} disabled={isDisabledSaveButton}>Lưu</Button>
            <Button color="primary" onClick={() => {
                setPreviewAvatarUrl();
                setModalChangeAvatar(false)
              }}>
                Hủy</Button>
    </ModalFooter>
    </Modal>
    <Card>
    
      <CardBody className="text-center">
        
        <div style={{
            textAlign:"center"
        }}>
          <img
            style={{
              display:"block",
              margin:"auto"
            }}
            src={
              previewAvatarUrl ?
              previewAvatarUrl :
              (props.avatarUrl !== "null" && props.avatarUrl !== null ) ? (`${process.env.REACT_APP_AVATAR_URL}/${props.avatarUrl}`) : avatar4 }
            alt={props.fullName}
            className="img-fluid rounded-circle mb-2"
            width="128"
            height="128"
          />
          <IconButton
              type="button"
              style={{
                display:"block",
                height: "3rem",
                width: "3rem",
                margin:"auto",
                top:"-34px",
                backgroundColor:"lightgrey"
            }}
            onClick={(e) => avatarInputFileRef.current.click()}
            >
              <CameraAltIcon fontSize='medium' />
          </IconButton>
        </div>
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
     
      </CardBody>
      
    </Card>
  </>
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
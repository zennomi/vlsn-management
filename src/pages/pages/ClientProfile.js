import React, { useState,useEffect,useRef } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFullName, selectRole, selectId } from "../../redux/selectors/userLoginInfoSelector";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Media,
  Row,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { MDBDataTableV5 } from 'mdbreact';
import ClientApi from "../../api/ClientApi";
import FileApi from "../../api/FileApi";

import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import getCroppedImg from "./CropImage";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import { toastr } from "react-redux-toastr";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { IconButton } from "@material-ui/core";

import {
  Clock as ClockIcon,
  // Camera as CameraIcon

} from "react-feather";
import StarIcon from "@material-ui/icons/Star";
// import  QRCode  from "qrcode.react";
const removeLastThreeChar = (str) => {
  return str.slice(0,-3)
}

const dataURLtoFile = (dataurl, filename) => {
	const arr = dataurl.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) u8arr[n] = bstr.charCodeAt(n);

	return new File([u8arr], filename, { type: mime });
};

const translateRoleToVietnamese = role => {
  if (role === "MENTOR") return "TRỢ GIẢNG";
  else if (role === "TEACHER") return "GIÁO VIÊN";
  else if (role === "MANAGER") return "QUẢN LÍ";
  else return "QUẢN TRỊ VIÊN";
}

const StudentProfileDetails = (props) =>{ 

  const studentId = props.studentId;
  const [student,setStudent] = useState({
    fullName:"",
    grade:"",
    listClass:[],
    subjectStatus:[]
  });
  var totalMark = 0;
  var takedSubjectExam = 0;

  useEffect(() => {
    const getStudentStudyStatus = async () =>{
        const res = await ClientApi.getStudentStudyInfo(studentId);
        setStudent(res);
       
    }
    getStudentStudyStatus();
    
  }, [studentId]);

  student.subjectStatus.map(subject => totalMark += subject.avgMark);
  for(var i = 0 ; i < student.subjectStatus.length ; i ++){
    if(student.subjectStatus[i].avgMark !== 0){
      takedSubjectExam ++;
    }
  }
  var avgStudentMark = 0;
  if(takedSubjectExam !== 0){
    avgStudentMark = totalMark/takedSubjectExam;
  }
  
  const previewAvatarUrl = props.previewAvatarUrl;
  const avatarInputFileRef = props.avatarInputFileRef;
  const onChangeAvatarInputFile = props.onChangeAvatarInputFile;

  return(
  <>
    
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
            (student.avatarUrl !== "null" && student.avatarUrl !== null ) ? (`${process.env.REACT_APP_AVATAR_URL}/${student.avatarUrl}`) :
            (student.facebookUrl !== "null" && student.facebookUrl !== null) ? student.facebookUrl :
            avatar4 }
          alt={student.fullName}
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
      <CardTitle  className="mb-0">
            <h4 style={{fontWeight:"bold"}}>{student.fullName} - Lớp {student.grade}</h4>
            <h5>Số sao: {student.score} <StarIcon style={{color:"yellow",marginBottom:"4px"}}/></h5>
      </CardTitle>
      <input id="avatarInput"
                    type="file"
                    accept="image/*"
                    ref={avatarInputFileRef}
                    onChange={onChangeAvatarInputFile}
                    style={{ display: 'none' }}
        />
        
        

      {/* <div>
        <Button size="sm" color="primary" className="mr-1">
            <CameraIcon></CameraIcon>
        </Button>
      </div> */}
      
      {/* <div>
          <div>
              <a href="https://www.google.com/">LINK ĐIỂM DANH</a>
          </div>
          <QRCode value="https://www.google.com/" />
      </div> */}
      
    </CardBody>

    <hr className="my-0" />

    <CardBody>
      <h5 style={{fontWeight:"bold"}} >Lớp học đã đăng ký</h5>
      {student.listClass.map((clazz,i) => 
        <div key={i}>
          <div key={i} className="d-flex justify-content-between flex-wrap">
              <div>
                  {clazz.subjectName} {clazz.grade}{clazz.className}
              </div>
              <div>
                {clazz.listSchedule.map((schedule,i) => 
                <div key={i}>
                  <ClockIcon></ClockIcon> 
                  {(schedule.schedule === "1") ? "CN" : "T"+schedule.schedule } - {removeLastThreeChar(schedule.startTime)} - {removeLastThreeChar(schedule.endTime)}
                </div>
                )}
              </div>
          </div>
          <br/>
        </div>
      )}
      
    </CardBody>

    <hr className="my-0" />
    <CardBody>
          
          <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <h5 style={{fontWeight:"bold"}}>Điểm trung bình: {avgStudentMark}
                    </h5>
                </div>
                <div>
                    <h5 style={{fontWeight:"bold"}}>Hạng</h5>
                </div>
          </div>
          {student.subjectStatus.map((subject,i) =>
            <div key={i} className="d-flex justify-content-between flex-wrap">
                  <div>
                      <h5>{subject.subjectName} - {(subject.avgMark === 0) ? "Chưa KTra" : subject.avgMark}</h5>
                  </div>
                  <div>
                      <h5>{(subject.avgMark === 0) ? "Chưa Xếp hạng" : subject.rank}</h5>
                  </div>
            </div>
          )}
    </CardBody>
    <hr className="my-0" />
    <CardBody>
        <h5 style={{textAlign:"center",fontWeight:"bold"}}>Xếp hạng: 
        {(avgStudentMark >= 9) ? <p style={{color:"red"}}>Vàng (Xuất Sắc)</p> :
        (avgStudentMark >= 8 && avgStudentMark < 9) ? <p style={{color:"red"}}>Bạc (Giỏi)</p> :
        (avgStudentMark >= 5 && avgStudentMark < 8) ? <p style={{color:"red"}}>Đồng (Khá)</p> : 
        (avgStudentMark > 0 && avgStudentMark < 5) ?<p style={{color:"red"}}>Gỗ (Yếu)</p> : 
        <p style={{color:"black"}}>Chưa xếp hạng</p>}
        </h5>
        <div style={{margin: "0 auto"}}>

              <div style={{width:"50%",margin: "0 auto"}} >
                {(avgStudentMark >= 9) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Gold.png')}></img> :
                (avgStudentMark >= 8 && avgStudentMark < 9) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Sliver.png')}></img> :
                (avgStudentMark >= 5 && avgStudentMark < 8) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Bronze1.png')}></img> : 
                (avgStudentMark > 0 && avgStudentMark < 5) ?  <img width="100%" alt="medal" src={require('../../assets/img/medalrank/bronze.png')}></img> : 
                <img width="100%" alt="medal" src={require('../../assets/img/medalrank/none.png')}></img>}
                  
              </div>
              
        </div>
    </CardBody>
  </Card></>
);
}
const Activities = (props) => {
  const studentId = props.studentId;
  const [student,setStudent] = useState({
    fullName:"",
    grade:"",
    listClass:[],
    subjectStatus:[]
  });

  useEffect(() => {
    const getStudentStudyStatus = async () =>{
        const res = await ClientApi.getStudentStudyInfo(studentId);
        setStudent(res);
        
    }
    getStudentStudyStatus();
    
  }, [studentId]);
  
  const listDataTable = [];
  student.subjectStatus.map((subject,i) => listDataTable.push(
    {
      columns:[

      ],
      rows:[
          {
            id:i+subject
          }
      ]
    }
  ))
  student.subjectStatus.map((subject,i) => 
          subject.examList.map(exam => {
                listDataTable[i].columns.push(
                  {
                    label: exam.examName,
                    field: exam.examId,
                  }
                );
                listDataTable[i].rows.map(ex => ex[exam.examId] = exam.mark)
                return null;
              }
          )
    
  )
    
  return(
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0" style={{fontWeight:"bold"}}>
        Bảng Điểm
      </CardTitle>
    </CardHeader>
    <CardBody>
        {student.subjectStatus.map((subject,i) => 
            <div key={i} style={{marginTop:"5px"}}>
                  <Row>
                        <Col xs="auto" lg="9">
                            <div style={{margin: "0 auto"}}>
                                  <h5 style={{margin: "0 auto",fontWeight:"bold"}}>
                                      {subject.subjectName}
                                  </h5>
                                  <h5 style={{margin: "0 auto"}}>Trung Bình: {subject.avgMark}</h5>
                                  <h5 style={{margin: "0 auto"}}>Hạng: {subject.rank}</h5>
                                  <h5 style={{fontWeight:"bold"}}>Rank: 
                                  {(subject.avgMark >= 9) ? <p style={{color:"red"}}>Vàng (Xuất Sắc)</p> :
                                  (subject.avgMark >= 8 && subject.avgMark < 9) ? <p style={{color:"blue"}}>Bạc (Giỏi)</p> :
                                  (subject.avgMark >= 5 && subject.avgMark < 8) ? <p style={{color:"brown"}}>Đồng (Khá)</p> : 
                                  (subject.avgMark > 0 && subject.avgMark < 5) ?<p style={{color:"brown"}}>Gỗ (Yếu)</p> : 
                                  <p style={{color:"black"}}>Chưa Xếp Hạng</p>}</h5>
                            </div>
                            <MDBDataTableV5 
                              hover 
                              paging={false} 
                              displayEntries={false} 
                              responsive 
                              bordered borderless={false} 
                              key={i}
                              searching={false} 
                              entries={10} 
                              pagesAmount={4} 
                              info={false}
                              data={listDataTable[i]} />
                        </Col>
                        <Col xs="auto" lg="3">
                            <div style={{margin: "0 auto"}}>

                                <div style={{width:"100%",margin: "0 auto"}} >
                                {(subject.avgMark >= 9) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Gold.png')}></img> :
                                (subject.avgMark >= 8 && subject.avgMark < 9) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Sliver.png')}></img> :
                                (subject.avgMark >= 5 && subject.avgMark < 8) ? <img width="100%" alt="medal" src={require('../../assets/img/medalrank/Bronze1.png')}></img> : 
                                (subject.avgMark > 0 && subject.avgMark < 5) ?  <img width="100%" alt="medal" src={require('../../assets/img/medalrank/bronze.png')}></img> : 
                                <img width="100%" alt="medal" src={require('../../assets/img/medalrank/none.png')}></img>}
                                </div>

                            </div>
                        </Col>
                  </Row>
            </div>
        
        )}
    </CardBody>
  </Card>
  );
}
const Comment = (props) => {

  const studentId = props.studentId;

  const [comments,setComments] = useState([]);
  

  useEffect(() => {
    const getAllComent = async () =>{
        const res = await ClientApi.getTopTenStudentComment(studentId);
        setComments(res);
      
    }
    getAllComent();
    
  }, [studentId]);

  return(
    <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0" style={{fontWeight:"bold"}}>
        Nhận xét từ trợ giảng và giáo viên:
      </CardTitle>
    </CardHeader>
    <CardBody>
      
      { (comments.length !== 0) ? comments.map((comment,i) => 
      <div key={i}>
      <Media key={i}>
        <img
          src={(comment.avatarUrl !== null && comment.avatarUrl !== "null") ? (`${process.env.REACT_APP_AVATAR_URL}/${comment.avatarUrl}`) : 
                (comment.facebookUrl !== null && comment.facebookUrl !== "null") ? comment.facebookUrl :
                avatar1 }
          width="36"
          height="36"
          className="rounded-circle mr-2"
          alt=""
        />
        <Media body>
          <strong>{translateRoleToVietnamese(comment.role)} - {comment.fullName}</strong> đã đăng lời nhận xét{" "}
          <br />
          <small className="text-muted">{comment.commentDate}</small>
          <h5 style={{fontWeight:"bold"}} >
            {comment.comment}
          </h5>
        </Media>
      </Media>

      <hr />
      </div>
      ): <h5>Không có lời nhận xét nào</h5>}

    </CardBody>
  </Card>
  )
}


const DailyStatus = (props) => {

  const studentId = props.studentId;

  const [listDailyInfo, setListDailyInfo] = useState([]);


  useEffect(() => {
    const getAllStudentDailyInfo = async () =>{
        const res = await ClientApi.getAllStudentDailyStatus(studentId);
        setListDailyInfo(res);
    }
    getAllStudentDailyInfo();
    
  }, [studentId]);

  const datatable = {
    columns: [
      {
        label: 'Nội dung bài học',
        field: 'lessonName',
        
      },
      {
        label: 'Ngày',
        field: 'lessonDate',
        sort: 'asc',
     
      },
      {
        label: "Điểm danh",
        field: 'attendanceStatus',
        sort: 'asc',
    
      },
      {
        label: "BTVN",
        field: 'homeWorkStatus',
        sort: 'asc',
    
      },
      {
        label: "Video bài giảng",
        field: 'lessonLink',
        sort: 'asc',
    
      }
    ],
    rows: []
  };
  listDailyInfo.reverse();
  listDailyInfo.map(day => datatable.rows.push(
    {
        lessonName: day.lessonName,
        lessonDate: day.lessonDate,
        attendanceStatus: (day.attendanceStatus === "P") ? 
          <Badge color="success" className="mr-1 my-1">
              Đúng giờ
          </Badge> :
          (day.attendanceStatus === "L") ? 
          <Badge color="warning" className="mr-1 my-1">
              Đi muộn
          </Badge> :
          <Badge color="danger" className="mr-1 my-1">
              Nghỉ học
          </Badge>,
        homeWorkStatus: (day.homeWorkStatus === "P") ? 
            <Badge color="success" className="mr-1 my-1">
                Hoàn thành
            </Badge> :
            (day.homeWorkStatus === "none") ?
            <Badge color="warning" className="mr-1 my-1">
                Không có
            </Badge> :
            <Badge color="danger" className="mr-1 my-1">
                Chưa hoàn thành
            </Badge>,
        lessonLink:(day.lessonLink !== "none") ? 
        <a style={{color:"blue",fontWeight:"bolder"}} href={day.lessonLink}>Xem bài giảng</a> : "Không có video"
    }
  ))

  return(
     <Card>
        <CardHeader>
          <CardTitle style={{fontWeight:"bold"}}>Thông tin từng buổi học</CardTitle>
        </CardHeader>
        <CardBody>
            <MDBDataTableV5
                hover 
                responsive
                paging={false}
                searchTop
                searchBottom={false}
                barReverse
                entries={24}
                data={datatable}
            />
        </CardBody>
     </Card>
  )
}
const ClientProfile = (props) =>{ 
  
  const studentId = props.id;
 
  const avatarInputFileRef = useRef(null);

  const [previewAvatarUrl, setPreviewAvatarUrl] = useState();

  const [previewAvatarFile, setPreviewAvatarFile] = useState();

  const [isDisabledSaveButton, setDisabledSaveButton] = useState(false);

  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);

  // const [image, setImage] = React.useState(null); image == previewAvatarUrl

  const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

  // const onSelectFile = (event) => {
	// 	if (event.target.files && event.target.files.length > 0) {
	// 		const reader = new FileReader();
	// 		reader.readAsDataURL(event.target.files[0]);
	// 		reader.addEventListener("load", () => {
	// 			setImage(reader.result);
	// 		});
	// 	}
	// };

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
      const nameImage = await FileApi.uploadUserAvatarImage(imageCroppedFile,studentId);
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
  <Container fluid className="p-0">
    <h1 style={{fontWeight:"bold"}} className="h3 mb-3">Thông tin học sinh </h1>
    
       
   
    <Row>
      <Col md="5" xl="4">
        <StudentProfileDetails 
        previewAvatarUrl={previewAvatarUrl}
        avatarInputFileRef={avatarInputFileRef}
        onChangeAvatarInputFile={onChangeAvatarInputFile}
        studentId={studentId} />
      </Col>
      <Col md="7" xl="8">
        <Activities studentId={studentId} />
      </Col>
    </Row>
    <Row>
      <Col md="5" xl="4">
        <Comment studentId={studentId} />
      </Col>
      <Col md="7" xl="8">
        <DailyStatus studentId={studentId} />
      </Col>
    </Row>
  </Container>
  </>
);
}
// export default ClientProfile;
const mapGlobalStateToProps = state => {
  return {
    fullName: selectFullName(state),
    role: selectRole(state),
    id:selectId(state)
  };
};
export default withRouter(connect(mapGlobalStateToProps)(ClientProfile));

import React, { useState,useEffect } from "react";

import {
  Card,
  CardBody,
  Input,
  Col,
  Button,
  Row,

} from "reactstrap";
import {
  Calendar as CalendarIcon,
  Play as PlayIcon
} from "react-feather";
import ReactPlayer from "react-player";
import ClientApi from "../../api/ClientApi";

const playerWarpper ={
    position: "relative",
    paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */
}
const reactPlayer = {
    position: "absolute",
    top: "0",
    left: "0",
}
const View = (props) => {

    const propsRef = props.location.state;
    const classId = propsRef.classId;
    const grade = propsRef.grade;
    const subjectName = propsRef.subjectName;
    const teacher = propsRef.teacher

    const [chapters, setChapters] = useState([]);
    const [chapterId, setChapterId] = useState(0);
    const [lessons,setLessons] = useState([]);
    const [lesson,setLesson] = useState({});

    useEffect(() => {
        const getAllChapterInGrade = async () =>{
            const res = await ClientApi.getAllChapterInStudentGrade(grade,subjectName);
            setChapters(res);
            if(res.length !== 0){
                setChapterId(res[0].id);
                const listLesson = await ClientApi.getStudentClassesLessonInChapter(classId,res[0].id);
                setLessons(listLesson);
                if(listLesson.length !== 0){
                    setLesson(listLesson[0]);
                }
            }
            
        }
        getAllChapterInGrade();
    }, [grade,subjectName,classId]);

    useEffect(() => {
        const getAllLessonInChapter = async () =>{
            if(chapterId !== 0){
                const listLesson = await ClientApi.getStudentClassesLessonInChapter(classId,chapterId);
                setLessons(listLesson);
                if(listLesson.length !== 0){
                    setLesson(listLesson[0]);
                }
                
            }
        }
        getAllLessonInChapter();
    }, [chapterId,classId]);
    

  return(
    <>
        <Row>
              <Col lg="8">
                {(Object.keys(lesson).length !== 0 ) ? 
                <>
                    <h3 style={{fontWeight:"bold"}}>{lesson.lessonName}</h3>
                    {(lesson.video !== null) ?
                    <div style={playerWarpper}>
                        <ReactPlayer
                        style={reactPlayer}
                        url={lesson.video.link}
                        width='100%'
                        height='100%'
                        controls={true}
                        />
                    </div> : <h2>Không có video</h2> }

                    <div style={{marginTop:"10px"}} className="d-flex justify-content-between flex-wrap" >
                        <div>
                            <h5 style={{fontWeight:"bold"}}>Giáo Viên: {teacher.fullName}</h5>
                            <CalendarIcon></CalendarIcon> {lesson.date}
                        </div>
                        <div>
                            {(lesson.homeWork !== null) ? <a href={lesson.homeWork.link}><Button color="primary">Bài tập về nhà</Button></a> : 
                                null}
                            
                            {(lesson.homeWork !== null ) ?
                            <a href={lesson.homeWork.keyLink}><Button color="primary">Đáp án</Button></a> : null}
                        </div>
                    </div>
                </> : <h2>Chưa có bài học nào</h2> }
              </Col>  
              <Col lg="4">
                  <div  style={{
                    
                    padding: "10px",
                    borderRadius: "10px"
                  }}>
                        <h5 style={{textAlign:"center",color:"black",fontWeight:"bold"}}>DANH SÁCH CHƯƠNG</h5>
                        <Input 
                          bsSize="lg"
                          type="select"
                          name="Category"
                          onChange={ async (e) =>{
                            setChapterId(e.target.value);
                          }}
                        >
                        {chapters.map((chapter,i) => <option key={i} value={chapter.id}>{chapter.chapterName}</option>)}
                          
                        </Input>
                  </div>
                    
                    { (lessons.length !== 0 ) ? lessons.map( (lesson,i) => <Card key={i}>
                        <CardBody>
                            <div className="d-flex justify-content-between ">
                              <div>
                                  <div>
                                      <h6 style={{fontWeight:"bold"}}>Bài {i + 1} {lesson.lessonName}</h6>
                                  </div>
                                  <div>
                                        <CalendarIcon></CalendarIcon> {lesson.date}
                                  </div>
                              </div>
                              <div >
                                    <Button onClick={() => setLesson(lesson)} color="primary" style={{borderRadius:"15px", padding:"10px 27px"}}>
                                          <PlayIcon></PlayIcon>
                                    </Button>
                              </div>
                            </div>
                        </CardBody>
                      
                    </Card>
                    ): <h5>Chưa có bài học nào ở chương này</h5>}
                   
              </Col> 
        </Row>  
    </>
  )
}

const CourseView = (props) =>{ 

  
  
  return(
  <> 
      <View {...props}></View>
     
  </>
    );
}

 

// export default connect(mapGlobalStateToProps, { getAllStudentAction })(Clients);
export default CourseView;
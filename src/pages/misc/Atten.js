import React, { useState, useEffect } from "react";
import {
 Button
} from "reactstrap";
import StudentApi from "../../api/StudentApi";
import AttendanceApi from "../../api/AttendanceApi";
import ClassroomApi from "../../api/ClassroomApi";
import Moment from 'moment';
function format_two_digits(n) {
  return n < 10 ? '0' + n : n;
}

const Atten = (props) => {

  const today = Moment(Date.now()).format('YYYY-MM-DD');
  const studentId = props.match.params.id;
  const [status, setStatus] = useState("Điểm Danh");// state này lưu trạng thái status điểm danh
  const [studentInfo, setStudent] = useState({}); // state này lưu thông tin học sinh
  const [listSuggestClass, setListClass] = useState([]); // state này lưu các lớp của học sinh để điểm danh bù
  const [listSuggestClassForSubAttendance, setSubListClass] = useState([]); // state này lưu các lớp hiện tại cùng kiểu với lớp muốn điểm danh bù
  const [classRightNow, setClassNow] = useState([]); // state này lưu lớp học hiện tại phù hợp để điểm danh chính
  const [isAttened, setAtten] = useState(false); // state handle ẩn hiện khi chưa điểm danh và khi đã điểm danh

  const weeklyToday = new Date().getDay() + 1;

  useEffect(() => {
    const getStudentInfo = async () =>{
        const student = await AttendanceApi.getStudentById(studentId);
        setStudent(student);
    }
    const getClassInPresentToAtten = async () => {
          const clazz = await StudentApi.getClassInPresentStudent(studentId,weeklyToday);
          if(clazz.length === 0){
            const suggestList = await StudentApi.getStudentClasses(studentId);
            setListClass(suggestList);
            setStatus("Điểm Danh Bù ");
          }
          setClassNow(clazz);
    }
    getStudentInfo();
    getClassInPresentToAtten();
    console.log("render");
  }, [studentId,weeklyToday]);
  
  useEffect(() => {
    console.log("rerender atten!");
  });
  // Điểm danh chính
  const submit = async () => {
      var d = new Date();
      const hours = format_two_digits(d.getHours());
      const minutes = format_two_digits(d.getMinutes());
      const seconds = format_two_digits(d.getSeconds());
      const startTime = classRightNow[0].startTime;
      const rightnow = hours + ":" + minutes + ":" + seconds;
      console.log(startTime);
      console.log(rightnow);
      var res = "";
      if(rightnow > startTime){
   
         res = await AttendanceApi.studentAtten(studentId,"L",classRightNow[0].id,today);
      }
      else{

         res = await AttendanceApi.studentAtten(studentId,"P",classRightNow[0].id,today);
      }
    
      if(res === "atten successful!"){
          setStatus("Điểm Danh Thành Công");
          setAtten(!isAttened);
      }
      else{
          alert("Điểm Danh Thất bại!");
      }
      //call api
  }
  // điểm danh bù trường hợp chỉ có 1 lớp thỏa mãn để điểm danh ,{clazz} là clazz chọn để điểm danh
  // Vd: Học sinh nghỉ học 1 lớp Đại 12 
  // Tại thời điểm điểm danh chỉ có 1 lớp Đại 12 thì sẽ điểm danh luôn lớp đó không cần chọn
  const submitCompensate = async(clazz) => {
       // call api find class with same type
      const listClassWithSameType = await ClassroomApi.getListClassroomWithSameTypeNow(weeklyToday,clazz.grade,clazz.subjectName);
      if(listClassWithSameType.length === 0){
          setAtten(!isAttened);
          alert("Đã hết giờ điểm danh!");
      }
      else if(listClassWithSameType.length === 1){
        try {
          const res = await AttendanceApi.studentAttenCompensate(studentId,clazz.id); // điểm danh bù buổi chưa học gần nhất của lớp có id là clazz.id
          const res1 = await AttendanceApi.addToSubAttendanceClass(listClassWithSameType[0].id,studentId);// thêm vào danh sách điểm danh lớp học bù hôm nay
          if(res === "Atten Compensate successful!" && res1 === "Atten Compensate successful!"){
            setStatus("Điểm Danh Bù Thành Công");
            setAtten(!isAttened);
          }else{
            setAtten(!isAttened);
            setSubListClass([]);
            alert("Điểm Danh Thất bại!");
          }
        } catch (error) {
            setAtten(!isAttened);
            setClassNow([]);
            alert("Bạn chưa học lớp này buổi nào! Không thể điểm danh bù");
        }
      }
      else{
          // có nhiều lớp cùng kiểu thì phải chọn
          try {
            const res = await AttendanceApi.studentAttenCompensate(studentId,clazz.id);
            if(res === "Atten Compensate successful!"){
              setAtten(!isAttened);
              setSubListClass(listClassWithSameType);
            }else{
              setAtten(!isAttened);
              setSubListClass([]);
              alert("Điểm Danh Thất bại!");
            }
          } catch (error) {
            setSubListClass([]);
            setAtten(!isAttened);
            alert("Bạn chưa học lớp này buổi nào! Không thể điểm danh bù");
          }
          
      }
  } 
  // điểm danh bù mà có nhiều lớp cùng kiểu để học bù thì phải chọn 1 lớp để học bù
  // Vd: T3 có 2 lớp 12 học Toán Đại
  // Học sinh lớp 12 nghỉ một buổi Đại CN Tuần trước thì điểm danh phải chọn 1 trong 2 lớp trên
  // {selectedClassId} là id lớp đã chọn truyền vào
  const submitAttenCompensateForManyClass = async (selectedClassId) => {
    try {
      const res1 = await AttendanceApi.addToSubAttendanceClass(selectedClassId,studentId);
      if(res1 === "Atten Compensate successful!"){
        setSubListClass([]);
        setStatus("Điểm Danh Bù Thành Công");
      }else{
        setAtten(!isAttened);
        alert("Điểm Danh Thất bại!");
      }
    } catch (error) {
        setAtten(!isAttened);
        alert("Bạn chưa học lớp này buổi nào!");
    }
  }


  return(
    <>
      
      <div className="text-center">
        <h1 className="display-1 font-weight-bold">
            <img style={{width:"50%"}} alt="successful" src={(status === "Điểm Danh" || status === "Điểm Danh Bù "  ) ? require("../../assets/img/icon/check.png"):require("../../assets/img/icon/check2.png") } 
              className="align-middle text-primary" size={24} />
        </h1>
        
        {(classRightNow.length === 1) ? 
              <>
                <h1 className="h2 mb-3">
                  {status} {classRightNow[0].subjectName + " " + classRightNow[0].grade + classRightNow[0].className}
                </h1>
                <p className="h4">{studentInfo.fullName}</p>
                {(isAttened === false) ? 
                    <Button onClick={submit} color="primary" size="lg">
                        Xác Nhận
                    </Button>
                    :
                    null
                }

              </>
              : 
              <>
                <h1 className="h2 mb-3">
                    {status}
                </h1>
                <p className="h4">{studentInfo.fullName}</p>
                {(isAttened === false) ? 
                      <ul style={{listStyle: "none", padding:"0px"}}>
                        {listSuggestClass.map((e,i) =>
                          <li key={i}>
                            <Button onClick={() => submitCompensate(e)} key={i}>{e.subjectName + " " + e.grade + e.className}</Button>
                          </li> 
                        )}
                      </ul>
                      :
                      null
                  }
              </>
        }
        {(listSuggestClassForSubAttendance.length > 1) ?
              <>
                <h1 className="h2 mb-3">
                    Chọn lớp để học bù hôm nay
                </h1>
                <p className="h4">{studentInfo.fullName}</p>
                
                  <ul style={{listStyle: "none", padding:"0px"}}>
                        {listSuggestClassForSubAttendance.map((e,i) =>
                          <li key={i}>
                            <Button onClick={() => submitAttenCompensateForManyClass(e.id)} key={i}>{e.subjectName + " " + e.grade + e.className}</Button>
                          </li> 
                        )}
                  </ul>
                   
            </>
            :
            null
      
      
        }
        
      
          
      
      </div>
      
    </>
  );
}
export default Atten;

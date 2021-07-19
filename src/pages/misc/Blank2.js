import React, { useState } from "react";
import {
 Button
} from "reactstrap";

const Blank2 = (props) => {

  const [status, setStatus] = useState("Điểm Danh");
  

  const submit = () => {
      setStatus("Điểm Danh Thành Công");
      //call api
  }

  return(
    <>
      
      <div className="text-center">
        <h1 className="display-1 font-weight-bold">
            <img style={{width:"50%"}} alt="successful" src={(status === "Điểm Danh") ? require("../../assets/img/icon/check.png"):require("../../assets/img/icon/check2.png") } 
              className="align-middle text-primary" size={24} />
        </h1>
        <h1 className="h2 mb-3">{status} {props.match.params.id}</h1>
        <p className="h4">Nguyễn Đức Thắng</p>
        
      
          <Button onClick={submit} color="primary" size="lg">
            Xác Nhận
          </Button>
      
      </div>
      
    </>
  );
}
export default Blank2;

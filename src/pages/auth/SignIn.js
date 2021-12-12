import React,{ useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  CustomInput,

} from "reactstrap";

import avatar from "../../assets/img/avatars/logo-100.jpg";
import { Formik, FastField, Form } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from "reactstrap-formik";

import LoginApi from "../../api/LoginApi";
import { withRouter } from "react-router-dom";
import storage from "../../Storage/storage";
import { toastr } from "react-redux-toastr";
import { connect } from 'react-redux';
import { setTokenInfo, setUserLoginInfo, setRememberMeInfo } from "../../redux/actions/userLoginInfoActions"
import { selectRememberMe } from "../../redux/selectors/userLoginInfoSelector";

const SignIn = (props) => {

  const showErrorNotification = (title, message) => {
    const options = {
      timeOut: 3000,
      type: "error",
      showCloseButton: false,
      progressBar: false,
      position: "top-right"
    };

    // show notification
    toastr.error(title, message, options);
  }

  const [isRememberMe, setRememberMe] = useState(props.isRememberMe);

  return (
    <React.Fragment>

      <Formik
        initialValues={
          {
            username: '',
            password: ''
          }
        }
        validationSchema={
          Yup.object({
            username: Yup.string()
              .required('bắt buộc'),

            password: Yup.string()
              .required('bắt buộc')
          })
        }
        onSubmit={
          async (values) =>{
            try {
              //call api
              const result = await LoginApi.login(
                values.username,
                values.password
              );
              
              //check user active
              if (result.token === null || result.token === undefined) {
                showErrorNotification("Đăng nhập thất bại", "Sai tài khoản hoặc mật khẩu");  
              } else {
                // set remember me
                storage.setRememberMe(isRememberMe);

                //save token & userInfo to storage
                storage.setToken(result.token);
                const user ={
                  "id":result.id,
                  "firstName": result.firstName,
                  "lastName": result.lastName,
                  "userName": result.userName,
                  "role": result.role,
                  "status": result.status
                }
                storage.setUserInfo(user);

                // save remember me to redux
                props.setRememberMeInfo(isRememberMe);

                //save token & UserInfo to redux
                props.setTokenInfo(result.token);
                props.setUserLoginInfo(user);

                // redirect home page
                if(result.role === "STUDENT"){
                  props.history.push("/profile/info");
                }
                else{
                  props.history.push("/dashboard/default");
                }
                 
              }
            } catch (error) {
              if (error.status === 401) {
                //show error notification
                showErrorNotification("Đăng nhập thất bại", "Sai tài khoản hoặc mật khẩu");
              } else {
                //redirect to page error server
                props.history.push("/auth/500");
              }
            }
          }
        }
      >

      {({ isSubmitting }) => (    
      <Card>
        <CardBody>
          <div className="m-sm-4">
            <div className="text-center">
              <img
                src={avatar}
                alt="Chris Wood"
                className="img-fluid "
                width="264"
                height="132"
              />
            </div>

            <Form>
            {/* username */}
              <FormGroup>
                <FastField
                  label="Tài khoản"
                  bsSize="lg"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  component={ReactstrapInput}
                />
              </FormGroup>

            {/* password */}
              <FormGroup>
                <FastField
                  label="Mật khẩu"
                  bsSize="lg"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  component={ReactstrapInput}
                />
              {/* forgot password */}
                <small>
                  <Link to="/auth/sign-up">Bạn chưa có tài khoản?.Đăng ký học ngay tại đây!</Link>
                </small>
              </FormGroup>

              {/* remember me */}
              <div>
                <CustomInput
                  type="checkbox"
                  id="rememberMe"
                  label="Lưu mật khẩu"
                  checked={isRememberMe || false}
                  onChange={e => setRememberMe(e.target.checked)}
                />
              </div>
              {/* submit */}
              <div className="text-center mt-3">
                <Button type="submit" color="primary"  disabled={isSubmitting}>
                  Đăng Nhập
                </Button>
              </div>
            </Form>
          </div>  
        </CardBody>
      </Card>
      )}
      </Formik>

      
    </React.Fragment>
    
  );
}

const mapGlobalStateToProps = state => {
  return {
    isRememberMe: selectRememberMe(state),
  
  };
};
export default connect( mapGlobalStateToProps, { setTokenInfo, setUserLoginInfo, setRememberMeInfo })(withRouter(SignIn));

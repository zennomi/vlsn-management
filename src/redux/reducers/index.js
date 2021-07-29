import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import userLoginInfo from "./userLoginInfoReducer";
import { reducer as toastr } from "react-redux-toastr";
import student from "../reducers/studentInfoReducer"
export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  userLoginInfo,
  student
});

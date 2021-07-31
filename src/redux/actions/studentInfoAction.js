import * as types from "../constants";

export function getAllStudentAction(listStudents) {
  return {
    type: types.GET_LIST_STUDENTS,
    payload: listStudents
  };
}



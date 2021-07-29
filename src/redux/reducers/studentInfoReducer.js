
import * as types from "../constants";

const initialState = {
   students: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_STUDENTS:
      return {
        ...state,
        students: actions.payload
      };
    default:
      return state;
  }
}

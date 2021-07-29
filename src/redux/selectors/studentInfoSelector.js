import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const studentListInfoSelector = (state) => state.student;

const selectListStudentSelector = createSelector(
    studentListInfoSelector,
    state => state.students);
    
/** function */
export const selectListStudent = (state) => {
    return selectListStudentSelector(state);
}

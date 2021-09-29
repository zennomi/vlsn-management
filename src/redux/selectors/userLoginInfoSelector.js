import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const userLoginInfoSelector = (state) => state.userLoginInfo;

const selectTokenSelector = createSelector(
    userLoginInfoSelector,
    state => state.token);

const selectUserInfoSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo);

const selectUserRoleSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo.role);

const selectUserFirstNameSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo.firstName);

const selectFullNameSelector = createSelector(
    selectUserInfoSelector,
    state => state.lastName + " " + state.firstName);


const selectRememberMeSelector = createSelector(
    userLoginInfoSelector,
    state => state.isRememberMe);
    
/** function */
export const selectToken = (state) => {
    return selectTokenSelector(state);
}
export const selectRole = (state) => {
    return selectUserRoleSelector(state);
}

export const selectUserInfo = (state) => {
    return selectUserInfoSelector(state);
}

export const selectFullName = (state) => {
    return selectFullNameSelector(state);
}
export const selectFistName = (state) => {
    return selectUserFirstNameSelector(state);
}
export const selectRememberMe = (state) => {
    return selectRememberMeSelector(state);
}
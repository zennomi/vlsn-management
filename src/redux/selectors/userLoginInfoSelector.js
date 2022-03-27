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

const selectUserAvatarUrlSelector = createSelector(
    selectUserInfoSelector,
    state => state.avatarUrl);

const selectUserFacebookAvatarUrlSelector = createSelector(
    selectUserInfoSelector,
    state => state.facebookUrl);

const selectUserIdSelector = createSelector(
    selectUserInfoSelector,
    state => state.id);

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
export const selectAvatarUrl = (state) => {
    return selectUserAvatarUrlSelector(state);
}
export const selectFacebookAvatarUrl = (state) => {
    return selectUserFacebookAvatarUrlSelector(state);
}
export const selectId = (state) => {
    return selectUserIdSelector(state);
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
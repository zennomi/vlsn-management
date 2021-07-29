import React from 'react';
import { Redirect } from 'react-router-dom';
import storage from '../Storage/storage';

function withAuth(AuthenticatedComponent, [...roles]) {
    class HOC extends React.Component {
        isAuthenticated = () => {
            return storage.getToken() !== null && storage.getToken() !== undefined;
        }
        render(){
            if(!this.isAuthenticated()){
                return <Redirect to="/auth/sign-in" />
            }else{
                const myRole = {
                    role:storage.getUserInfo().role
                }
                var isExits = false;
                roles.forEach(e => {
                    if(e === myRole.role){
                        isExits = true;
                    }
                    return null;
                })
                if(isExits){
                    console.log(storage.getUserInfo.role);
                    return <AuthenticatedComponent {...this.props}/>
                }else{
                    return <Redirect to="/auth/500" />
                }               
            }
        }
    }
    return HOC;
}

export default withAuth;

import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../shared/contexts/authContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const context = useContext(AuthContext);
    const {authToken} = context; 
    
    return (
        <Route {...rest} 
            render = {props => authToken ? (<Component />): (<Redirect to = '/user/login'/>)}/>
    )
}

export default PrivateRoute;
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './login.css';

import validateFormFields from '../../shared/validate-field';
import AuthContext from '../../shared/contexts/authContext';


export default class Login extends React.Component{

    state = {
        username: '',
        password: '',
        isLoggedin: false,
        isError: false,
        errors:{
            username:'',
            password: '',
            emptyForm:''
        }
    }

    static contextType = AuthContext;

    submitLoginForm = (e) =>{
        e.preventDefault();
        if(this.validateLoginForm(this.state))
        {
            let {setAuthToken} = this.context;
            let userInfo = {
                username: this.state.username,
                password: this.state.password
            }

            axios({
                method: 'post', 
                url: 'https://gentle-bayou-42940.herokuapp.com/signin',
                data: {
                    email: userInfo.username,
                    password: userInfo.password
                }
            })
            .then((response) => {
                 if(response.status === 200){

                    localStorage.setItem('authToken', response.data.token);
                    setAuthToken(response.data.token)
                    this.setState({isLoggedin: true})
                }
                else{
                   this.setState({isError: true})
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({isError: true})
            })

            if(this.state.isLoggedin){
                return <Redirect to = '/'/>
            }
        }
    }

    validateLoginForm = (state) => {

        let valid = true;

        if((this.state.username) && (this.state.password)){
            Object.values(state.errors).forEach((value) => {
                if((value.length && valid))
                {
                    valid = false;
                }
            })
            return valid;
        }
        else{
            let errors = this.state.errors;
            errors.emptyForm = 'Please Complete the Form';
            this.setState({errors : errors})
            return (!valid);
        }
    }

    validateField = (e) => {
        
        let {name, value} = e.target;
        let errors = this.state.errors;

        errors = validateFormFields(name, value, errors);
        this.setState({errors: errors,[name]: value})
    }

    render(){
        return (
            <div className = "ui stackable grid">
                <div className = "row">
                    <div className = "four wide column"></div>
                    <div className = "eight wide column ">
                    <div className = "login-text">
                        <p>Login</p>
                    </div>

                    <div className = "ui segment" >
                        <div className = "ui two column very relaxed stackable grid">
                            <div className = "column ">
                                <form className = "ui form login-form" onSubmit = {this.submitLoginForm}>
                                    <div className = "errorMsg">
                                        {this.state.errors.emptyForm}
                                    </div>
                                    
                                    <div className = "field">
                                        <label>Username</label>
                                        <input  
                                            type = "email"
                                            name = "username"
                                            placeholder = "Enter Username"
                                            onChange = {this.validateField}
                                        />
                                        <div className = "errorMsg">
                                            {this.state.errors.username}
                                        </div>
                                    </div>
                                    <div className = "field">
                                        <label>Password</label>
                                        <input  
                                                type= "password" 
                                                name = "password"
                                            placeholder = "Enter Password"
                                            onChange = {this.validateField}
                                        />
                                        <div className = "errorMsg">
                                            {this.state.errors.password}
                                        </div>
                                    </div>
                                    <div className = "forgot-pass-div">
                                        <p></p>
                                        <p className = "forgot-pass"><Link to = "/">Forgot Password?</Link></p>
                                    </div>
                                    <button type = "submit" 
                                            className = "ui blue button">Login</button>
                                   
                                    <div className = "signup-section">
                                        <p> No Account? <Link to = "/user/signup" >Signup here</Link></p>
                                    </div>
                                </form>
                                
                            </div>
                            <div className = "middle aligned column">
                                <button className="ui google plus button">
                                <i className="google plus icon"></i>
                                    Login with Google
                                </button>
                            </div>
                        </div>
                        <div className = "ui vertical divider">
                            OR
                        </div>
                    </div>
                </div>
                <div className = "four wide column"></div>
            </div>
        </div>  
        )
    }
}

import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './signup.css';
import validateFormFields from '../../shared/validate-field';
import {url} from '../../config/url-config';
import AuthContext from '../../shared/contexts/authContext';

export default class Signup extends React.Component{
    state = {
        name: '',
        email:'',
        password:'',
        confirm_password: '',
        isLoggedin : false,
        isError: false,
        errors:{
            name: '',
            email: '',
            password:'',
            confirm_password: '',
            emptyForm: ''
        }
    }
    
    /*Use Context in class  */
    static contextType = AuthContext;

    submitSignupForm = (e) => {
        e.preventDefault();
        if(this.validateForm(this.state))
        {
            let {setAuthToken} = this.context;
            
            let userInfo = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
            }

            axios({
                method: 'post',
                url: url.dev.user.signup,
                data: {
                    name: userInfo.name,
                    email: userInfo.email,
                    password: userInfo.password
                }
            }).then((response) => {
                if(response.status === 200){

                    localStorage.setItem('authToken', response.data.token);
                    setAuthToken(response.data.token)
                    console.log('done');
                    this.setState({isLoggedin: true})
                }
                else{
                   this.setState({isError: true})
                }
            })
            .catch((error) => {
                console.log('Some Error Occurred on Server. Please Try Again.');
                this.setState({isError: true})
            })

            if(this.state.isLoggedin){
                return <Redirect to = '/'/>
            }
        }
    }

    validateForm = (state) => {
        let valid = true;

        if((state.name) && (state.email) && (state.password) && (state.confirm_password)){
            Object.values(state.errors).forEach((error) => {
                if((error.length && valid)){
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

        errors = validateFormFields(name, value, errors)
        this.setState({errors: errors,[name]:value})
    }

    render(){
        return(
            <div className = "ui stackable grid">
                <div className = "row">
                    <div className = "four wide column"></div>
                    <div className = "eight wide column ">
                       <div className = "signup-text">
                            <p>Signup</p>
                       </div>
                       <div className = "ui segment"> 
                            <div className = "ui two column very relaxed stackable grid">
                                <div className = "column">
                                    <form className = "ui form signup-form" onSubmit = {this.submitSignupForm}>
                                        <div className = "errorMsg">
                                            {this.state.errors.emptyForm}
                                        </div>
                                        <div className = "field">
                                            <label>Full Name</label>
                                            <input name = "name" type = "text" 
                                                placeholder = "Enter Full Name"
                                                onChange = {this.validateField}
                                                />
                                            <div className = "errorMsg">
                                                {this.state.errors.name}
                                            </div>
                                        </div>
            
                                        <div className = "field">
                                            <label>Email</label>
                                            <input name = "email" type = "email" 
                                                placeholder = "Enter email"
                                                onChange = {this.validateField}
                                                />
                                            <div className = "errorMsg">
                                                {this.state.errors.email}
                                            </div>
                                        </div>
                                        

                                        <div className = "field">
                                            <label>Password</label>
                                            <input name = "password" type = "password" 
                                                placeholder = "Enter Password"
                                                onChange = {this.validateField}
                                                />
                                            <div className = "errorMsg">
                                                {this.state.errors.password}
                                            </div>
                                        </div>
                                        
                                        <div className = "field">
                                            <label>Confirm Password</label>
                                            <input name = "confirm_password" type = "password" 
                                                placeholder = "Confirm Password"
                                                onChange = {this.validateField}
                                                />
                                            <div className = "errorMsg">
                                                {this.state.errors.confirm_password}
                                            </div>
                                        </div>
                                        

                                        <button type ="submit" className = "ui blue button">Signup</button>
                        
                                        <div className = "login-section">
                                            <p> Already have an account? <Link to = "/user/login" >Login</Link></p>
                                        </div>
                                    </form>
                                </div>
                                {this.state.isError && <p className = "errorMsg">Account Could not be created !!</p>}
                                <div className = "middle aligned column">
                                    <button className="ui google plus button">
                                    <i className="google plus icon"></i>
                                        Signup with Google
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
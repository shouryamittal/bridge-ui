import React from 'react';
import {Link} from 'react-router-dom';
import './signup.css';
import validateFormFields from '../../shared/validate-field';

export default class Signup extends React.Component{
    state = {
        name: '',
        email:'',
        password:'',
        confirm_password: '',
        errors:{
            name: '',
            email: '',
            password:'',
            confirm_password: '',
            emptyForm: ''
        }
    }

    submitSignupForm = (e) => {
        e.preventDefault();
        if(this.validateForm(this.state))
        {
            let userInfo = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
            }

            this.props.signup(userInfo);
        }
    }

    validateForm = (state) => {
        let valid = true;

        if((state.name) && (state.email) && (state.password) && (state.confirm_password)){
            Object.values(state.errors).forEach((error) => {
                if((error.length && valid)){
                    console.log("I m inside")
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

    validateFields = (e) => {

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
                                                onChange = {this.validateFields}
                                                />
                                            <div className = "errorMsg">
                                                {this.state.errors.name}
                                            </div>
                                        </div>
            
                                        <div className = "field">
                                            <label>Email</label>
                                            <input name = "email" type = "email" 
                                                placeholder = "Enter email"
                                                onChange = {this.validateFields}
                                                />
                                            <div className = "errorMsg">
                                                {this.state.errors.email}
                                            </div>
                                        </div>
                                        

                                        <div className = "field">
                                            <label>Password</label>
                                            <input name = "password" type = "password" 
                                                placeholder = "Enter Password"
                                                onChange = {this.validateFields}
                                                />
                                            <div className = "errorMsg">
                                                {this.state.errors.password}
                                            </div>
                                        </div>
                                        
                                        <div className = "field">
                                            <label>Confirm Password</label>
                                            <input name = "confirm_password" type = "password" 
                                                placeholder = "Confirm Password"
                                                onChange = {this.validateFields}
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
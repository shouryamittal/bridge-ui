import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Header from '../header/header';
import Login from '../login/login';
import Signup from '../signup/signup';

class App extends React.Component{

  login = (userInfo) => {
    console.log(userInfo)
  }

  signup = (userInfo) => {
    console.log(userInfo.name);
  }

  render(){
    return(
      <div >
        <BrowserRouter>
          <div>
            <Header></Header>
          </div>

          <div className = "ui container">
            <div className = "content">
              <Route path = "/user/login" exact 
                render = {(routeProps) => {
                  return <Login {...routeProps} login = {(userInfo) => {
                    this.login(userInfo)}} 
              />}}></Route>

              <Route path = "/user/signup" 
                render = {(routeProps) => {
                  return <Signup {...routeProps} signup = {(userInfo) => {
                    this.signup(userInfo)
                  }}/>
                }}></Route>
            </div>
          </div>
          
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

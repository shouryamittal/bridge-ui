import React from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';
import './App.css';
import Header from '../header/header';
import Login from '../login/login';
import Signup from '../signup/signup';
import Blogs from '../blogs/blogs';

import PrivateRoute from '../../shared/decorators/privateRoutes';
import AuthContext from '../../shared/contexts/authContext';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      authToken: ''
    }
  }

  componentDidMount(){
    if(localStorage.getItem('authToken')){
      let token = localStorage.getItem('authToken');
      this.setState({authToken: token})
    }
  }

  setAuthToken = (data) => {
    this.setState({
      authToken: data
    })
  }

  render(){
    return(
      <div >
        <AuthContext.Provider value = {{authToken: this.state.authToken, 
                                    setAuthToken: this.setAuthToken}}>
          <BrowserRouter>
            <div>
              <Header></Header>
            </div>

            <div className = "ui container">
              <div className = "content">
                <Route path = "/user/login" exact 
                  render = {routeProps => this.state.authToken ? (<Redirect to = '/'/>) : 
                        (<Login {...routeProps} login = {(userInfo) => {
                        this.login(userInfo)}} />)}></Route>

                <Route path = "/user/signup" 
                  render = {routeProps => this.state.authToken ? (<Redirect to = '/'/>): 
                        (<Signup {...routeProps} signup = {(userInfo) => {
                      this.signup(userInfo)
                    }}/>)}>
                </Route>

                <PrivateRoute path = '/content/blogs' component = {Blogs}/>
              </div>
            </div>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    )
  }
}

export default App;

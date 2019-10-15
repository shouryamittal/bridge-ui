import React  from 'react';
import  {Link }  from 'react-router-dom';

import './header.css';

const Header  = () => {
    return (
        <div className="ui top fixed  menu header-nav">
            <div className = "item">
                <p className = "logo">
                    <Link to = "/">Bridge</Link>
                </p>
            </div>
            <div className = "right menu">
                <Link className = "item" to = "/user/login">Login </Link>
                <Link className = "item" to = "/user/signup">Signup</Link>
            </div>
        </div>
    )
}

export default Header;
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    const signInLocation = () => {
        history.push('/login');
    }
    return (
        
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Management Inventory</Link>
                {
                    loggedInUser.success ? <button onClick={()=>setLoggedInUser({})}>Sign Out</button> : <button onClick={signInLocation}>Sign In</button>
                }
                
                

            </nav>

        </div>
    );
};

export default Header;
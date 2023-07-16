import React from 'react'
import { Link } from "react-router-dom";
import auth from '../../../api/auth/auth-session-helpers';
import {signout} from './../../../api/auth/authLoginApi'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function TopNavBar() {
  const handlelogout = values => signout().then((data)=>{
    if(data.message){
        auth.clearJWT()
        window.location.reload(false);
        toast.success("Logout Successfull")
    }
})
    return (
        <div className="top_nav">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="top_nav_left">free shipping on all orders over Rs.500</div>
                </div>
                <div className="col-md-6 text-right">
                  <div className="top_nav_right">
                    <ul className="top_nav_menu">
                    
                      <li className="currency">
                        <a href="#">
                          rupee
                          <i className="fa fa-angle-down"></i>
                        </a>
                        <ul className="currency_selection">
                          <li><a href="#">cad</a></li>
                          <li><a href="#">aud</a></li>
                          <li><a href="#">eur</a></li>
                          <li><a href="#">gbp</a></li>
                        </ul>
                      </li>
                      <li className="language">
                        <a href="#">
                          English
                          <i className="fa fa-angle-down"></i>
                        </a>
                        <ul className="language_selection">
                          <li><a href="#">French</a></li>
                          <li><a href="#">Italian</a></li>
                          <li><a href="#">German</a></li>
                          <li><a href="#">Spanish</a></li>
                        </ul>
                      </li>
                      <li className="account">
                        <a href="#">
                          My Account
                          {!auth.isAuthenticated()&&(<i className="fa fa-angle-down"></i>)}
                        </a>
                        <ul className="account_selection">
                          {
                            auth.isAuthenticated()&&(
                              <>
                              <Link to={"/profile/"+auth.isAuthenticated().userData.uid}>
                                <li><a href="#"><i className="fa fa-user" aria-hidden="true"></i>Profile</a></li>
                              </Link>
                              <li onClick={handlelogout}><a href="#"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</a></li>
                              </>
                            )
                          }
                          {
                            !auth.isAuthenticated()&&(
                              <>
                                <Link to="/login">
                                  <li><a href="#"><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
                                </Link>
                                <Link to="/login">
                                  <li><a href="#"><i className="fa fa-user-plus" aria-hidden="true"></i>Register</a></li>
                                </Link>
                              </>
                            )
                          }
                         
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

export default TopNavBar

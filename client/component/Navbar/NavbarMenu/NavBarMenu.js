import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {CartContext} from './../../Context/CartContext'
import auth from '../../../api/auth/auth-session-helpers'
function NavBarMenu() {
  const {itemCount} = useContext(CartContext);
    return (
        <div className="main_nav_container">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-right">
                  <div className="logo_container">
                    <a href="/"><img src="/dist/assets/images/logo.png" className="logo"></img>Laxmi<span>Saree Stores</span></a>
                  </div>
                  <nav className="navbar">
                    <ul className="navbar_menu">
                      <Link to="/">
                        <li><a href="">home</a></li>
                      </Link>
                      
                      <Link to="/product">
                        <li><a href="#">shop</a></li>
                      </Link>
                      
                      <li><a href="#">pages</a></li>
                      <li><a href="#">blog</a></li>
                      <li><a href="#">contact</a></li>
                    </ul>
                    <ul className="navbar_user">
                
                      {/* <Link to={auth.isAuthenticated()?'':"/login"}>
                        <li><a href="#"><i className="fa fa-user" aria-hidden="true"></i></a></li>
                      </Link> */}
                     
                      <li className="checkout">
                        <Link to="/cart">
                          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                          <span id="checkout_items" className="checkout_items">{itemCount}</span>
                        </Link>
                      </li>
                    </ul>
                    <div className="hamburger_container">
                      <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
    )
}

export default NavBarMenu

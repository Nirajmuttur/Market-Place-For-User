import React from 'react'
import Home from './component/Home/Home'
import { withRouter } from 'react-router-dom'
import { Route,Switch } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Login from './component/Login/Login'
import Listing from './component/ProductListing/Listing'
import TopNavBar from './component/Navbar/TopNavBar/TopNavBar'
import NavBarMenu from './component/Navbar/NavbarMenu/NavBarMenu'
import Cart from './component/Cart/Cart'
import ProductDetail from './component/ProductDetail/ProductDetail'
import Profile from './component/Profile/Proile'
import Footer from './component/Footer/Footer'

const MainRouter=withRouter(({location})=>{
    return(
        <>
        <header className="header trans_300">
        {location.pathname!='/login' &&location.pathname!='/profile/:id' && (<TopNavBar/>)}
        {location.pathname!='/login'&&location.pathname!='/profile/:id' && (<NavBarMenu/>)}
            
        </header>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/product" component={Listing}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/productDetail/:id" component={ProductDetail}/>
            <Route path="/profile/:id" component={Profile}/>
        </Switch>
        
        </>
    )
    }) 
    
    export default MainRouter

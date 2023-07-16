import React,{Component} from 'react'
import {Route,Redirect} from 'react-router-dom'
import auth from './api/auth/auth-session-helpers'

const PrivateRoutes = ({component:Component, ...rest})=>{
    return(
        <Route {...rest} render={props=>(
                auth.isAuthenticated()?(<Component{...props}/>) : (<Redirect to={{
                    pathname:"/login",
                    state:{from:props.location}
                }}/>)
            )}/>
    )
     
}
export default PrivateRoutes

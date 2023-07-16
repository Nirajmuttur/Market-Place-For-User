import React,{useState} from 'react'
import './Login.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {Link, Redirect, withRouter} from 'react-router-dom';
import {Dialog,DialogActions,DialogTitle,DialogContent,Button,DialogContentText} from '@material-ui/core'
import auth from '../../api/auth/auth-session-helpers';
import {create} from './../../api/userApi'
import {sigin} from './../../api/auth/authLoginApi'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const initialValues={
    name:'',
    email:'',
    password:''
}

const validationSchema = Yup.object({
    email:Yup.string().email('Invalid Format').required('Required'),
    password:Yup.string().required('Required')
})


function Login(props) {
    const [login, setLogin] = useState({
        toggle:false,
        open:false,
        error:'',
        redirectToReferrer:false
    });

    const loginToSignUp = () =>setLogin({toggle: !(login.toggle)});
    const dialogClose =()=>setLogin({open:!(login.open)})

    const onSubmit = values=>(login.toggle ? create(values).then((data)=>{
        if(data.error){
            setLogin({error:data.error})
        }else{
            setLogin({error:'',open:true,redirectToReferrer:false})
            toast.success(data.message)
        }
    }):sigin(values).then((data)=>{
        if(data.error){
            setLogin({...login,error:data.error})
        }else{
            auth.authenticate(data,()=>{
                setLogin({...login,error:'',redirectToReferrer:true})
                toast.success(data.message)
            })
        }
    }));

    const {from}=props.location.state || {
        from:{
            pathname:'/'
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
      });
    // const {redirectToReferrer}=login    
    if(login.redirectToReferrer){
        return(
            <>
                <Redirect to={from} />
            </>
        )
    }else{
        return (
            <>
            <div className="form-container">
                 <div className='form-content-left'>
                     <img className='form-img' src="/dist/assets/images/logo.png" alt='spaceship' />
                 </div>
                 <div className="form-content-right">
                     {login.toggle ? <form onSubmit={formik.handleSubmit} className='form'>
                         <h1>
                         Register
                         </h1>
                         <div className='form-inputs'>
                             <label className='form-label' htmlFor="name" >Name</label>
                             <input type="text" id="name" name="name" className='form-input' {...formik.getFieldProps('name')} required></input>
                             {formik.touched.name && formik.errors.name ? (
                             <div className='error'>{formik.errors.name}</div>
                             ) : null}
                         </div>
                         <div className="form-inputs">
                             <label className='form-label' htmlFor="email">Email</label>
                             <input type="text" id="email" name="email" className='form-input' {...formik.getFieldProps('email')}></input>
                             {formik.touched.email && formik.errors.email ? (
                             <div className='error'>{formik.errors.email}</div>
                             ) : null}
                         </div>
                         <div className="form-inputs">
                             <label className='form-label' htmlFor="password">Password</label>
                             <input type="password" id="password" name="password" className='form-input' {...formik.getFieldProps('password')}></input>
                             {formik.touched.password && formik.errors.password ? (
                             <div className='error'>{formik.errors.password}</div>
                             ) : null}
                         </div>
                         <button className='form-input-btn' type='submit'>
                             Sign Up
                         </button>
                         {login.error && (<span className="error">{login.error}</span>)}
                     </form> : 
                     <form onSubmit={formik.handleSubmit} className='form'>
                         <h1>
                         Login
                         </h1>
                         <div className="form-inputs">
                             <label className='form-label' htmlFor="email">Email</label>
                             <input type="text" id="email" name="email" className='form-input' {...formik.getFieldProps('email')}></input>
                             {formik.touched.email && formik.errors.email ? (
                             <div className='error'>{formik.errors.email}</div>
                             ) : null}
                         </div>
                         <div className="form-inputs">
                             <label className='form-label' htmlFor="password">Password</label>
                             <input type="password" id="password" name="password" className='form-input' {...formik.getFieldProps('password')}></input>
                             {formik.touched.password && formik.errors.password ? (
                             <div className='error'>{formik.errors.password}</div>
                             ) : null}
                         </div>
                         <button className='form-input-btn' type='submit'>
                             Sign In
                         </button>
                         {login.error && (<span className="error">{login.error}</span>)}
                         
                     </form>}
                     
                 </div>
                 <div className="form-content-right2">
                     <span className="form-input-login">
                             Already have an account? Login <button onClick={loginToSignUp}>here</button>
                     </span>
                 </div>
            </div>
            
            
            </>
             
         );
    }

    
    
}

export default Login;

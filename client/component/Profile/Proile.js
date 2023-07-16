import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import auth from './../../api/auth/auth-session-helpers'
import {Avatar,ListItem,ListItemAvatar,ListItemText,List,Switch,FormControlLabel,TextField} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import './Profile.css'
import { getUserDeatils } from '../../api/userApi'
import Footer from '../Footer/Footer'

const validationSchema = Yup.object({
    name:Yup.string().required('Required'),
    email:Yup.string().email('Invalid Format').required('Required'),
})

function Profile({match}) {
    const [user,setUser] = useState({
      name: '',
      email: '',
      password: '',
      phone:'',
      city:'',
      pincode:'',
      address:'',
      error: ''
    })
    const [show,setShow] =useState(true)
    const [updateAddressShow, setupdateAddressShow] = useState(true)
    const [redirectToLogin, setRedirectToLogin] = useState(false)
    const [toggle,setToggle]=useState({
        personal:true,
        billing:false,
        payment:false,
        changePass:false,
    })
    const updateShow=()=>setShow(!show)
    const updateAddress=()=>setupdateAddressShow(!updateAddressShow)
    const displayPersonal = ()=>{
        setToggle({
            personal:true,
            billing:false,
            payment:false,
            changePass:false,
        })
    }

    const displayBilling = () =>{
        setToggle({
            personal:false,
            billing:true,
            payment:false,
            changePass:false,
        })
    }

    const displayPayment = ()=>{
        setToggle({
            personal:false,
            billing:false,
            payment:true,
            changePass:false,
        })
    }

    const displayChangePass = ()=>{
        setToggle({
            personal:false,
            billing:false,
            payment:false,
            changePass:true,
        })
    }
    const jwt = auth.isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
       
        getUserDeatils({t:jwt.token},signal).then((data)=>{
            if(data.error){
                setUser({...user,error:data.error})
            }else{
                setUser({...user,name:data[0].name,email:data[0].email,phone:data[0].phone,address:data[0].address,city:data[0].city,pincode:data[0].pincode})
            }
        })
    }, [match.params.id])

    const onSubmit=values=>{
            if(toggle.personal){
                console.log(values)
            }
            if(toggle.billing){
                console.log(values)
            }
            if(toggle.changePass){
                console.log(values)
            }
    }

    const initialValues={
        name:user.name ,
        email:user.email ,
        seller:user.seller
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
            
    });

    if(redirectToLogin){
        return (
            <Redirect to='/login' />
        )
    }else{
        return (
           <>
                <div className="profile">
                        <div className="profile-content-left">
                            <h1 className="profile-text">My Profile</h1>
                            <List className="profile-avatar">
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} secondary={user.email} className="info"/>
                                </ListItem>
                            </List>
                            <ul className="profile-links">
                                <button className="profile-links-item" onClick={displayPersonal}>Personal Details</button>
                                <button className="profile-links-item" onClick={displayBilling}>Billing Address</button>
                                <button className="profile-links-item" onClick={displayPayment}>Payment Methods</button>
                                <button className="profile-links-item" onClick={displayChangePass}>Change Password</button>
                            </ul>
                        </div>
                        <div className="profile-content-right">
                            {toggle.personal ? show ? 
                            (<>
                            <div className="readOnly">
                            <TextField
                                id="filled-read-only-input"
                                label="Name"
                                readOnly
                                value={user.name}
                                variant="filled"
                                />
                                <br/>
                                <TextField
                                id="filled-read-only-input"
                                label="Email"
                                readOnly
                                value={user.email}
                                variant="filled"
                                />
                                <button className='read-only-btn' onClick={updateShow}>Edit Profile</button>
                                
                            </div>
                            </>
                            ): 
                            <form onSubmit={formik.handleSubmit} className='form'>
                                <h1 className="heading">Personal Details</h1>
                                <div className='form-inputs'>
                                    <label className='form-label form-label2' htmlFor="name" >Name</label>
                                    <input type="text" id="name" name="name" className='form-input' value={formik.values.name} onChange={formik.handleChange} ></input>
                                    {formik.touched.name && formik.errors.name ? (
                                    <div className='error'>{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="form-inputs">
                                    <label className='form-label form-label2' htmlFor="email">Email</label>
                                    <input type="text" id="email" name="email" className='form-input' value={formik.values.email} onChange={formik.handleChange} ></input>
                                    {formik.touched.email && formik.errors.email ? (
                                    <div className='error'>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-inputs">
                                <input type="checkbox" id="seller" name="seller" onChange={formik.handleChange}></input>
                                </div>
                                
                                <button className='form-input-btn' type='submit'>
                                    Update Details
                                </button>
                                <button className='form-input-btn' onClick={updateShow}>Back</button>
                                {user.error ? <span className="error">{user.error}</span> : ''}
                            </form> : toggle.billing? updateAddressShow?
                            (<>
                                <div className="readOnly">
                                <TextField
                                    id="filled-read-only-input"
                                    label="City"
                                    readOnly
                                    value={user.city}
                                    variant="filled"
                                    />
                                    <br/>
                                    <TextField
                                    id="filled-read-only-input"
                                    label="Address"
                                    readOnly
                                    value={user.address}
                                    variant="filled"
                                    />
                                    <br/>
                                    <TextField
                                    id="filled-read-only-input"
                                    label="Phone"
                                    readOnly
                                    value={user.phone}
                                    variant="filled"
                                    />
                                    <br/>
                                    <TextField
                                    id="filled-read-only-input"
                                    label="Pincode"
                                    readOnly
                                    value={user.pincode}
                                    variant="filled"
                                    />
                                    <button className='read-only-btn' onClick={updateAddress}>Edit Address</button>
                                    
                                </div>
                                </>
                                ):<form onSubmit={formik.handleSubmit} className='form'>
                                <h1 className="heading">Billing Address</h1>
                                <div className='form-inputs'>
                                    <label className='form-label form-label2' htmlFor="city" >City</label>
                                    <input type="text" id="city" name="city" className='form-input' value={formik.values.city} onChange={formik.handleChange} ></input>
                                    {formik.touched.city && formik.errors.city ? (
                                    <div className='error'>{formik.errors.city}</div>
                                    ) : null}
                                </div>
                                <div className="form-inputs">
                                    <label className='form-label form-label2' htmlFor="address">Address</label>
                                    <input type="text" id="address" name="address" className='form-input' value={formik.values.address} onChange={formik.handleChange} ></input>
                                    {formik.touched.address && formik.errors.address ? (
                                    <div className='error'>{formik.errors.address}</div>
                                    ) : null}
                                </div>
                                <div className="form-inputs">
                                    <label className='form-label form-label2' htmlFor="phone">Phone</label>
                                    <input type="text" id="phone" name="phone" className='form-input' value={formik.values.phone} onChange={formik.handleChange} ></input>
                                    {formik.touched.phone && formik.errors.phone ? (
                                    <div className='error'>{formik.errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="form-inputs">
                                    <label className='form-label form-label2' htmlFor="pincode">Pincode</label>
                                    <input type="text" id="pincode" name="pincode" className='form-input' value={formik.values.pincode} onChange={formik.handleChange} ></input>
                                    {formik.touched.pincode && formik.errors.pincode ? (
                                    <div className='error'>{formik.errors.pincode}</div>
                                    ) : null}
                                </div>
                                <button className='form-input-btn' type='submit'>
                                    Update Details
                                </button>
                                <button className='form-input-btn' onClick={updateAddress}>Back</button>
                                {user.error ? <span className="error">{user.error}</span> : ''}
                            </form> : toggle.payment? <h1>Payment</h1> : toggle.changePass? (<>
                                <form onSubmit={formik.handleSubmit} className='form'>
                                <h1 className="heading">Billing Address</h1>
                                <div className="form-inputs">
                                    <label className='form-label form-label2' htmlFor="password">Enter Password</label>
                                    <input type="text" id="password" name="password" className='form-input' value={formik.values.password} onChange={formik.handleChange} ></input>
                                    {formik.touched.password && formik.errors.password ? (
                                    <div className='error'>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="form-inputs">
                                    <label className='form-label form-label2' htmlFor="cpassword">Confirm Password</label>
                                    <input type="password" id="cpassword" name="cpassword" className='form-input' value={formik.values.cpassword} onChange={formik.handleChange} ></input>
                                    {formik.touched.cpassword && formik.errors.cpassword ? (
                                    <div className='error'>{formik.errors.cpassword}</div>
                                    ) : null}
                                </div>
                                <button className='form-input-btn' type='submit'>
                                    Update Password
                                </button>
                                </form>
                                    </>
                                    ):<div></div>}
                        </div>
                </div>
                <Footer/>
           </>
        )
    }

    
}

export default Profile

import React,{useContext,useState,useEffect} from 'react'
import {CartContext} from './../Context/CartContext'
import CartProducts from './CartProducts';
import { Link } from 'react-router-dom';
import auth from './../../api/auth/auth-session-helpers'
import {Redirect} from 'react-router-dom';
import {addAddress, getAddress} from './../../api/userApi'
import './Cart.css'
import {Button, TextField} from '@material-ui/core'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create,order } from '../../api/orderApi';
toast.configure()

function Cart() {
    const [open,setopen] = useState(false)
    const [payment, setpayment] = useState(false)
    const [paymentData, setpaymentData] = useState({
        payment_id:'',
        order_id:'',
        signature:''
    })
    const [redirect, setredirect] = useState(false)
    const [address, setaddress] = useState(false)
    const [data, setdata] = useState({
        city:'',
        address:'',
        pincode:'',
        phone:'',

    })
    const { total, cartItems, itemCount, clearCart,handleCheck } = useContext(CartContext);
    const handleCheckout=()=>{
        if(auth.isAuthenticated()){
            if(address){
                create({t:jwt.token},cartItems).then((data)=>{
                    console.log(data)
                    // if(data.status!==200){
                    //     return 
                    // }
                    const options = {
                        "key": "rzp_test_klmqPfrM8vWHTj", // Enter the Key ID generated from the Dashboard
                        "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        "currency": data.currency,
                        "name": "Laxmi Saree stores",
                        "description": data.notes,
                        "image": './dist/assets/images/logo.png',
                        "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                        "handler": function (response){
                            setpaymentData({...paymentData,payment_id:response.razorpay_payment_id,order_id:response.razorpay_order_id,signature:response.razorpay_signature})
                            setpayment(true)
                            handleOrder()
                            // order({t:jwt.token},paymentData).then((data)=>{
                            //     if(data.message){
                            //         clearCart
                            //         console.log(data.message)
                            //     }else{
                            //         console.log(data.error)
                            //     }
                            // })
                        },
                        "prefill": {
                            "name": "nirajmuttur",
                            "email": "nirajmuttur3@gmail.com",
                            "contact": "9999999999"
                        },
                        "notes": {
                            "address": "Razorpay Corporate Office"
                        },
                        "theme": {
                            "color": "#3399cc"
                        }
                    };
                    var rzp1 = new Razorpay(options);
                    rzp1.open()
                    rzp1.on('payment.failed', function (response){
                            alert(response.error.code);
                            alert(response.error.description);
                            alert(response.error.source);
                            alert(response.error.step);
                            alert(response.error.reason);
                            alert(response.error.metadata.order_id);
                            alert(response.error.metadata.payment_id);
                    });
                    if(payment){
                        // handleCheck
                        // order({t:jwt.token},paymentData).then((data)=>{
                        //     if(data.message){
                        //         clearCart
                        //         console.log(data.message)
                        //     }else{
                        //         console.log(data.error)
                        //     }
                        // })
                    }
                })
                if(payment){
                    // handleCheck
                    order({t:jwt.token},paymentData).then((data)=>{
                        if(data.message){
                            clearCart
                            console.log(data.message)
                        }else{
                            console.log(data.error)
                        }
                    })
                }
            }else{
                setopen(true)
            }
        }else{
            setredirect(true)
        }
    }

    const handleOrder=()=>{
        order({t:jwt.token},paymentData).then((data)=>{
            if(data.message){
                clearCart
                console.log(data.message)
            }else{
                console.log(data.error)
            }
        })
    }

    const handleChange=name=>event=>{
        const value= event.target.value
        setdata({...data,[name]:value})
    }
    const jwt=auth.isAuthenticated()
    useEffect(() => {
        const abortController =new AbortController()
        const signal=abortController.signal
        
        if(auth.isAuthenticated()){
            getAddress({t:jwt.token},signal).then((data)=>{
                if(data.length===0){
                    setaddress(false)
                }else{
                    setaddress(true)
                    setdata(data)
                }
            })
            return function cleanup(){
                abortController.abort()
            }
        }
        
    }, [address])
    const handleSubmit=()=>{
        let addressData=new FormData()
        data.city&&addressData.append('city',data.city)
        data.address&&addressData.append('address',data.address)
        data.phone&&addressData.append('phone',data.phone)
        data.pincode&&addressData.append('pincode',data.pincode)
        addAddress({t:jwt.token},addressData).then((data)=>{
            if(data.error){
                toast.error('Error adding address')
            }else{
                toast.success('Address updated')
                setaddress(true)
                handleClose()
            }
        })
    }
    const handleOpen=()=>setopen(true)
    const handleClose=()=>setopen(false)
    if(redirect){
        return(
            <>
                <Redirect push to="/login" />
            </>
        )
    }else{
        return (
            <>
            <main className="container ">
                 <div className="row no-gutters justify-content-center">
                        <div className="col-sm-9 p-3 cartitem">
                            {
                                cartItems.length > 0 ?
                                <CartProducts/> :
                                <div className="p-3 text-center text-muted">
                                    Your cart is empty
                                </div>
                            }
    
                            { payment && 
                                <div className="p-3 text-center text-success">
                                    <p>Payment successfull</p>
                                    <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                                </div>
                            }
                        </div>
                        {
                            cartItems.length > 0 && 
                            <div className="col-sm-3 p-3 cartitem2">
                                <div className="card card-body">
                                    <p className="mb-1">Total Items</p>
                                    <h4 className=" mb-3 txt-right">{itemCount}</h4>
                                    <p className="mb-1">Total Payment</p>
                                    <h3 className="m-0 txt-right">{total}</h3>
                                    <hr className="my-4"/>
                                    <div className="text-center">
                                        <button type="button" className="btn btn-dark mb-2 checkout2" onClick={handleCheckout}>CHECKOUT</button>
                                        <button type="button" className="btn btn-light btn-sm clear" onClick={clearCart}>CLEAR</button>
                                    </div>
    
                                </div>
                            </div>
                        }
                        
                    </div>
            </main>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Address</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label="City"
                        type="text"
                        fullWidth
                        onChange={handleChange('city')}
                    />
                     <TextField
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        onChange={handleChange('address')}
                    />
                    <TextField
                        
                        margin="dense"
                        id="phone"
                        label="Mobile No"
                        type="number"
                        fullWidth
                        onChange={handleChange('phone')}
                    />
                    <TextField
                        
                        margin="dense"
                        id="price"
                        label="pincode"
                        type="Pincode"
                        fullWidth
                        onChange={handleChange('pincode')}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
    
}

export default Cart

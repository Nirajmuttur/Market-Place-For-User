import React, { useContext } from 'react';
import { CartContext } from './../Context/CartContext';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import auth from './../../api/auth/auth-session-helpers'
import {increaseQuantity,decreaseQuantity,removeCartItem} from './../../api/cartApi'
const CartItem = ({product}) => {

    const { increase, decrease, removeProduct } = useContext(CartContext);

    const handleIncrease=(product)=>{
        increase(product)
        if(auth.isAuthenticated()){
            const jwt=auth.isAuthenticated()
            increaseQuantity({t:jwt.token},{id:product.id}).then((data)=>{
                if(data.message){
                    console.log("success")
                }else{
                    console.log("error")
                }
            })
        }
    }

    const handleDecrease=(product)=>{
        decrease(product)
        if(auth.isAuthenticated()){
            const jwt=auth.isAuthenticated()
            decreaseQuantity({t:jwt.token},{id:product.id}).then((data)=>{
                if(data.message){
                    console.log("success")
                }else{
                    console.log("error")
                }
            })
        }
    }

    const handleRemove=(product)=>{
        removeProduct(product)
        if(auth.isAuthenticated()){
            const jwt=auth.isAuthenticated()
            removeCartItem({t:jwt.token},{id:product.id}).then((data)=>{
                if(data.message){
                    console.log("success")
                }else{
                    console.log("error")
                }
            })
        }
    }

    return ( 
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2">
                <img
                alt={product.name}
                style={{margin: "0 auto", maxHeight: "100px"}} 
                src={"http://localhost:3001/dist/uploads/"+product.image1} className="img-fluid d-block"/>
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">{product.name}</h5>
                <p className="mb-1">Price: {product.price} </p>
                
            </div>
            <div className="col-sm-2 p-2 text-center ">
                 <p className="mb-0">Qty: {product.quantity}</p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                 <button 
                 onClick={() => handleIncrease(product)}
                 className="btn btn-primary btn-sm mr-2 mb-1">
                     <AddCircleIcon width={"20px"}/>
                 </button>

                 {
                     product.quantity > 1 &&
                     <button
                    onClick={() => handleDecrease(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <RemoveIcon width={"20px"}/>
                    </button>
                 }

                {
                     product.quantity === 1 &&
                     <button
                    onClick={() => handleRemove(product)}
                    className="btn btn-danger btn-sm mb-1">
                        <DeleteIcon width={"20px"}/>
                    </button>
                 }
                 
            </div>
        </div>
     );
}
 
export default CartItem;
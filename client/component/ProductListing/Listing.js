import React,{useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { ProductsContext } from '../Context/ProductContext'
import { CartContext } from '../Context/CartContext'
import './Listing.css'
import {create,increaseQuantity} from './../../api/cartApi'
import auth from '../../api/auth/auth-session-helpers'

function Listing() {
    const { products} = useContext(ProductsContext)
    const { addProduct, cartItems, increase } = useContext(CartContext);

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    const handleCart=(product)=>{
        addProduct(product)
        if(auth.isAuthenticated()){
            const jwt=auth.isAuthenticated()
            let cartData=new FormData()
            cartData.append('product_id',product.id)
            create({t:jwt.token},cartData).then((data)=>{
                if(data.message){
                    console.log("success")
                }else{
                    console.log("error")
                }
            })
        }
    }

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

    return (
        <div id="product2">
               {
                   products.map(product =>(
                      
                       <div className="card2" key={product.id}>
                           <Link to={"/productDetail/"+product.id}>
                               <img src={"http://localhost:3001/dist/uploads/"+product.image1} alt=""/>
                           </Link>
                           <div className="content2">
                               <h3>
                                   <Link to={"/productDetail/"+product.id}>{product.name}</Link>
                               </h3>
                               <span>${product.price}</span>
                               <p>{product.description}</p>
                               {
                                   isInCart(product) && 
                                   <button 
                                   onClick={()=>handleIncrease(product)}
                                   className="btn btn-outline-primary btn-sm">Add more</button>
                               }
                               {
                                    !isInCart(product) && 
                                    <button 
                                    onClick={()=>handleCart(product)}
                                    className="btn btn-primary btn-sm">Add to cart</button>
                                }
                               {/* <button onClick={()=> addCart(product._id)}>Add to cart</button> */}
                           </div>
                       </div>
                   ))
               }
            </div>
    )
}

export default Listing

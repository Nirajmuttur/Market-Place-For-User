import React, { useContext } from 'react';
import { CartContext } from './../Context/CartContext';

import CartItem from './CartItem';
// import styles from './CartProducts.module.scss';

const CartProducts = () => {

    const { cartItems } = useContext(CartContext);

    return ( 
        <div className="container">
            <div className="card card-body border-0">

                {
                    cartItems.map(product =>  <CartItem key={product.id} product={product}/>)
                }

            </div>
        </div>

     );
}
 
export default CartProducts;
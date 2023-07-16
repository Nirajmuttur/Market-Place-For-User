import React, { createContext, useState,useEffect } from 'react';
import {productList} from './../../api/productApi'
export const ProductsContext = createContext()

const ProductsContextProvider = ({children}) => {
    const [products,setproducts] = useState([]);
    useEffect(() => {
        const abortController =new AbortController()
        const signal=abortController.signal
        productList(signal).then((data)=>{
            if(data.error){
                console.log(data.error)
              }else{
                setproducts(data)
              }
        })
        return function cleanup(){
            abortController.abort()
          }
    },[])

    
    return ( 
        <ProductsContext.Provider value={{products}} >
            { children }
        </ProductsContext.Provider>
     );
}
 
export default ProductsContextProvider;
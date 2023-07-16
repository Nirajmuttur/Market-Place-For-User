import React from "react"
import { BrowserRouter } from "react-router-dom"
import CartContextProvider from "./component/Context/CartContext"
import ProductsContextProvider from "./component/Context/ProductContext"
import MainRouter from "./MainRouter"


function App() {
  return (
    <BrowserRouter>
      {/* <ProductsContextProvider> */}
        {/* <CartContextProvider> */}
          <MainRouter/>
        {/* </CartContextProvider> */}
      {/* </ProductsContextProvider> */}
    </BrowserRouter>
    
  )
}

export default App

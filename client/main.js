import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import CartContextProvider from './component/Context/CartContext';
import ProductsContextProvider from './component/Context/ProductContext';

ReactDOM.render(
  <ProductsContextProvider>
     <CartContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </CartContextProvider>
  </ProductsContextProvider>,
 
    
    document.getElementById('root')
  );
  
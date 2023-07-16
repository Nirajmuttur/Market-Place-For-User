import React from 'react'
import product from './../../dummyData'
import './NewArrival.css'
function NewArrivals() {
    return (
        <div className="new_arrivals">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title new_arrivals_title">
                  <h2>New Arrivals</h2>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col">
                <div className="product-grid" data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'>
                {product.map(p=>(
                  <div className="product-item men" key={p.id}>
                    <div className="product discount product_filter">
                      <div className="product_image">
                        <img src={p.thumb} alt="" />
                      </div>
                      <div className="favorite favorite_left"></div>
                      <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                      <div className="product_info">
                        <h6 className="product_name"><a href="#">{p.product_name}</a></h6>
                        <div className="product_price">{p.price}<span>{p.price}</span></div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default NewArrivals

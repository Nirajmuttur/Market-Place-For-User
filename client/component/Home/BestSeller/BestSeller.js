import React from 'react'
import products from './../../../dummyData'
function BestSeller() {
    return (
        <div className="best_sellers">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title new_arrivals_title">
                  <h2>Best Sellers</h2>
                </div>
              </div>
            </div>
            <div className="container text-center my-3">
    <div className="row mx-auto my-auto">
        <div id="myCarousel" className="carousel slide w-100" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
                <div className="carousel-item py-5 active">
                    <div className="row">
                      {
                        products.slice(0,4).map(p=>(
                          <div className="col-sm-3" key={p.id}>
                            <div className="card">
                              <div className="card-body">
                                <div className="product_image">
                                  <img src={p.thumb} alt="" />
                                </div>
                                <div className="favorite"></div>
                                <div className="product_info">
                                  <h6 className="product_name"><a href="#">{p.product_name}</a></h6>
                                  <div className="product_price">{p.price}</div>
                                </div>
                              </div>
                              <div className="red_button "><a href="#">add to cart</a></div>
                            </div>
                        </div>
                        ))
                      }
                        
                    </div>
                </div>
                <div className="carousel-item py-5">
                    <div className="row">
                    {
                        products.slice(4,8).map(p=>(
                          <div className="col-sm-3" key={p.id}>
                            <div className="card">
                              <div className="card-body">
                                <div className="product_image">
                                  <img src={p.thumb} alt="" />
                                </div>
                                <div className="favorite"></div>
                                <div className="product_info">
                                  <h6 className="product_name"><a href="#">{p.product_name}</a></h6>
                                  <div className="product_price">{p.price}</div>
                                </div>
                              </div>
                              <div className="red_button "><a href="#">add to cart</a></div>
                            </div>
                        </div>
                        ))
                      }
                    </div>
                </div>              
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <a className="carousel-control-prev text-dark" href="#myCarousel" role="button" data-slide="prev">
                <span className="fa fa-chevron-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next text-dark" href="#myCarousel" role="button" data-slide="next">
                <span className="fa fa-chevron-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    </div>
</div>
          </div>
        </div>
    )
}

export default BestSeller

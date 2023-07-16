import React,{useEffect,useState} from 'react'
import {productByCategory} from './../../api/productApi'
import {Link} from 'react-router-dom'

function ProductRelated({id}) {
  const [product, setproduct] = useState([])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    productByCategory({id:id},signal).then((data)=>{
      if(data.error){
        console.log(data.error)
      }else{
        setproduct(data)
      }
    })
   
  }, [id])
    return (
        <div className="best_sellers">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title new_arrivals_title">
                  <h2>Related Products</h2>
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
                        product.map(p=>(
                          <div className="col-sm-3" key={p.id}>
                            <div className="card">
                              <div className="card-body">
                                <div className="product_image">
                                  <img src={"http://localhost:3001/dist/uploads/"+p.image1} alt="" />
                                </div>
                                <div className="favorite"></div>
                                <div className="product_info">
                                  <Link to={"/productDetail/"+p.id}>
                                    <h6 className="product_name">{p.name}</h6>
                                  </Link>
                                  
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
</div>
          </div>
        </div>
    )
}

export default ProductRelated

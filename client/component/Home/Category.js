import React from 'react'

function Category() {
    return (
        <div className="banner">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="banner_item align-items-center" style={{backgroundImage:"url(/dist/assets/images/silk.jpg)"}}>
                  <div className="banner_category">
                    <a href="#">Banarasi Silk Saree</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="banner_item align-items-center" style={{backgroundImage:"url(/dist/assets/images/msilk.jpg)"}}>
                  <div className="banner_category">
                    <a href="#">Mysore Silk Saree</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="banner_item align-items-center" style={{backgroundImage:"url(/dist/assets/images/cotton.jpg)"}}>
                  <div className="banner_category">
                    <a href="#">Cotton Sarees</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Category

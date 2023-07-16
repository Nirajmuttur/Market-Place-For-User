import React from 'react'

function Footer() {
    return (
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
                  <ul className="footer_nav">
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">FAQs</a></li>
                    <li><a href="#">Contact us</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="footer_nav_container">
                  <div className="cr">©2021 All Rights Reserverd. </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
    )
}

export default Footer

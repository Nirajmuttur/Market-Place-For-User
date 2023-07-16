import React from 'react'
import TopNavBar from '../Navbar/TopNavBar/TopNavBar'
import NavBarMenu from '../Navbar/NavbarMenu/NavBarMenu'
import Category from './Category'
import {Link} from 'react-router-dom'
import './Home.css'
import NewArrivals from './NewArrivals'
import Deal from './DealOfDay/Deal'
import BestSeller from './BestSeller/BestSeller'
import Services from './Services'
import Subscribe from './Subscribe'
import Footer from '../Footer/Footer'
function Home() {
    return (
        <div className="MainDiv">
            {/* <header className="header trans_300">
                <TopNavBar/>
                <NavBarMenu/>
            </header> */}
            {/* <div className="main_slider" style={{backgroundImage:"url(/dist/assets/images/slider_1.jpg)"}}>
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content">
                  <h6>Spring / Summer Collection 2021</h6>
                  <h1>Get up to 30% Off New Arrivals</h1>
                  <div className="red_button shop_now_button"><a href="#">shop now</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_slider" style={{backgroundImage:"url(/dist/assets/images/slider_1.jpg)"}}>
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content">
                  <h6>Spring / Summer Collection 2021</h6>
                  <h1>Get up to 30% Off New Arrivals</h1>
                  <div className="red_button shop_now_button"><a href="#">shop now</a></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
            <div id="carouselExampleIndicators" className="carousel slide main_slider" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img class="d-block w-100" src="dist/assets/images/main.jpg" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="dist/assets/images/main2.jpg" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="dist/assets/images/main3.jpg" alt="First slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                <h2 className="category section_title">Popular Categories</h2>
            </div>
            <Category/>
            <NewArrivals/>
            <Deal/>
            <BestSeller/>
            <Services/>
            <Subscribe/>
            <Footer/>
        </div>
    )
}

export default Home

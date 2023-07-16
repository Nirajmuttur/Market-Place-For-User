import React,{useState,useEffect,useContext} from 'react'
import './ProductDetail.css'
import ProductRelated from './ProductRelated'
import { useParams } from 'react-router-dom';
import {productById} from './../../api/productApi'
import { ProductsContext } from './../Context/ProductContext'
import { CartContext } from './../Context/CartContext'

function ProductDetail() {
    const { addProduct, cartItems, increase } = useContext(CartContext);

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }
    const [product, setproduct] = useState([])
    const [img, setimg] = useState({
        img1:'',
        img2:'',
        img3:''
    })
    const [active, setactive] = useState({
        img1:true,
        img2:false,
        img3:false
    })
    const {id}=useParams()
    const [state, setstate] = useState()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        productById({id:id},signal).then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                setproduct(data[0])
                setimg({img1:data[0].image1,img2:data[0].image2,img3:data[0].image3})
                setstate(data[0].image1)
            }
        })
        
    }, [id])    
    const handleImage=(e,s)=>{
        if(e==='img1'){
           setactive({img1:true,img2:false,img3:false})
        }
        if(e==='img2'){
            setactive({img1:false,img2:true,img3:false})
         }
         if(e==='img3'){
            setactive({img1:false,img2:false,img3:true})
         }
        setstate(s)
    }
    return (
        <>
        <div className="mainContainer">
            <div className="productPreview">
                <img src={"http://localhost:3001/dist/uploads/"+state}></img>
            </div>

            <div className="productData">
                <h1 className="productTitle">{product.name}</h1>
                <p className="productDescription">{product.description}</p>
                <h3 className="moreImages">More Images</h3>
                <div>
                    <img className={`moreproductimages ${active.img1?"selectedproductimage":""}`} src={"http://localhost:3001/dist/uploads/"+img.img1} onClick={e=>handleImage('img1',img.img1)}/>
                    <img className={`moreproductimages ${active.img2?"selectedproductimage":""}`} src={"http://localhost:3001/dist/uploads/"+img.img2} onClick={e=>handleImage('img2',img.img2)}/>
                    <img className={`moreproductimages ${active.img3?"selectedproductimage":""}`} src={"http://localhost:3001/dist/uploads/"+img.img3} onClick={e=>handleImage('img3',img.img3)}/>
                </div>
                <h3 className="sectionPrice">Price</h3>
                <div>
                    <button className="price">{product.price}</button>
                </div>
                {
                                   isInCart(product) && 
                                   <button 
                                   onClick={() => increase(product)}
                                   className="primartbtn">Add more</button>
                               }
                               {
                                    !isInCart(product) && 
                                    <button 
                                    onClick={() => addProduct(product)}
                                    className="primartbtn">Add to cart</button>
                                }
                {/* <button className="primartbtn">Add to Cart</button> */}
            </div>
        </div>
        <ProductRelated id={product.category_id}/>
        </>
        
    )
}

export default ProductDetail

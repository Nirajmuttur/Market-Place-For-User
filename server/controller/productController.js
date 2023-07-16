const { connection } = require('mongoose')
const pool = require('./../dbConnect/dbConnectionPool')

const productList=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("SELECT products.name,product_images.image1,products.description,products.id,products.price from products,product_images WHERE products.id=product_images.product_id",(err,result)=>{
                if(!err){
                    res.status(200).json(result)
                }else{
                    return res.status(400).json({
                        error:"Cannot fetch products"
                    })
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            error:"Server is down"
        })
    }
}

const productById=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("SELECT product_images.image1,product_images.image2,product_images.image3,products.name,products.description,products.price,products.category_id from product_images,products WHERE products.id=? AND products.id=product_images.product_id;",[req.params.id],(err,result)=>{
                if(!err){
                    res.status(200).json(result)
                }
                else{
                    console.log(error)
                    return res.status(400).json({
                        error:"Cannot fetch product"
                    })
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            error:"Server is down"
        })
    }
}

const productByCategory=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("SELECT product_images.image1,product_images.image2,product_images.image3,products.name,products.description,products.id,products.price,products.category_id from product_images,products WHERE products.category_id=? AND products.id=product_images.product_id;",[req.params.id],(err,result)=>{
                if(!err){
                    res.status(200).json(result)
                }
                else{
                    console.log(error)
                    return res.status(400).json({
                        error:"Cannot fetch product"
                    })
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            error:"Server is down"
        })
    }
}

module.exports={productList,productById,productByCategory}
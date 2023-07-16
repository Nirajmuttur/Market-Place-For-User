const pool = require('./../dbConnect/dbConnectionPool')
const formidable = require('formidable')
const {firebase,admin} = require('./../firebase/firebase')
const extend = require('lodash/extend')

const create=async(req,res,next)=>{
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "error in form parse"
            })
        }
        try {
            pool.getConnection((err,connection)=>{
                if(err) throw err
                var user = firebase.auth().currentUser;
                connection.query("INSERT INTO CART_ITEMS VALUES(?,?,?,?)",['',fields.product_id,user.uid,1],(err,result)=>{
                    if(!err){
                        req.cart=result.insertId
                        console.log(req.cart)
                        return res.status(200).json({
                            "message":"Inserted"
                        })
                    }else{
                        return res.status(400).json({
                            error:"Error in inserting"
                        })
                    }
                })
            })
        } catch (error) {
            return res.status(400).json({
                error:"server not reachable"
            })
        }
    })
    
}

const increaseQuantity=async(req,res,next)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("SELECT quantity FROM cart_items WHERE product_id=? ",[req.params.id],(err,result)=>{
                if(!err){
                    connection.query(`UPDATE cart_items SET quantity=${result[0].quantity+1} WHERE product_id=?;`,[req.params.id],(err,result)=>{
                        if(!err){
                            return res.status(200).json({
                                "message":"Cart quantity increased"
                            })
                        }else{
                            console.log(err)
                            return res.status(400).json({
                                error:"Error in inserting"
                            })
                        }
                    })
                }
            })
            
        })
    } catch (error) {
        return res.status(400).json({
            error:"server not reachable"
        })
    }
}

const decreaseQuantity=async(req,res,next)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("SELECT quantity FROM cart_items WHERE product_id=? ",[req.params.id],(err,result)=>{
                if(!err){
                    connection.query(`UPDATE cart_items SET quantity=${result[0].quantity-1} WHERE product_id=?;`,[req.params.id],(err,result)=>{
                        if(!err){
                            return res.status(200).json({
                                "message":"Cart quantity increased"
                            })
                        }else{
                            console.log(err)
                            return res.status(400).json({
                                error:"Error in inserting"
                            })
                        }
                    })
                }
            })
            
        })
    } catch (error) {
        return res.status(400).json({
            error:"server not reachable"
        })
    }
}

const removeCartItem=async(req,res,next)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("DELETE FROM cart_items WHERE product_id=? ",[req.params.id],(err,result)=>{
                if(!err){
                    return res.status(200).json({
                        "message":"Product Deleted Successfully"
                    })
                }else{
                    return res.status(400).json({
                        error:"Error deleting Product"
                    })
                }
            })
            
        })
    } catch (error) {
        return res.status(400).json({
            error:"server not reachable"
        })
    }
}

module.exports={create,increaseQuantity,decreaseQuantity,removeCartItem}
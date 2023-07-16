const pool = require('./../dbConnect/dbConnectionPool')
const razorPay=require('./../razorPay/razorpay')
const Razorpay=require('razorpay')
const {firebase,admin} = require('./../firebase/firebase')
var crypto = require('crypto');

let amount=0

const create=(req,res)=>{
        try {
            var instance = new Razorpay({
                key_id:razorPay.instance.key_id,
                key_secret: razorPay.instance.key_secret
            })
            pool.getConnection((err,connection)=>{
                if(err) throw err
                for(let i=0;i<req.body.length;i++){
                    connection.query("SELECT * FROM products WHERE id=?",[req.body[i].id],(err,result)=>{
                        if(!err){
                             setValue(result[0].price,req.body[i].id)    
                        }else{
                            console.log(err)
                        }                              
                    })
        
                }
            })
            function setValue(value,id) {
                amount += value*100;
                let currency='INR';
                let receipt='testing';
                let notes ='testing';
                instance.orders.create({amount, currency, receipt, notes},(err,order)=>{
                    if(err){
                        console.log(err)
                    }else{
                        var user = firebase.auth().currentUser;
                        pool.getConnection((err,connection)=>{
                            if(err) throw err
                            connection.query("INSERT INTO order_details VALUES (?,?,?,?,?,?,?)",['',order.id,'','',new Date(),user.uid,id])
                        })
                        return res.status(200).json(order)
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error:"Server is down"
            })
        }
}
//have to verify the signature is correct or not
const order=async(req,res)=>{
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err
            console.log(req.body)
            connection.query("UPDATE order_details SET payment_id=?,signature=? WHERE order_id=?",[req.body.payment_id,req.body.signature,req.body.order_id],(err,result)=>{
                if(!err){
                    return res.status(200).json({
                        "message":"Payment Successfull"
                    })
                }else{
                    return res.status(400).json({
                        error:"Payment UnSuccessfull"
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


module.exports={create,order}
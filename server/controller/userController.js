const pool = require('./../dbConnect/dbConnectionPool')
const {firebase,admin} = require('./../firebase/firebase')
const formidable = require('formidable')

const create = async(req,res)=>{
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(async function (user) {
     const idToken =  await firebase.auth().currentUser.getIdToken()
     const idTokenResult =  await firebase.auth().currentUser.getIdTokenResult()
     const email=user.user.email
     const uid = user.user.uid
     const name = req.body.name
     pool.getConnection((err,connection)=>{
        if(err) throw err

        connection.query('INSERT INTO user VALUES(?,?,?,?)',[uid,name,email,''],(err,rows)=>{
            connection.release()
            if(!err){
                return res.json({
                    "message":"Account Created Successfully"
                })
            }else{
                console.log(err)
            }
           
        })
    })
     
    }).catch(function (error) {
            console.log(error)
    });
    
}

const addAdress=async(req,res)=>{
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        if(err) throw err
        try {
            var user = firebase.auth().currentUser;
            pool.getConnection((err,connection)=>{
                if(err) throw err
                connection.query("INSERT INTO user_address VALUES (?,?,?,?,?,?)",['',user.uid,fields.address,fields.city,fields.pincode,fields.phone],(err,result)=>{
                    if(!err){
                        return res.status(200).json({
                            "message":"Address Updated"
                        })
                    }else{
                        return res.status(400).json({
                            error:"Error updating address"
                        })
                    }
                })
            })
        } catch (error) {
            return res.status(400).json({
                error:"Server Error"
            })
        }
    })
}

const getAddress=async(req,res)=>{
    try {
        var user = firebase.auth().currentUser;
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("SELECT * FROM user_address WHERE user_id=?",[user.uid],(err,result)=>{
                if(!err){
                    return res.status(200).json(result)
                }else{
                    return res.status(400).json({
                        error:"Address details not found"
                    })
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            error:"Server Error"
        })
    }
}

const getUserInfo=async(req,res)=>{
    try {
        var user = firebase.auth().currentUser;
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("SELECT * FROM user,user_address WHERE user_address.user_id=user.id AND user.id=?",[user.uid],(err,result)=>{
                if(!err){
                    return res.status(200).json(result)
                }else{
                    console.log(err)
                    return res.status(400).json({
                        error:"Error fetching user details"
                    })
                }
            })
        })
    } catch (error) {
        return res.status(400).json({
            error:"Server Error"
        })
    }
}



module.exports={create,addAdress,getAddress,getUserInfo}
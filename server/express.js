import devBundle from './devBundle'
import template from './../template'

import path from 'path'
const express = require('express')
const cors =require('cors')
const cookieParser=require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const CURRENT_WORKING_DIR = process.cwd()

const userRoutes=require('./routes/userRoutes')
const authRoutes=require('./routes/authRoutes')
const productRoutes=require('./routes/productRoutes')
const cartRoutes=require('./routes/cartRoutes')
const orderRoutes=require('./routes/orderRoutes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
app.use(cors({credentials: true,origin: 'http://localhost:3000'}))

app.use('/dist',express.static(path.join(CURRENT_WORKING_DIR,'dist')))

app.use('/',userRoutes)
app.use('/',authRoutes)
app.use('/',productRoutes)
app.use('/',cartRoutes)
app.use('/',orderRoutes)

app.get('/',(req,res)=>{
    res.status(200).send(template())
})



devBundle.compile(app)

export default app
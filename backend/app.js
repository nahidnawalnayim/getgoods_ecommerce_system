

const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const amqp = require('amqplib/callback_api');

amqp.connect('amqps://pniiepyn:lewIs5a9P6_fgk4xhpmFTsyKM87OL7un@shrimp.rmq.cloudamqp.com/pniiepyn',(error0,connection)=>{
    if(error0) {
        throw error0
    }
    connection.createChannel((error1,channel)=>{
        if(error1) {
            throw error1
        }
        channel.assertQueue('Order placed successfully',{durable:false})
        channel.consume('Order placed successfully',(msg)=>{
            console.log(msg.content.toString());
        })
        const express = require("express");
        const app = express();

        app.use(express.json());
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
        app.use(express.urlencoded({ limit: "50mb", extended: true }));
        app.use(fileUpload({useTempFiles: true}));
        
        // config
        if(process.env.NODE_ENV!=="PRODUCTION"){
            require("dotenv").config({
                path:"backend/config/.env"
            })}
        
        // Route imports
        const {createUser}=require("./controller/user/UserController")
        const product = require("./controller/product/ProductRoute");
        const user = require("./controller/user/UserRoute");
        const order = require("./controller/order/OrderRoute");
        const payment = require("./controller/payment/PaymentRoute");
        const cart = require("./controller/cart/WishListRoute");
        const orders=require("./controller/order/OrderRoute")
        app.use("/api/v2",product);
        app.use("/api/v2",user);
         app.get('/main',async(req,res)=>{
res.send("hello 1")
             channel.sendToQueue('hello',Buffer.from('hello'))
         }
         )
         app.get('/',async(req,res)=>{
            res.send("hello 1")
                         channel.sendToQueue('hello from gateway',Buffer.from('hello from gateway'))
                     })
          app.use("/api/v2",order);
        
        app.use("/api/v2",payment);
        
        app.use("/api/v2",cart);
        
        app.use(express.static(path.join(__dirname,"../frontend/build")));
        
        app.get("*",(req,res) =>{
            res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
        })
        
        // it's for errorHandeling
        app.use(ErrorHandler);
        app.listen(process.env.PORT,() =>{
            console.log(`Server is working on http://localhost:${process.env.PORT}`)
        })
        
        module.exports = app
    })
})

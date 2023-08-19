

const ErrorHandler = require("../../middleware/error");
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

        //const cart = require("./WishListRoute");
   
        //app.use("/api/v2",cart);
        
     
         app.get('/',async(req,res)=>{
res.send("hello cart")
             channel.sendToQueue('Hello from cart server',Buffer.from('Hello from cart server'))
             //channel.sendToQueue('Product added to cart',Buffer.from('Product added to cart'))

         }
         )
         app.get('/cartadd',async(req,res)=>{
            res.send("hello 1")
            channel.sendToQueue('Product added to cart',Buffer.from('Product added to cart'))
        })
        
        
        app.use(express.static(path.join(__dirname,"../frontend/build")));
        
        app.get("*",(req,res) =>{
            res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
        })
        
        // it's for errorHandeling
        app.use(ErrorHandler);
        app.listen(4003,() =>{
            console.log(`Cart Server is working on 4003`)
        })
        
        module.exports = app
    })
})

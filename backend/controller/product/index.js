

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

        //const product = require("./ProductRoute");
   
        //app.use("/api/v2",product);
        
     
         app.get('/',async(req,res)=>{
res.send("hello 1")
             channel.sendToQueue('Hello from product server',Buffer.from('Hello from product server'))
         }
         )
         app.get('/',async(req,res)=>{
            res.send("hello 1")
                         channel.sendToQueue('Hello from product server',Buffer.from('Hello from product server'))
                     })
        
        
        // app.use(express.static(path.join(__dirname,"../frontend/build")));
        
        // app.get("*",(req,res) =>{
        //     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
        // })
        
        // it's for errorHandeling
        app.use(ErrorHandler);
        app.listen(4002,() =>{
            console.log(`Product Server is working on 4002`)
        })
        
        module.exports = app
    })
})

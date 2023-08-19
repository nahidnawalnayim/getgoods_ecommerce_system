const express=require('express');
//const order=require('./OrderRoute')
const ErrorHandler = require("../../middleware/error");

const app = express();
const amqp = require('amqplib/callback_api');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//const order = require("./routes/OrderRoute");

//const cors=require("cors");

amqp.connect('amqps://pniiepyn:lewIs5a9P6_fgk4xhpmFTsyKM87OL7un@shrimp.rmq.cloudamqp.com/pniiepyn',(error0,connection)=>{
    if(error0) {
        throw error0
    }
    connection.createChannel((error1,channel)=>{
        if(error1) {
            throw error1
        }
        channel.assertQueue('Hello from cart server',{durable:false})
        channel.assertQueue('Product added to cart',{durable:false})
        
        
        // const corsOption = {
        //     origin: ['http://localhost:3000'],
        // };
        
        //app.use(cors(corsOption));
        
        
        app.get('/',(req,res)=>{
            res.send("hello from 4001")
        })
        app.get('/place',(req,res)=>{
            channel.sendToQueue('Order placed successfully',Buffer.from('Order placed successfully'))
            res.send("hello from 4001")
        })

        channel.consume('Hello from cart server',(msg)=>{
            console.log(msg.content.toString());
        })
        
        channel.consume('Product added to cart',(msg)=>{
            console.log(msg.content.toString());
        })
        //app.use(cors())
        app.listen(4001,()=>{
            console.log("Order app listening on port 4001.");
        })
    })
})
app.use(ErrorHandler);
//module.exports=index;
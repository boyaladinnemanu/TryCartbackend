const express = require('express')
const cors = require('cors')
const {connectionMongodb} = require('./connection')
const userRouter = require('./routes/user')
const registereduserRouter= require('./routes/registereduser')
const loginuserRouter = require('./routes/loginuser')
const ordersRouter = require('./routes/orders')
const makeuserRouter = require('./routes/makeprime')
const AllproductsRouter = require('./routes/allproducts')
const app = express()
const PORT = 8000;

app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: "http://localhost:3000",  
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true                
}));

app.use(express.json());
//connectingdb

connectionMongodb('mongodb+srv://manoj:manoj%40123@cluster0.dhubaol.mongodb.net/youtube?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log("mongobd connected"))
.catch((error)=>console.log("mongodb error:",error));

//routes
app.use('/api/users',userRouter)
app.use("/register",registereduserRouter)
app.use("/login",loginuserRouter)
app.use("/makeprime",makeuserRouter)
app.use("/addproduct",AllproductsRouter)
app.use('/orders',ordersRouter)

app.listen(PORT,()=>console.log(`server is running at ${PORT}`))
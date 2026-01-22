const express = require('express');
const cors = require('cors');
const { connectionMongodb } = require('./connection');

const userRouter = require('./routes/user');
const registereduserRouter = require('./routes/registereduser');
const loginuserRouter = require('./routes/loginuser');
const ordersRouter = require('./routes/orders');
const makeuserRouter = require('./routes/makeprime');
const AllproductsRouter = require('./routes/allproducts');

const app = express();
const PORT = 8000;

// ✅ allow both localhost + vercel frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://try-cart-frontend.vercel.app",
  /\.vercel\.app$/ 
];

app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman / curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

// important for preflight
app.options("*", cors());

app.use(express.json());

// DB connection
connectionMongodb(
  'mongodb+srv://manoj:manoj%40123@cluster0.dhubaol.mongodb.net/youtube?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log("mongodb connected"))
.catch(err => console.log("mongodb error:", err));

// routes
app.use('/api/users', userRouter);
app.use('/register', registereduserRouter);
app.use('/login', loginuserRouter);
app.use('/makeprime', makeuserRouter);
app.use('/addproduct', AllproductsRouter);
app.use('/orders', ordersRouter);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

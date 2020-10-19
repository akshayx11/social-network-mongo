const express = require("express");
const bodyParser = require("body-parser");
const boom = require('express-boom');
const {connectDB} = require('./dbConnection');
const {userRouter}  = require("./routers/user");
const { authRouter } = require("./routers/auth");
//const { friendRouter } = require("./routers/friend");
//const { postRouter } = require("./routers/post");
const {authMiddleWare} = require("./middlewares/auth");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(boom());
connectDB();
app.use("/user", authMiddleWare, userRouter);
app.use("/auth", authRouter);
//app.use("/friend", authMiddleWare,friendRouter);
//app.use("/post", authMiddleWare, postRouter);

app.get('/', (req, res, next)=>{
    res.send("app GET request");
});
const PORT =  3001;
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Connected on ${PORT}`);
});

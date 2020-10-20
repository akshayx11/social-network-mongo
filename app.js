const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const exphbs = require('express-handlebars');
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
//Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

//Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(boom());
connectDB();
app.use("/user", authMiddleWare, userRouter);
app.use("/auth", authRouter);
//app.use("/friend", authMiddleWare,friendRouter);
//app.use("/post", authMiddleWare, postRouter);

app.get('/', (req, res)=>{
    try {
        //show homepage if not logged in or show user view if logged in or cookied found
        
        res.render('register', {
            layout: 'indexLayout'
        });
    } catch(e) {
        res.send("Error occured: " + e);
    }
    
});
const PORT =  3002;
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Connected on ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const exphbs = require('express-handlebars');
const boom = require('express-boom');
require("dotenv").config();
const {connectDB} = require('./dbConnection');
const {userRouter}  = require("./routers/user");
const { authRouter } = require("./routers/auth");
const { friendRouter } = require("./routers/friend");
//const { postRouter } = require("./routers/post");
const {authMiddleWare} = require("./middlewares/auth");
const { decryptJwtToken } = require("./controllers/auth");
const { getUserById } = require("./controllers/user");
const  { ObjectID } =  require("bson");
const { getCookie } = require("./utils/cookieHandler");
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
app.use("/friend", authMiddleWare,friendRouter);
//app.use("/post", authMiddleWare, postRouter);

app.get('/', async(req, res)=>{
    try {
        //show homepage if not logged in or show user view if logged in or cookies found
        const token = req.headers.cookie && getCookie(req.headers.cookie, "token");
        let userPage = 'main';
        let pageLayout = 'indexLayout';
        let userDetails = {};
        if(token && token!== "undefined"){
            const { userId, exp } = decryptJwtToken(token);
            if(exp < Date.now()){
                const { data } =  await getUserById(new ObjectID(userId));
                userDetails = data;
                userPage = "homepage";
                pageLayout = "homepageLayout";
            }
        }
        res.render(userPage, {
            layout: pageLayout,
            data: {...userDetails}
        });
    } catch(e) {
        const { expiredAt } = await e;
        if(expiredAt && new Date(expiredAt).getTime() < Date.now()){
            res.render('main', {
                layout: 'indexLayout'
            });
        } else{
            res.send("Error occured: " + e);
        }
    }  
});

app.get('/signup', async (req, res) => {
    try {
        //show homepage if not logged in or show user view if logged in or cookies found
        
        res.render('register', {
            layout: 'indexLayout'
        });
    } catch(e) {
        res.send("Error occured: " + e);
    }
});
app.get('/login', async (req, res) => {
    try {
        
        res.render('login', {
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

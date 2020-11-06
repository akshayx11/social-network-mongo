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
const { stories } = require("./routers/story");
const story = require("./controllers/story");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
//Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(boom());
connectDB();
app.use("/user", authMiddleWare, userRouter);
app.use("/auth", authRouter);
app.use("/friend", authMiddleWare,friendRouter);
//app.use("/post", authMiddleWare, postRouter);
//app.use("/stories",authMiddleWare,stories);


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

app.get('/stories/new',  (req, res)=>{
    let data={};
     try{
            res.render('new-stories', {
                layout: 'homepageLayout',
                data
            });
        }catch(e) {
            res.send("Error occured: "+ e);
        }
});

app.get('/stories/all',  async (req, res)=>{
    let data={};
     try{
            let data = await story.get_all_stories();
            res.render('story', {
                layout: 'homepageLayout',
                data
            });
        }catch(e) {
            res.send("Error occured: "+ e);
        }
});

//for posting new stories
app.post('/stories/new',  async (req, res)=>{
    let response={};
    try{
        let data = req.body;
        const token =  getCookie(req.headers.cookie, "token");
        let decrVal=  decryptJwtToken(token);
        data.postedBy = decrVal.userId;
        response = await story.new_story(req.body);
     }catch(e) {
        response = {
            message:"Unable to post the story",
            statuscode:400
        }
     }
     res.send(response)
});

const PORT =  3002;
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Connected on ${PORT}`);
});

const express = require(`express`);
const app = express();
const mongoose =require(`mongoose`);
// const localStrategy= require(`passport-local`).Strategy;
const exphbs = require(`express-handlebars`)
const upload = require(`express-fileupload`)
const Customer = require(`./models/customer`);
const methodOverride= require(`method-override`)
const path = require(`path`)
const passport = require(`passport`)
const bodyParser = require(`body-parser`)
const cookieParser= require(`cookie-parser`)
const session =require(`express-session`)
const flash = require(`connect-flash`)
const socket =require('socket.io')
const mongoStore =require(`connect-mongo`)(session)
mongoose.Promise=global.Promise;


mongoose.connect('mongodb://localhost:27017/store',{ useNewUrlParser: true });
mongoose.connection
.once(`open`, ()=>console.log(`connected`),
)
.on(`error`,(err)=>{
    console.log(`could not connect`, err);
})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname,`public`)));
app.use(upload())
const {select}= require('./helpers/select.js')
app
.engine('handlebars',exphbs({defaultLayout:'home', helpers:{select:select}}))
.set('view engine', 'handlebars');

app.use(methodOverride(`_method`))
app.use(session({
    secret:`lekaslovetocode`,
    resave:true,
    saveUninitialized:true,
    store: new mongoStore({mongooseConnection:mongoose.connection}),
    cookie:{httpOnly: true,maxAge:180*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
// local varable using varable

app.use((req, res, next)=>{
    res.locals.success_message= req.flash(`success_message`);
    res.locals.user= req.user || null;
    res.locals.session=req.session;
    next()
})

const admin = require(`./routes/admin/index`);
app.use(`/admin`,admin)
const adminLogin = require(`./routes/admin-login/index`);
app.use(`/admin-login`,adminLogin)
const home = require(`./routes/home/index`);
app.use(`/`,home);



var server=app.listen(9071,()=>{
    console.log(`app working on port 9071`);
})
var io= socket(server);
io.on('connection',(socket)=>{
    // console.log('connection made');
    
    socket.on('data', (data)=>{
        io.sockets.emit('data', data);
        // console.log(data);
    })
})
const express = require(`express`)
const router = express.Router();
const Customer = require(`../../models/customer`);
const Buyer = require(`../../models/buyer-details`);
const bodyParser = require(`body-parser`)
const Item = require(`../../models/items`);
const passport = require(`passport`)
const bcrypt = require(`bcryptjs`);
const Transit = require(`../../models/transit.js`)
const LocalStrategy = require(`passport-local`).Strategy

router.all(`/*`,(req,res,next)=>{
    req.app.locals.layout= 'home';
    next();
});
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

router.get(`/`,(req,res)=>{
Item.find({}).limit(6).exec(( function(err, products){
    res.render('home/index',{ item: products});
}))
    
})
router.post(`/`,(req,res)=>{
    let id = 6*(req.body.id-1)
    Item.find().skip(id).limit(6).exec(( function(err, products){
        res.json({ item: products});
    //    console.log(products.length);
    }))
   
    // var me= JSON.stringify(req.body.id) 
    // res.send(Item.findOne({_id:me}))
    // myArr=['we']
    // JSON.stringify(me, function(value) {products
    
  
})


router.get(`/cart/:id`, (req,res)=>{
    // console.log(req.session.cart);
    
    Item.findOne({_id:req.params.id}).then(post=>{
        res.render(`home/cart`,{cart:post})
    })
    
});
router.get('/purchase', (req,res)=>{
    var myCart =req.session.cart;
    var total = 0;
    if(myCart ==undefined){
        total=0
    }else{
        for(var i =0; i < myCart.length; i++){
            total= total += +myCart[i].price;
        }
    }
   
    res.render('home/purchase', {cart:req.session.cart, Total: total })
})
router.post('/transit/:id', (req,res)=>{

 Item.findById({_id:req.params.id }).then(post=>{
     
       const order = new Transit({
            cart:post,
            color:req.body.color,
            size:req.body.size,
            qty:req.body.qty
        })
        order.save((err,itemOrdered)=>{
            if(err) console.log(err);
            var productId= itemOrdered.id;
            var CartId=itemOrdered.cart._id
            var CartColor=itemOrdered.color
            var CartSize=itemOrdered.size
           
            Transit.findOne({_id: productId},(err,product)=>{
                
        if(err){
            return res.send(err)
        }
        
        if(typeof req.session.cart== 'undefined'){
                req.session.cart=[];
                req.session.cart.push({
                name:CartId,
                parentName: product._id,
                realP:parseFloat(product.cart.price),
                price:parseFloat(product.cart.price * product.qty).toFixed(2),
                image:'/uploads/'+ product.cart.file,
                color:product.color,
                size:product.size, 
                qty: product.qty, 
                    
                })
        }else{
            var cart= req.session.cart;
            var newItem= true
            for(var i=0; i < cart.length; i++){
                if(cart[i].name== CartId && cart[i].color== CartColor && cart[i].size == CartSize ){
                    cart[i].qty++
                    cart[i].realP
                    cart[i].price= cart[i].price *cart[i].qty;
                    newItem=false;
                    break
                
        }
                     
        if(cart[i].name== CartId && cart[i].color== CartColor && cart[i].size != CartSize || cart[i].name== CartId && cart[i].color!= CartColor && cart[i].size == CartSize ){
            
            req.session.cart.push({
                name:CartId,
                parentName: product._id,
                realP:parseFloat(product.cart.price),
                price:parseFloat(product.cart.price * product.qty).toFixed(2),
                image:'/uploads/'+ product.cart.file,
                color:product.color,
                size:product.size,
                qty:product.qty,
                // total: cart[i].price * cart[i].qty
            })
            newItem=false;
            break;
        }

       }
                    
        if(newItem){
            req.session.cart.push({
                name:CartId,
                parentName: product._id,
                realP:parseFloat(product.cart.price),
                price:parseFloat(product.cart.price * product.qty).toFixed(2),
                image:'/uploads/'+ product.cart.file,
                color:product.color,
                size:product.size,
                qty: product.qty
                
            })
        }
     }
         res.redirect('back')
})
})
})
})
router.get('/buyer-details',checkLoggedin, (req,res)=>{
         res.render('home/buyers-details');
})

router.get('/cart/update/:parentName', (req,res)=>{
    var cart= req.session.cart;
    var action= req.query.action;
    var cartId = req.params.parentName

    for(var i=0; i < cart.length; i++){
        if(cart[i].parentName== cartId){
            switch (action){
                case "add":                
                    cart[i].qty++
                    cart[i].price=parseFloat(cart[i].realP * cart[i].qty).toFixed(2);
                    break
                case "remove":
                    cart[i].qty--;
                    cart[i].price=parseFloat(cart[i].realP * cart[i].qty).toFixed(2);
                    if(cart[i].qty < 1) cart.splice(i, 1);
                    break
                case "clear":
                    cart.splice(i, 1);
                    if(cart.length == 0) delete req.session.cart;
                    break;
                default: console.log('update cart done'); 
                break; 
            }
            break
        }
    }
    res.redirect('/purchase')
})
// collections routes
router.get('/product/:categories', (req,res)=>{ 
    var product = req.params.categories;
    Item.find({categories: product}).then(post=>{
        res.render(`home/collection`,{item:post})
    })
});

router.post('/buyer-details',checkLoggedin, (req,res)=>{
        var cart = req.session.cart
        const buyer = new Buyer({
            user:req.user,
            cart:cart,
            name:req.body.name,
            address:req.body.address,
            phone:req.body.phone
           })
           buyer.save((err,buyerdetails)=>{
               if (err) console.log(err);
               req.session.cart= undefined;
               res.redirect('/')
               
           })

        })
    
router.get('/user-profile', isLoggedIn,(req, res)=>{
            res.render('home/user-profile')
})
router.get(`/logout`,(req,res)=>{
    req.logOut();
    res.redirect(`/login`)
})

router.use('/',notLoggedIn, (req, res, next)=>{
    next()
})
router.get(`/login`,(req,res)=>{
    res.render(`home/login`)
})

router.get(`/signup`,(req,res)=>{
    res.render(`home/signup`)
})

passport.use(new LocalStrategy({usernameField:`email`},(email,password,done)=>{
Customer.findOne({email:email}).then(customer=>{
           
        if(!customer){return done(null,false, {message: `incorrect name`});}
        bcrypt.compare(password, customer.password, (err, match)=>{
                if(err) return err;
                if(match){
                    return done(null,customer)
                }else{
                    return done(null,false, {message: `incorrect password`}
                    )
         }})
    })
}))
passport.serializeUser(function(customer,done){
    done(null,customer.id);
});
passport.deserializeUser((id,done)=>{
    Customer.findById(id,function(err,customer){
        done(err,customer);
    })
});
        
router.post(`/login`,passport.authenticate(`local` ,{
        failureRedirect:`/login`,
        failiureFlash:true
    }), function(req,res,next){
        if(req.session.oldUrl){
            var oldUrl = req.session.oldUrl
            req.session.oldUrl=null
            res.redirect(oldUrl);
        }else{
            res.redirect('/user-profile')
        }
    });
      
router.post(`/signup`,(req,res)=>{
 const customer = new Customer();
        customer.name= req.body.name;
        customer.phone=req.body.phone;
        customer.address=req.body.address;
        customer.email=req.body.email;
        customer.password=req.body.password;
        
         bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(customer.password,salt ,(err, hash)=>{
                customer.password=hash;
                customer.save((err, dataSaved)=>{
                    if(err) return err;
                    // console.log(dataSaved);
                    res.send(`inserted`);
                });
            });
        });
})
module.exports=router

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}
function checkLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.session.oldUrl= req.url
    res.redirect('/login')
}
function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

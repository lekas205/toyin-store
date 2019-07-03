const express = require(`express`)
const router = express.Router();
const Customer = require(`../../models/customer`);
// const bodtParser = require(`body-parser`)
const passport = require(`passport`)
const bcrypt = require(`bcryptjs`)
const LocalStrategy = require(`passport-local`).Strategy



router.all(`/*`,(req,res,next)=>{
    req.app.locals.layout= 'admin-login';
    next();
});

router.get(`/page-login`, (req,res)=>{
    res.render(`admin/page-login`)
})
passport.use(new LocalStrategy({usernameField:`email`},(email,password,done)=>{
    console.log(password);
    
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
       // if(!customer.validPasword(password)){return done(null,false, {message: `incorrect password`})}
       // if(!customer){return done(null,customer)}
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
   
   router.post(`/adminlogin`,(req,res,next)=>{
   
       passport.authenticate(`local` ,{
           successRedirect:`/admin`,
           failureRedirect:`/admin-login/page-login`,
           failiureFlash:true
       })(req,res,next)
   })
module.exports =router
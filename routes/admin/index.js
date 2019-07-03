
const express = require(`express`)
const router = express.Router();
const Item = require(`../../models/items`);
const bodtParser = require(`body-parser`)
const Buyer = require(`../../models/buyer-details`);
const {isEmpty} = require(`../../helpers/file`)

router.all(`/*`,(req,res,next)=>{
    req.app.locals.layout= 'admin';
    next();
});
router.use(bodtParser.json())
router.use(bodtParser.urlencoded({extended: false}))
router
.get(`/`,ensureAuthenticated, (req,res)=>{
    res.render(`admin/index`)
})
function ensureAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect(`/admin-login/page-login`)
    }
}router
.get(`/upload`,(req,res)=>{
    res.render(`admin/db-uploads`)
})
.get(`/update/:id`, (req,res)=>{
    Item.findOne({_id:req.params.id}).then(post=>{
        res.render(`admin/update`,{posts:post})
    })
})
.put(`/update/:id`,(req,res)=>{
    Item.findOne({_id:req.params.id}).then(post=>{
        post.name= req.body.name;
        post.categories = req.body.categories;
        post.price=req.body.price

        let file = req.files.file;
        let filename = Date.now()+ `-` +file.name;
        if(!isEmpty(req.files)){
            post.file=filename
            file.mv(`./public/uploads/` + filename,(err)=>{
                if(err) return err;
            })  
        } 
        post.save().then(updateData=>{
            req.flash(`success_message`, `post of ${updateData.title} was changed`)
             res.redirect(`/admin/store`)
        }) 
    })
  
})
.delete(`/del/:id`,(req,res)=>{
    Item.deleteOne({_id:req.params.id}).then(deletedData=>{
        req.flash(`success_message`, `A file was deleted`)
        res.redirect(`/admin/store`)
    })
})
.get(`/store`, (req,res)=>{
    Item.find({}).then(items=>{
        res.render(`admin/store-items`,{items:items})
    })
})
.get(`/demands`, (req,res)=>{
    Buyer.find({}).then(items=>{
        res.render(`admin/demand`,{items:items})
        // var priceSum=0;
        // var itemSum= items;
        // // console.log(itemSum);
        // for(var i=0; i < itemSum.length; i++){
        //      priceSum+= +itemSum[i].cart[0].price
        // }
        // console.log(priceSum)
    })
})

.post(`/uploads`, (req,res)=>{
    let file = req.files.file;
    let filename = Date.now()+ `-` +file.name;
    if(!isEmpty(req.files)){
        file.mv(`./public/uploads/` + filename,(err)=>{
            if(err) return err;
        })  
    }
    const uploadItems = new Item();
    uploadItems.name = req.body.name;
    uploadItems.categories= req.body.categories
    uploadItems.file =filename;
    uploadItems.price = req.body.price;

    uploadItems.save((err,dataSaved)=>{
        if (err) return err
        console.log(dataSaved);
        
        res.redirect(`back`)
    })
})
module.exports=router
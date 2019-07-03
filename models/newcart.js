
module.exports= function Cart(oldCart){
    this.items=oldCart.items || {};
    this.color=oldCart.color || {};
    this.size=oldCart.size || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;
    // console.log(myarr);
    
    this.add= function(item,id,color,size){
    var storedItems= this.items[id];
    var cartItems= this.color[color];
    var sizetItems= this.size[size];
    // for(var y in this.storedItems){
    //     var arr=[]
    //     arr.push(this.storedItems[y]);
    //     myArray.push(arr)
    // }
    req.session.cart=[]
    if(!storedItems){
        req.session.cart.push({
            name:item.cart.name,
            color:item.color,
            size:item.size,
            image:item.cart.file

        }) 
    }
    if(!cartItems  && !sizetItems || cartItems  && !sizetItems || !cartItems  && sizetItems){
        cartItems=this.color[color]={item:item,color:0,size:0, qty:0} 
        sizetItems=this.size[size]={item:item,color:0,size:0, qty:0} 
    }
   
     
     storedItems.qty++;
     cartItems.qty++;
     sizetItems.qty++;
    cartItems.color=cartItems.item.color;
    sizetItems.color=sizetItems.item.color;
    cartItems.size=cartItems.item.size;
    sizetItems.size=sizetItems.item.size;
    storedItems.price= storedItems.item.cart.price * storedItems.qty;
    storedItems.color= storedItems.item.color ;
    storedItems.size= storedItems.item.size ;

    this.totalQty++;
    this.totalPrice += storedItems.price;
    }
   
    
    this.generateArray= function(){
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id])
        } 
        // console.log(arr);
        return arr 
    }
   
    }
    
    
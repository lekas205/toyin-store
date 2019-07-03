
module.exports= function Cart(oldCart){
this.items=oldCart.items || {};
this.totalQty=oldCart.totalQty || 0;
this.totalPrice=oldCart.totalPrice || 0;

this.add= function(item,id,price){
    console.log(item)
var storedItems= this.items[id];
// var stored= this.items[price];
// console.log(storedItems)
if(!storedItems){
    storedItems=this.items[id]={item:item, qty:0, price:0}
}

storedItems.qty++;
storedItems.price= storedItems.item.price * storedItems.qty;
// console.log(storedItems.price)
// console.log(item);

this.totalQty++;
this.totalPrice += storedItems.price;
}
this.generateArray= function(){
    var arr = [];
    for(var id in this.items){
        arr.push(this.items[id])
    }
    return arr
}
}


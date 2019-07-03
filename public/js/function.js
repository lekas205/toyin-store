var socket = io.connect('http://localhost:9071');
var btn =document.getElementById('buyersbtn');
var buyerName=document.getElementById('buyersname');

btn.addEventListener('click',()=>{
   socket.emit('data',{
           name: buyerName.value,
   });
   
});


// var take = document.getElementsByClassName(`datas`);
// var cheke =[];
// alert(`hello`)

//     for (var i=0; i< take.length; i++){
//   (take[i].type);
//     if(take[i].localName =='span'){
//         var send=take[i].textContent;
//         cheke.push(send)
//         }
//         if(take[i].localName=='img'){
//             var send=take[i].src;
//              cheke.push(send)
//         }
        // return false
//   console.log(cheke);
  
//     localStorage.setItem("id", JSON.stringify(cheke));

        
//     }

// let responseData = JSON.parse(localStorage.getItem(`id`));
// let pageData = '<table><thead><tr><th>SN</th><th>Data</th></thead><tbody>';

// for(let x = 0; x < responseData.length; x++){
//     pageData = pageData + '<tr> <td>'+ (x + 1) +'</td> <td> '+responseData[x].src+'</td></tr>';
// }     

// let kun = document.getElementsByClassName('kunLun')[1];
// kun.innerHTML = pageData + '</tbody></table>';


// removing parentElement
// function remove() {
//     var element = document.getElementById(`elementId`);
//     element.parentNode.removeChild(element);
// }
// // appendin the size selected
// function run() {
// var e = document.getElementById("size");
// var value = e.options[e.selectedIndex].value;
// var text = e.options[e.selectedIndex].text;
// console.log(value);

//  document.getElementById('size-tag').textContent= `Size:`+ value;
// }

// var price = document.getElementsByClassName(`prizes`);
// var contain =[];

//  for (var i=0; i< price.length; i++){
//   (price[i].type);
//     if(price[i].localName =='span'){
//         var send=price[i].innerHTML;
//         contain.push(send)
// }
// }
        
// var neww= contain.map(Number);
// console.log(neww)
// var total = neww.reduce((previous, current)=>{
//      return previous + current;
// }); 

//  document.getElementById(`sumTotal`).innerHTML= `Total:#` +total;



//  var numbers = [65, 44, 12, 4];

// function getSum(total, num) {
//   return total + num;
// }

// function myFunction(item) {
//  console.log(numbers.reduce(getSum));
  
// }
// const fs = require('fs');
// fs.readFile('./file.json', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     content = data;

//     console.log(content);   
//     processFile();        
// });

// function processFile() {
//     console.log(content);
// }


// fetch('file.json')
// .then(resp=>{
//     return resp.json();
// })
// .then(data=>{
//     console.log(data)
// })
// class Products{
//     async getProduct(){
//         try{
//             let result= await fetch(`file.json`)
//             let  data  = await result.json();
//             let products= data 

//             products=products.map(item=>{
//                 const {name,price,file}= item;
//                 return {name,price,file}
//             })
//             return products
//         }catch(error){
//             console.log(error);
            
//         }
//     }
// }

// class UI{}
// class Storage{}
// document.addEventListener('DOMContentLoaded',()=>{
//     const ui= new UI();
//     const products= new Products()

//     products.getProduct().then(data=> console.log(data)
//     );
// }) 
// var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
// var result = Object.keys(obj).map(function(key) {
//   return [Number(key), obj[key]];
// });

// console.log(result);
// var arrOfObjs = [
//   { el1 : 123 } ,
//   { 'el' : 234 }, 
//   { 'el' : 345 }
// ];

// var mappedArray = arrOfObjs.map(function (item) { return item.el; });
// console.log(mappedArray);


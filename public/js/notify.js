
var socket = io.connect('http://localhost:9071');
var iconMenu=document.getElementById('notifications');
var badge=document.getElementById('notify')
console.log(iconMenu);
socket.on('data',(data)=>{

iconMenu.innerHTML +='<li><a href="#" class="notification-item"><span class="dot bg-warning"></span>'+ data.name+ " "+ "just placed an order"+'</a></li>'

var getSession= JSON.parse(sessionStorage.getItem("inbox"));
if( getSession == null || getSession.length == 0){
        console.log("got here");
        sessionStorage.setItem("inbox", JSON.stringify([data]));
}else{
        console.log("okay");
        solve = getSession;
        solve.push(data)
        sessionStorage.setItem("inbox", JSON.stringify(solve));

}
var getSession= JSON.parse(sessionStorage.getItem("inbox"));
var inboxLength= getSession.length;
badge.innerHTML=inboxLength;

})


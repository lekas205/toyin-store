
var num =1;
function myFunction(){
    num++;
    $.ajax({
        type:'POST',
        url:'/',
        data:{id: num},
        cache:false,
        success: function(data){
            for(var x of data.item){
              $('.tips-container').append(`
              <div class="tips-box" id="elementId">
              <div class="tp-1">
                <span class="datas" id="myId">${x._id}</span>
                <span>${x.price}</span>
                <img src="/uploads/${x.file}" alt="dentist"  width="280px" height="200px">
                <button><a href="/cart/${x.id}">purchase</a></button>
                <button onclick="remove()">remove</button>
              </div>
              <div class="tp-2">
                <h6><strong>Latest Blog new Slider Image Post</strong></h6>
                <span class="date">March 10, 2010 by Lorem in Science</span> <br>
                <span class="word">Lorem ipsum dolor sit amet consectetur, 
                   dignissimos dolor est, pariatur, nam harum 
                </span>
                  
              </div>
            </div>
              `)
              
            }
        }    
    })
}


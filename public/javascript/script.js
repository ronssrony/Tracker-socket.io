const socket = io(); 

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
           const {latitude , longitude}  = position.coords ; 
           socket.emit('send-location' , {latitude, longitude}); 
        }, 
        (error) =>
        {
            console.error(error) ;
        }, 
        {
            enableHighAccuracy: true , 
            timeout: 5000 , 
            maximumAge: 0 
        }
    );
}


 const map = L.map("map").setView([0, 0] , 16);

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
    attribution: 'Md Abdullah Al Mamun'
 }).addTo(map); 


 const marker={}
 socket.on('receive-location' ,function(data){
    const{id, latitude, longitude} = data ;
    map.setView([latitude,longitude]) ;
    console.log('new location detected')
    if(marker[id]){
        marker[id].setLatLng([latitude,longitude])
    }
    else
    {
        marker[id] = L.marker([latitude,longitude]).addTo(map); 
        
    }
 }) ;

 socket.on('user-disconnected',function(id){
     if(marker[id]){
        L.removeLayer[marker[id]] 
        delete marker[id] ;
     }
 })
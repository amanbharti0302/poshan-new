function showPosition(position) {
    console.log("Ho raha hai");
    var mapwa=document.getElementById("mapwa");
    var src="https://maps.google.com/maps?q="+position.coords.latitude+","+position.coords.longitude+"&t=&z=17&ie=UTF8&iwloc=&output=embed";
    mapwa.setAttribute("src",src);
  }
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
    

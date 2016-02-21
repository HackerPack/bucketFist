var map=null;
function initMap() {
  var origin_place_id = null;
  var destination_place_id = null;
  console.log("Hello there")
  var travel_mode = google.maps.TravelMode.WALKING;
 map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    //center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });
 console.log("----------------------");
    console.log(map);
  // var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      map.setCenter(pos);

      var latLng = new google.maps.LatLng(pos.lat, pos.lng);
                var marker = new google.maps.Marker({
                    position: latLng,
                    title: 'My Location',
                    map: map
                    //draggable: true
                });
    }, function() {
      // handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
  }

  

 var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
}//function findLandmarks(keywords,lat,lon)
var lat =0.0;
var lon = 0.0;

function GetLocation(location) {

    // alert(location.coords.latitude);
    lat = location.coords.latitude;
    lon = location.coords.longitude;
 /*   var map = new google.maps.Map(document.getElementById('mapholder'), {
    mapTypeControl: false,
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });*/

    console.log(lat+" "+lon);

/*lat = '38.932923';
lon = '-77.039296';*/



keywords = ["miami","museum","fort","beach","house", "gym", "dive"];
var keyMap ={};

for(var str in keywords)
{
    keyMap[str.toString()] = true;
}


$.get("https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-circle",
{
        apikey: 'x8MR4S8BBwPtqrugkGfJJC4tRWBdqcn4',
        latitude: lat,
        longitude: lon,
        radius:'200',
        //city_name: '',
        number_of_results: '20',

}, function(data, status)
    {
        //alert("Data: " + data + "\nStatus: " + status);
        var pntsOfInterest = data['points_of_interest'];
        var counter=0;
         // var infowindow = new google.maps.InfoWindow();
         var marker, i;

      console.log("============================"+pntsOfInterest)

        for(i=0; i<pntsOfInterest.length;i++)
        {
        //console.log(JSON.stringify(data));
            var titleStr =[];
            placeFound = false;
        
        
        titleStr= pntsOfInterest[i].title.split(" ");
        for(j =0;j<titleStr.length;j++)
        {
            // console.log("---------------");
            // console.log(titleStr[j]);
            if(keywords.indexOf(titleStr[j].toLowerCase() ) != -1) {
                placeFound = true;
                // marker = new google.maps.Marker({
                // position: new google.maps.LatLng(pntsOfInterest[i][1], pntsOfInterest[i][2]),
                // map: map });
                // console.log("--------------------asasasdsdsd---------------");


                // google.maps.event.addListener(marker, 'click', (function(marker, i) {
                // return function() {
                //     // infowindow.setContent(pntsOfInterest[i][0]);
                //     // infowindow.open(map, marker);
                // }})(marker, i));
                    break;
            }
           

        }
        if(placeFound){
            // alert(pntsOfInterest[i].location.latitude);
            var latLng = new google.maps.LatLng(pntsOfInterest[i].location.latitude, pntsOfInterest[i].location.longitude);
            var marker = new google.maps.Marker({
                position: latLng,
                title: pntsOfInterest[i].title,
                map: map,
                icon: "/zother/img/marker-pin-small.png"
                //draggable: true
            });
        }
            
        }
       
        }

    
    );

    //alert(location.coords.longitude);
    //alert(location.coords.accuracy);
}

function findLandmarks()
{

navigator.geolocation.getCurrentPosition(GetLocation);





//return data;

}




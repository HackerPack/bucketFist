
   (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
$(function(){
window.fbAsyncInit = function() {
  FB.init({
    appId      : '213755802308127',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });
	var id=" i";
	console.log(id);
	FB.getLoginStatus(function(response) {
  	FB.api('/me', function(response) {
  	id=response.id;
   
    console.log(id);
	var tripList = new Firebase(FIRE_BASE_URL+'/Trips/'+id);
    tripList.on("value", function(snapshot) {
    snapshot.forEach(function(data){
    	console.log(data);
                $("#row13").append('<tr i align=center><td class=taskId >'+data.val().Source.Latitude + ' ' + data.val().Source.Longitude+'</td><td  class=user-name >'+data.val().Destination.Latitude+' ' + data.val().Destination.Longitude+'</td><td>'+data.val().Date+'</td></tr>')

  });
     });

    var bucketList = new Firebase(FIRE_BASE_URL+'/BucketList/'+id);
    bucketList.on("value", function(snapshot) {
    snapshot.forEach(function(data){
    	console.log(data);
                $("#row12").append('<tr i align=center><td class=taskId >'+data.val().What+'</td><td  class=user-name >'+data.val().Where+'</td><td>'+data.val().With+'</td><td>'+data.val().date+'</td></tr>')

  });
     });
});
  });
};
});

  
 
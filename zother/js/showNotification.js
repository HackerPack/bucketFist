var lat=0.0;
var lon=0.0;
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
getAllKeyWords(response.id,function(keywords){


navigator.geolocation.getCurrentPosition(function(location){
    GetLocation(keywords,location);
});

});
//return data;

  	id=response.id;
    array = [];
    array.push("miami");
   
    console.log(id);
    matches = [];

    var bucketList = new Firebase(FIRE_BASE_URL+'/BucketList/'+id);
    bucketList.on("value", function(snapshot) {
    snapshot.forEach(function(data){
      var myArray = data.val().keyword;
      if(myArray!=null)
      {
      for(var i=0; i < myArray.length; i++)
      {
        var arr = myArray[i].split(" ");
        for(var j=0; j < arr.length; j++)
        {
          for(var k =0;k<(array.length);k++)
            {
                if(array[k]==arr[j].toLowerCase())
                {
                    matches.push(data);
                }
            }
        }
      }
    }

  });
    for(var i=0;i<matches.length;i++)
    {
      var data = matches[i];
      console.log(matches[i].val());
      $("#fulfillBucket").empty();
                $("#fulfillBucket").append('<tr i align=center><td class=taskId >'+data.val().What+'</td><td  class=user-name >'+data.val().Where+'</td><td>'+data.val().With+'</td></tr>')

    }

      console.log(matches);
     });
});
  });
};
});

function getAllKeyWords(uid, callback){
  var return_data = [];
  var bookRef = new Firebase(FIRE_BASE_URL+'/BucketList/'+uid);
  bookRef.on("value", function(snapshot) {
    snapshot.forEach(function(data){
      console.log(data.val().keyword);
      var myArray = data.val().keyword;
      if(myArray!=null)
      {
      for(var i=0; i < myArray.length; i++)
      {
        var arr = myArray[i].split(" ");
        for(var j=0; j < arr.length; j++)
          return_data.push(arr[j]);
      }
    }
      FB.getLoginStatus(function(response) {
      FB.api('/me/friends', function(results) {
          console.log(results);
                for(var i = 0; i< results.data.length; i++) {
                  var friendId = new Firebase(FIRE_BASE_URL+'/users/'+results.data[i].id);
                  friendId.on("value", function(snapshot){
                    if(snapshot.val())
                    {
                    console.log(snapshot.val().location.name);
                  return_data.push(snapshot.val().location.name);}
                    callback(return_data);
                  });

                }

    
        });
      });
    });
    
  });
}

function GetLocation(keywords,location) {
  //alert(location);
    lat = location.coords.latitude;
    lon = location.coords.longitude;
    

    console.log(lat+" "+lon);

/*lat = '38.932923';
lon = '-77.039296';*/



//keywords = ["miami","museum","fort","beach","house"];
console.log(keywords);
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

        for(i=0; i,pntsOfInterest.length;i++)
        {
        //console.log(JSON.stringify(data));
        var titleStr =[];
        
        
        titleStr= pntsOfInterest[i].title.split(" ");
        for(j =0;j<titleStr.length;j++)
        {
            if(keywords.indexOf(titleStr[j].toLowerCase() ) != -1)
            {
                console.log(pntsOfInterest[i].title+" "+pntsOfInterest[i].location.latitude+" "+pntsOfInterest[i].location.longitude );
            }

        }
            
        }
       
        }

    
    );

    //alert(location.coords.longitude);
    //alert(location.coords.accuracy);
}



  
 
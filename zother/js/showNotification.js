
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

  
 
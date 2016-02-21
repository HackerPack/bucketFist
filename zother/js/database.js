
function searchTask(term,keyword, callback){
  var keywords = keyword.split(" ");
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE);
  taskRef.orderByChild("Taken").equalTo("0").on("value", function(snapshot) {

     var searchResult = [];
     snapshot.forEach(function(childSnapshot) {

        var temp = JSON.stringify(childSnapshot.val());
        console.log(temp);
        if(keywords){
          flag=0;
          for(i=0;i<keywords.length;i++)
          {
            var n = temp.search(keywords[i]);
            if(n>-1){
              flag=0;
            }
            else
            {
              console.log("Not matched");
              flag=1;
              break;
            }
          }
          if(flag==0)
            searchResult.push(childSnapshot);
        }
      });
     console.log(searchResult);

      callback(searchResult);
  });
}
function allTasks(disaster, callback){
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE);
  taskRef.orderByChild("Taken").equalTo("0").on("value", function(snapshot) {

     var searchResult = [];
     snapshot.forEach(function(childSnapshot) {
        var temp = JSON.stringify(childSnapshot.val());
        if(disaster){
          var n = temp.search(disaster);
          if(n>-1){
            searchResult.push(childSnapshot);

          }
        }
        else{
         searchResult.push(childSnapshot);
        }
      });
     console.log(searchResult);

      callback(searchResult);
  });
}

function saveTask(task, callback){
  ref.child("Tasks").push(task);
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE);
  task.forEach(function(object){
    taskRef.update(object, callback);
  });
}
function saveTrip(trip, callback){
  ref.child("Trips").push(trip);
  var tripRef = new Firebase(FIRE_BASE_URL+TRIPS_TABLE);
 /* trip.forEach(function(object){
    tripRef.update(object, callback);
  });*/
}
  
function takeTask(uid, requestID, callback){
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE+requestID);
  taskRef.update({"Taken":uid, "Overdue":"No"}, callback);
}
function overdueTrue(requestID, callback){
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE+requestID);
  taskRef.update({"Overdue":"Yes"}, callback);
}
function untakeTask(uid, requestID, callback){
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE+requestID);
  taskRef.once('value',function(data){
    if(data.val().Overdue == "No")
    {
      var userRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+uid);
      userRef.once('value', function(data) {
        console.log("Takin away task");
    var trustLevel = data.val().trustLevel;
    trustLevel--;
    userRef.update({"trustLevel":trustLevel},callback);
    });
   }
  });
  taskRef.update({"Taken":"0","Overdue":"No"}, callback);
}
function completeTask(uid, requestID, callback){
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE+requestID);
  taskRef.update({"Finished":uid}, callback);
  var userRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+uid);
  userRef.once('value', function(data) {
    var trustLevel = data.val().trustLevel;
    trustLevel++;
    userRef.update({"trustLevel":trustLevel},callback);
  });
}

/*function getBorrowedBooks(uid, callback){
  var return_data = [];
  var bookRef = new Firebase(FIRE_BASE_URL+BOOKS_TABLE);
  bookRef.orderByChild("borrow_uid").equalTo(uid).on("value", function(snapshot) {
    snapshot.forEach(function(data){
      return_data.push(data.val());
    });
    callback(return_data);
  });
}
*/



function getMyTasks(uid, callback){
  var return_data = [];
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE);
  taskRef.orderByChild("Taken").equalTo(uid).on("value", function(snapshot) {
    snapshot.forEach(function(data){
      if(data.val().Finished == "0")
      return_data.push(data);
    });
    console.log(return_data);
    callback(return_data);
  });
}

function getCompletedTasks(uid, callback){
  var return_data = [];
  var bookRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE);
  bookRef.orderByChild("Finished").equalTo(uid).on("value", function(snapshot) {
    snapshot.forEach(function(data){
      return_data.push(data);
    });
    callback(return_data);
  });
}

function getUser(uid, callback){
var user_data = [];
var userRef = new Firebase(FIRE_BASE_URL+USERS_TABLE+uid);

userRef.once('value', function(data) {
	//console.log(data.val());
  user_data.push(data.val());
	callback(user_data);
	});
}


getUser('facebook:10153182851271621', function(data){
    data.forEach(function(innerData){
        //console.log(innerData.fname);
    });
});

function getTwitterWidget(hashtag, callback){
  //alert("Fetching widget details");
  var twitterRef = new Firebase(FIRE_BASE_URL+HASHTAGS_TABLE+hashtag);
  var searchResult = [];

  //twitterRef.orderByKey().equalTo(hashtag).on("value", function(snapshot) {
    twitterRef.once('value', function(data){
      console.log(hashtag);
      console.log(data.val());
      searchResult.push(data.val());
     //callback(searchResult);
     /*snapshot.forEach(function(childSnapshot) {
        var temp = JSON.stringify(childSnapshot.val());
        if(hashtag){
          var n = temp.search(hashtag);
          if(n>-1){
            searchResult.push(childSnapshot.val());
          }
        }
        else{
         searchResult.push(childSnapshot.val());
        }
      });*/
     //console.log(searchResult);
          //alert(searchResult);
     callback(searchResult);
     return searchResult
  });  
}

function getDisasters(hashtag, callback){
  var disRef = new Firebase(FIRE_BASE_URL+HASHTAGS_TABLE);
  disRef.orderByChild("hashtag").on("value", function(snapshot){
    var searchResult = [];
    snapshot.forEach(function(childSnapshot){
      var temp = JSON.stringify(childSnapshot.val());
      if (hashtag){
        var n = temp.search(hashtag);
        if (n>-1){
          searchResult.push(childSnapshot.val());
        }
      } else {
        searchResult.push(childSnapshot.val());
      }
    });
    callback(searchResult);
  });
}

function getAllTasks(callback){
  var taskRef = new Firebase(FIRE_BASE_URL+TASKS_TABLE);
  taskRef.orderByChild("Priority").on("value", function(snapshot) {

     var searchResult = [];
     snapshot.forEach(function(childSnapshot) {
        var temp = JSON.stringify(childSnapshot.val());
        if(disaster){
          var n = temp.search(disaster);
          if(n>-1){
            searchResult.push(childSnapshot);

          }
        }
        else{
         searchResult.push(childSnapshot);
        }
      });
     console.log(searchResult);

      callback(searchResult);
  });
}


$(function(){
window.fbAsyncInit = function() {
  FB.init({
    appId      : '213755802308127',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });
  var availableTags = [];
  FB.getLoginStatus(function(response) {
  FB.api('/me/friends', function(results) {
    console.log(results);
                for(var i = 0; i< results.data.length; i++) {
                  availableTags.push({
                    label: results.data[i].name,
                    value: results.data[i].name
                  })
                }
        });
  });
    
    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
 
    $( "#with" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });

  };
});


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function getID(callback)
  {
    FB.getLoginStatus(function(response) {
      FB.api('/me', function(response) {
        callback(response.id);
     });
    });

  }
   (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function addTo(callback) {
  getID(function(id){

  var what = $('input[name="what"]').val();
  var where = $('input[name="where"]').val();
  var withWhom = $('input[name="with"]').val();
  var date = $('input[name="date"]').val();
  var textWish = what + ' ' + where;
  extractKeywords(textWish, function(keyword){

  ref.child("BucketList").child(id).push({
    "What":what,
    "Where":where,
    "With":withWhom,
    "date":date,
    "keyword": keyword
  }, function(error){
    if(!error)
    {
      alert("BucketList added successfully");
    }

  });

  });


  });
}
function extractKeywords(textwish, callback)
{
  console.log(textwish);
  var encodedText = encodeURI(textwish);
  $.get("http://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords?apikey=d449cce06d2d698b306b9cb1edadab5957286d88&outputMode=json"+'&text='+encodedText,
{
        /*apikey :'d449cce06d2d698b306b9cb1edadab5957286d88',
        outputMode : 'json',
        text : encodedText,
        dataType: 'jasonp'   */                                                                                                                                 

}, 
    function(data, status)
    {
      console.log(data['keywords']);
      var keyWords = data['keywords'];
      var keyArray = [];
      for( i=0;i<keyWords.length;i++)
      {
        console.log(keyWords[i].text.toLowerCase());
        keyArray.push(keyWords[i].text.toLowerCase());
      }
        callback(keyArray);
        //alert("Data: " + data + "\nStatus: " + status);
        /*var pntsOfInterest = data['points_of_interest'];
        
        for(i=0; i,pntsOfInterest.length;i++)
        {
        //console.log(JSON.stringify(data));
        console.log(pntsOfInterest[i].title);

        }*/
    });
}
uid="10153219931661621";
getAllKeyWords(uid, function(result)
{
  console.log(result);
});
function getAllKeyWords(uid, callback){
  var return_data = [];
  var bookRef = new Firebase(FIRE_BASE_URL+'/BucketList/'+uid);
  bookRef.on("value", function(snapshot) {
    snapshot.forEach(function(data){
      console.log(data.val().keyword);
      var myArray = data.val().keyword;
      for(var i=0; i < myArray.length; i++)
      {
        var arr = myArray[i].split(" ");
        for(var j=0; j < arr.length; j++)
          return_data.push(arr[j]);
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






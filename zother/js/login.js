ref.onAuth(function(authData) {
	console.log("outside if")
	console.log(authData);
	console.log("in");

  if (authData == null) {
  	console.log("inside if")
    
  }
});

function getId(authData){
	authData = ref.getAuth();
	if(authData.facebook)
		{console.log(authData.facebook.id);
	return authData.facebook.id;
}
else if(authData.twitter)
{
	console.log(authData.twitter.id);
	return authData.twitter.id;

}
}

function getFName(authData){
	return authData.facebook.cachedUserProfile.first_name;
}

function getLName(authData){
	return authData.facebook.cachedUserProfile.last_name;
}


function loginFB(){

	ref.authWithOAuthPopup("facebook", function(error, authData) {
  		if (error) {
   			console.log("Login Failed!", error);

  		} else {
  			console.log("Authenticated successfully with payload:", authData.facebook.cachedUserProfile.first_name);
  			if (authData.facebook){
    	  ref.child("users").child(authData.facebook.id).set({
		      fname: getFName(authData),
		      lname: getLName(authData),
		      id: getId(authData),
		      trustLevel: "0"
	    });
    }
  			checkSession();
  		}
	}, {
  		remember: "sessionOnly"
	});
}
function loginTwitter(){

	ref.authWithOAuthPopup("twitter", function(error, authData) {
  		if (error) {
   			console.log("Login Failed!", error);
  		} else {
  			console.log("Authenticated successfully with payload:", authData.twitter.cachedUserProfile.first_name); 

		if (authData.twitter){
			console.log(authData.twitter);
			ref.child("users").child(authData.twitter.id).set({
					fname: authData.twitter.displayName,
		      		lname: authData.twitter.displayName,
		      		id: authData.twitter.id,
		      		trustLevel: "0"
				});
		} //authData
  			checkSession();
  		}
	}, {
  		remember: "sessionOnly"
	});
}
function logout(){
	ref.unauth();
	window.location.href = "index.html";
}

function checkSession(){
	authData = ref.getAuth();
	console.log("Entertin");
	console.log(authData);
	if(authData){
		window.location.href = "index.html";
	}
}

function checkSessionLogin(){
	authData = ref.getAuth();
	console.log(authData);
	if(authData == null){
		window.location.href = "index.html";
	}else{
		window.full_name = getFName(authData) + " "+ getLName(authData);
		$(".username").html("&nbsp;&nbsp;" + window.full_name);
	}
}
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
    	alert(response.authResponse.accessToken);
      // Logged into your app and Facebook.
      window.location.href = "pages/index.html";
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '213755802308127',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }


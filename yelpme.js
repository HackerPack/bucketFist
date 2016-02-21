/*function yelpdata()
{
var oauth = OAuth({
    consumer: {
        public: 'PkgOJMWs9-qr8myr08Mvsg',
        secret: 'OdYhCEqbOFPy5FVxjGmXRf9Dmm8'
    },
    signature_method: 'HMAC-SHA1'

});

var request_data = {
    url: 'https://api.yelp.com/v2/search',
    method: 'GET',
    data: {
        term: 'food',
        location: 'San Francisco'
    }
};

var token = {
    public: '1KsOnDKQnGK6vKxd7OjXXYe4RI46TcT6',
    secret: 'd6etNCcE4SqWSgIFDPP3liEqnR0'
};

$.ajax({
    url: request_data.url,
    dataType:'jsonp',
    type: request_data.method,
    data: oauth.authorize(request_data, token)
}).done(function(data) {
    console.log(JSON.stringify());
});

}*/


function yelpdata()
{

      var auth = { 
    consumerKey: "PkgOJMWs9-qr8myr08Mvsg", 
    consumerSecret: "OdYhCEqbOFPy5FVxjGmXRf9Dmm8",
    accessToken: "1KsOnDKQnGK6vKxd7OjXXYe4RI46TcT6",
    accessTokenSecret: "d6etNCcE4SqWSgIFDPP3liEqnR0",
  };

  var terms = 'food';
  var near = 'San+Francisco';

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  var parameters = [];
  //parameters.push(['term', terms]);
  //parameters.push(['location', near]);
  parameters.push(['ll', '37.788022,-122.399797']);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);

  var message = { 
    'action': 'http://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters 
  };

  OAuth.setTimestampAndNonce(message);  

  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

  var urlVar = OAuth.addToURL(message.action,parameterMap);


$.ajax({
    url: 'http://cors.io/?u='+urlVar,
     //headers: { 'Access-Control-Allow-Origin': '*' },
     //  crossDomain: true,
       success: function(data, status)
       {
       
        console.log(JSON.stringify(data));
        

        
    }});



  /*var response = UrlFetchApp.fetch(url).getContentText();
  var responseObject = Utilities.jsonParse(response);

  console.log(JSON.stringify(responseObject));*/
}
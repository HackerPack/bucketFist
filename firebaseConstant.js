var FIRE_BASE_URL = "https://bucketfist.firebaseio.com//";
var WISH_TABLE = "wishes/";
var USERS_TABLE = "users/";
var TRIPS_TABLE = "trips/";
var ref = new Firebase(FIRE_BASE_URL);
var isNewUser = true;
var globalWishRef = new Firebase(FIRE_BASE_URL+WISH_TABLE);
var globalUserRef = new Firebase(FIRE_BASE_URL+USERS_TABLE);
var globalTripRef = new Firebase(FIRE_BASE_URL+TRIPS_TABLE);
var LIBRARY_ACCOUNT_ID = "56241a14de4bf40b17112a75";
var DEBIT_ACCOUNT_ID = "56241a14de4bf40b17112a77";
var ACCOUNT_URL = "http://api.reimaginebanking.com/accounts/"; 
var TRANSFER_URL = "/transfers/"; 
var CAPITAL_ONE_QUERY_PARAM = "?key=2ec3d395b0e81344514ca1ecbae6edcb";
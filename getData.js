

//function findLandmarks(keywords,lat,lon)
var lat =0.0;
var lon = 0.0;

function GetLocation(location) {

    alert(location.coords.latitude);
    lat = location.coords.latitude;
    lon = location.coords.longitude;
    

    console.log(lat+" "+lon);

/*lat = '38.932923';
lon = '-77.039296';*/



keywords = ["miami","museum","fort","beach","house"];
var keyMap ={};

for(var str in keywords)
{
    keyMap[str.toString()] = true;
}

keywords

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

function findLandmarks()
{

navigator.geolocation.getCurrentPosition(GetLocation);





//return data;

}


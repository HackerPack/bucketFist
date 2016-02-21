function createWish(doExtract,keyArray)
{
	var myFirebaseRef = new Firebase(FIRE_BASE_URL+WISH_TABLE).push()	;
	if(doExtract == true)
	{
		extractKeywords('win hackathon and then go party in miami');
	}
	//console.log(encodeURI('win hackathon and then go party in miami'));
	
	else
		{
			myFirebaseRef.set({
		user:'rakesh',
		wish:'win hackathon and then go party in miami',
		keywords: keyArray
	});
		}
}

function extractKeywords(textwish)
{
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
    	var keyWords = data['keywords'];
    	var keyArray = [];
    	for( i=0;i<keyWords.length;i++)
    	{
    		console.log(keyWords[i].text);
    		keyArray.push(keyWords[i].text);
    	}
        
        createWish(false,keyArray);
        //alert("Data: " + data + "\nStatus: " + status);
        /*var pntsOfInterest = data['points_of_interest'];
        
        for(i=0; i,pntsOfInterest.length;i++)
        {
        //console.log(JSON.stringify(data));
        console.log(pntsOfInterest[i].title);

        }*/
    });
}

function monitorWishes()
{
	var monitorWishes = new Firebase(FIRE_BASE_URL+WISH_TABLE);
	monitorWishes.on('child_added',function(snapshot)
		{
			var wishInstance = snapshot.val();
			alert(wishInstance[0]+'wants '+wishInstance[1]);
		});
}
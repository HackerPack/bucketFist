

function findLandmarks()
{
	/*var request_data = {
    url: 'https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-circle',
    method: 'GET',
    data: {
        apikey: 'x8MR4S8BBwPtqrugkGfJJC4tRWBdqcn4',
        latitude: '25.765181',
        longitude: '-80.19458',
    }
};*/

$.get("https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-circle",
{
        apikey: 'x8MR4S8BBwPtqrugkGfJJC4tRWBdqcn4',
        latitude: '25.765181',
        longitude: '-80.19458',
        radius:'42',
        number_of_results: '100'

}, 
    function(data, status)
    {
        //alert("Data: " + data + "\nStatus: " + status);
        var pntsOfInterest = data['points_of_interest'];
        
        for(i=0; i,pntsOfInterest.length;i++)
        {
        //console.log(JSON.stringify(data));
        console.log(pntsOfInterest[i].title);

        }
    });

//return data;

}
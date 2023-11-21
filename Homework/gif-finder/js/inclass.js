/* Here is how the user gets gifs:
1 - user clicks button, button invokes handler
2 - handler read from data from the page and build query string (a la function call)
3 - listen to reponse, parse it
4 - show pictures / render results
*/

//  register to listen for mouseclick after everything is loaded on the page
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
let displayTerm = "";

// 3
function searchButtonClicked(){
    console.log("zzz searchButtonClicked() called");
    
    // read the data from the user:
    // search term
    // Also: som parameters: limit, rating?

    // start building the url
    const API_KEY = "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";  // should be done in env
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";
    const LIMIT = 10;
    let url = GIPHY_URL;

    // get the search term
    // find the html element that user types into 
    let searchTerm = (document.querySelector("#searchterm")).value;
    console.log("zzz searchterm" + searchTerm);

    // sanitize search term
    // 3 things to sanitize
    // trim it
    searchTerm = searchTerm.trim();
    console.log("zzz searchterm = " + searchTerm);
    searchTerm = encodeURIComponent(searchTerm);
    // is there a string left
    if(searchTerm.length < 1)
    {
        return; // early-out
    }

    // now we'are sure we have a string

    // put the search parameter into URL
    url += "q=" + searchTerm

    // put the API key into the URL
    url += "&api_key=" + API_KEY;

    // put in the limit
    url += "&limit=" + LIMIT;

    console.log("zzz url = " + url);

    // send the reqiest
    request(url);
}

    function request(url){
        // build an XHR object
        // attach a listener for the response
        // (optionally attach a error handler)
        // send it 
        // listener is fired
        // parse the reponse

        // XHR object
        let req = new XMLHttpRequest();
        
        // attach listeners
        req.onload = (res) => {
            // build an object literal from the response
            let obj = {};
            console.log("==================== Server Responded =======================");
            console.log(res.target.responseText);
            
            obj = JSON.parse(res.target.responseText);
            console.log("zzz obj=" +obj);
            console.log("zzz obj.data[] = " + obj.data);
            console.log("zzz obj.data[0] = " + obj.data[0]);
            console.log("zzz obj.data[0].images.fixed_width_downsampled" + obj.data[0].images.fixed_width_downsampled);
            console.log("zzz obj.data[0].images.fixed_width_downsampled.url" + obj.data[0].images.fixed_width_downsampled.url);
       
            console.log("================= it said: URL= =================");
            let url = obj.data[0].images.fixed_width_downsampled.url;
            console.log(url);
        };
        req.onerror = onError;

        // send it 
        req.open("GET", url);
        req.send();

    }

    function onerror(err) {
        console.log("ERROR: " + err);
    }

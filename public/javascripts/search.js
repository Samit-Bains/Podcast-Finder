//This object will be used to send requests to the ListenNotes API
const unirest = require('unirest');

//If sortBy = 0, we sort by relevance, if sortBy = 1 we sort by date
//API only returns 10 results at a time. However, we can access more by offsetting results
module.exports = async function(searchTerm, sortBy, page) {
    let offSet = (page * 10) - 10;
    const response = await unirest.get('https://listen-api.listennotes.com/api/v2/search?q=' + searchTerm + '&sort_by_date=' + sortBy + '&offset=' + offSet + '')
    .header('X-ListenAPI-Key', '224082d63abb469eb052d2302987c603')
    let test = response.toJSON();
    let podcasts = test.body;
    return podcasts;
};
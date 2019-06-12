var express = require('express');
var router = express.Router();
var searchPodcast = require('../public/javascripts/search')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET results of podcast search. */
router.get('/search', function(req, res, next) {
    let podcastSearch =  req.query.podcastInput;
    let sortBy =  req.query.sortBy;
    let page = req.query.page || 1;
    let results = searchPodcast(podcastSearch, sortBy, page);
    //Keeping track of what page we came from for and last page for pagination purposes
    let pageStart = parseInt(page);;
    let lastPage = 10 + pageStart;
    results.then(function(value) {
        let totalPages = Math.ceil(value.total / 10);
        //10 pages are displayed at a time for pagination. We need to limit this if we reach total page limit
        if(lastPage > totalPages){
            lastPage = totalPages;
        }
        res.render('index', {
            results: value,
            podcastSearch: podcastSearch,
            sortBy: sortBy,
            pageStart: pageStart,
            lastPage: lastPage
       });
    });
});



module.exports = router;
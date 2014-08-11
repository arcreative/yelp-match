var async = require('async'),
    config = require('../config'),
    ProgressBar = require('progress'),
    yelp = require('yelp').createClient(config.yelp);

var categoryFilter = config.category_filter || null,
    searchRadius = config.search_radius || 1600; // 1600 meters, 10 miles

var allResults = [],
    bar;

module.exports = function(names) {
    console.log('Compiling results...'.cyan);

    //Set the progress bar
    bar = new ProgressBar(':bar', { total: names.length })

    var queue = async.queue(search, 1);
    for (var i = 0; i < names.length; i++) {
        queue.push({
            name: names[i]
        });
    }

    // Display the results
    queue.drain = displayResults;
};


function search(hash, callback) {
    var query = {
        term: hash.name,
        category_filter: categoryFilter,
        radius_filter: searchRadius
    };

    //Set location (mandatory)
    if (config.location) {
        query.location = config.location;
    } else {
        throw new Error('`location` is not set in config.json.');
    }

    yelp.search(query, function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        // If results found, aggregate data
        if (data.total) {
            var business = data.businesses[0];
            hash.match_name = business.name,
            hash.rating = business.rating,
            hash.url = business.url,
            hash.phone = business.phone
        }

        // Push to results
        allResults.push(hash);

        // Increment progress
        bar.tick();

        // Moving on...
        callback();
    });
}

function displayResults() {
    console.log('\nResults:\n'.green);
    console.log('"name","matched_name","rating","url","phone"');
    for (var i = 0; i < allResults.length; i++) {
        var result = allResults[i];
        var datas = [];
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                datas.push(('' + result[key]).replace(/\"/g, "\\\""));
            }
        }

        console.log('"' + datas.join('\",\"') + '"');
    }
};

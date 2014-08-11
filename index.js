var argv = require('minimist')(process.argv.slice(2)),
    colors = require('colors'),
    csv = require('csv'),
    fs = require('fs');

//Local modules
var config = require('./config'),
    doYelpSearch = require('./src/do-yelp-search');

//Get input file
try {
    var contents = fs.readFileSync(argv._[0], {
        encoding: 'utf-8'
    })
} catch (e) {
    console.log("Error reading input file.".red);
    process.exit(1);
}

//Parse input file
csv.parse(contents, function(err, data) {
    if (err) {
        throw err;
    }

    //Process into unique email hash
    var names = data.map(function(row) {
        return row[0];
    });

    doYelpSearch(names);
});

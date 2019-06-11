var commons = require("./commons");
var async = require("async");
var array = [1,2,3,4,5,6,7,8,9,10];

/*
 * reference : https://caolan.github.io/async/v3/docs.html
 * async each
 */

function eachSample() {
    async.each(array, function(item, callback) {
        // commons.randomExcute(item, callback); OR.
        commons.randomExcute("each-"+ item, function(err) {
            callback(null);
        });
    },
    function done(err) {
        if(err) {
            console.log("err : " + err);
        }
        else {
            console.log("each all done.");
        }
    });
}

// TODO : eachSample 주석해제, eachSeriesSample 주석후 확인
// eachSample();

/*
 * reference : https://caolan.github.io/async/v3/docs.html
 * async eachSeries
 */
function eachSeriesSample() {
    async.eachSeries(array, function(item, callback) {
        // commons.randomExcute(item, callback); OR.
        commons.randomExcute("eachSeries-"+ item, function(err) {
            callback(null);
        });
    },
    function done(err) {
        if(err) {
            console.log("err : " + err);
        }
        else {
            console.log("eachSeries-all done.");
        }
    });
}

// TODO : eachSeriesSample 주석해제, eachSample 주석후 확인
// eachSeriesSample();


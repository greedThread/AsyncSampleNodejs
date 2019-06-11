/*
 * reference : https://caolan.github.io/async/v3/docs.html#each
 * async Series
 */

var commons = require("./commons");
var async   = require("async");

function test1(callback) {
    // randomExcute("test1", callback); or
    commons.randomExcute("test1", function(err) {
        callback(err);
    });
}

function test2(callback) {
    // randomExcute("test2", callback); or
    commons.randomExcute("test2", function(err) {
        callback(err);
    });
}


// parallel 각 콜백별로 순서보장은 되지않고 병렬로 실행됨. 결과값을 넘겨 최종적으로 받을수있음.
async.parallel([
    function(callback) {
        console.log("plan : test1 call");

        test1(function(err) {
            var result1 = "(test1 까지 실행 완료)";

            callback(err, result1);
        });
    },
    function(callback) {
        console.log("plan : test2 call");

        test2(function(err) {
            var result2 = "(test2 까지 실행 완료)";

            callback(err, result2);
        });
    }
],
// parallel done - result(결과)는 순서대로 담긴다.
function(err, result){
    if(err) console.log("series-err:" + err);
    else {
        console.log("series done result : " + result);
        console.log("result type ? : " + typeof result);
    }
});

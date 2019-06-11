/*
 * reference : https://caolan.github.io/async/v3/docs.html
 * async waterfall
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


// waterfall 순차적으로 실행되며 각 콜백에 데이터 결과값을 다음 콜백에서 받을수있음.
async.waterfall([
    function(callback) {
        test1(function(err) {
            var result1 = "(test1 까지 실행 완료)";

            callback(err, result1);
        });
    },
    function(cb_result1, callback) {
        console.log("앞서 전달받은 콜백의 결과 -- cb_result1 "+ cb_result1);

        test2(function(err) {
            var result2 = "(test2 까지 실행 완료)";

            callback(err, result2);
        });
    }
],
// waterfall done
function(err, result){
    if(err) console.log("series-err:" + err);
    else {
        console.log("series done result : " + result);
        console.log("result type ? : " + typeof result);
    }
});







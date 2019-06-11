/*
 * reference : https://caolan.github.io/async/v3/docs.html
 * async
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

// 단순한것이지만 async result을 넘기지 않고 scope내에 변수를 지정하여 다음콜백에서 사용하기도함.(코드 흐름상 콜백을 많이 사용하는경우나 누적해야하는경우)
// 다만 async parallel 이나, async each, eachSeries와 같은 병렬 실행의 경우는 전역객체에 대한 제어가 불확실함.
var a = [];
async.series([
    function(callback) {
        console.log("cb1 : " + a );
        test1(function(err) {
            a.push(3);
            callback(err);
        });
    },
    function(callback) {
        console.log("cb2 : " + a );
        test2(function(err) {
            a.push(4);

            callback(err);
        });
    }
],
// series done
function(err, result){
    if(err) console.log("series-err:" + err);
    else {
        console.log("series done a : " + a);
        console.log("result type ? : " + typeof a);
    }
});
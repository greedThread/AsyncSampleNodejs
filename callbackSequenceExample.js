// 일반적인 callback 사용시 순서 보장처리에 대한 예제이다.
var commons = require("./commons");

function test1(callback) {
    commons.randomExcute("test1", function(err) {
        callback(err);
    });
}

function test2(callback) {
    commons.randomExcute("test2", function(err) {
        callback(err);
    });
}

// 두개의 콜백 함수에 대해 항상 순서보장을 한다면..
test1(function(err){
    if(err) console.log("callbackSequence test1-err:"+err);
    else {
        console.log("callbackSequence test1 done");

        test2(function(err) {
            if(err) console.log("callbackSequence test2-err:"+err);
            else console.log("callbackSequence test2 done");
        });
    }
});

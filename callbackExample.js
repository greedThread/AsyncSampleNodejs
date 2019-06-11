//
var commons = require("./commons");

function test1() {
    commons.randomExcute("test1", function(err) {
        if(err) console.log("test1-err:"+err);
        else console.log("test1 done");
    });
}

function test2() {
    commons.randomExcute("test2", function(err) {
        if(err) console.log("test1-err:"+err);
        else console.log("test2 done");
    });
}

// 두개의 콜백 함수에서는 순서보장이없음
test1();
test2();
/*
 * reference : https://mohwaproject.tistory.com/entry/Nodejs-For%EB%AC%B8%EA%B3%BC-%EB%B9%84%EB%8F%99%EA%B8%B0-Callback
 */

var commons = require("./commons");


// 1~10까지 루프를 돌며 callback함수를 실행하려는 예제

function cbExample(str) {
    setTimeout(function() {
        console.log(str);
    }, 10);
}

// ====> 기대값 output
// cbLoopTest1 1
// cbLoopTest1 2 ...
// cbLoopTest1 10 ...

function loopTest1() {
    for(var i = 0; i < 10; i++) {
        this.setTimeout(function(){
            console.log("cbLoopTest1 "+ i); // 10
        }, 10);
    }
}

// TODO : loopTest1 주석해제, loopTest2 주석후 확인
// loopTest1();

// ====> 기대값 output
// cbLoopTest2 1
// cbLoopTest2 2 ...
// cbLoopTest2 10 ...

function loopTest2() {
    for(var i = 0; i < 10; i++) {
        (function(i) {
            process.nextTick(function(){
                console.log("cbLoopTest2 "+ i);
            });
        })(i);
    }
}

// TODO : loopTest2 주석해제, loopTest1 주석후 확인
// loopTest2();
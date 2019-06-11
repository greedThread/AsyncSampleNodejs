/* 일반적인 자바스크립트 유용함수 */

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


// 배열인지 체크
function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}

// 아이템리스트 인덱스로 가져옴
function findItemListByIndex(jsonData, index) {
    if(isArray(jsonData) == true) {
        return jsonData.filter(
            function(jsonData){
                return jsonData._index == index
            }
        );
    }
    else {
        var arr = [];
        arr.push(jsonData);
        return arr;
    }
}

function findArrayByIndex(array, name, value) {
    for(var i = 0; i < array.length; i++) {
        if(typeof array[i][name] != "undefined" && array[i][name] == value) {
            return array[i];
        }
    }
    return null;
}

function findArrayIndexByKeyValue(array, name, value) {
    for(var i = 0; i < array.length; i++) {
        if(typeof array[i][name] != "undefined" && array[i][name] == value) {
            return i;
        }
    }
    return null;
}

// 특정 그룹을 해당하는 인덱스 값으로 가져옴
function findGroupByIndex(jsonData, name , value){
    return jsonData.filter(
        function(jsonData){
            return jsonData[name] == value;
        }
    );
}
// 배열에서 특정 키값이 가장 작은 요소를 가져옴
function findArrayByKeySmallest(array, key) {
    if (array.length < 2) {
        return array[0];
    }
    array.sort(function(a, b) { // 오름차순
        return parseInt(a[key]) < parseInt(b[key]) ? -1 : parseInt(a[key]) > parseInt(b[key]) ? 1 : 0;
    });
    return array[0];
}
// 배열에서 특정 키값이 가장 큰 요소를 가져옴
function findArrayByKeyLargest(array, key) {
    if (array.length < 2) {
        return array[0];
    }
    array.sort(function(a, b) { // 내림차순
        return parseInt(a[key]) > parseInt(b[key]) ? -1 : parseInt(a[key]) < parseInt(b[key]) ? 1 : 0;
    });
    return array[0];
}

function getRefreshRemainSeconds(refresh_date, add_sec) {
    var temp = new Date(refresh_date);
    temp.setSeconds(temp.getSeconds() + add_sec);

    return Math.max(0, parseInt( ((temp - new Date()) / 1000) ) );
}



// Json의 특정 키값을 모두 더함
function keyTotalCount(jsonData, key, callback) {
    var maxTotal = 0;
    for(var i = 0; i < jsonData.length; i++) {
        if(typeof jsonData[i][key] == "number") {
            maxTotal += jsonData[i][key];
        }
    }
    callback(maxTotal);
}


// 특정 그룹을 해당하는 인덱스로 검색후 값의 배열 반환
function findGroupByIndexValue(jsonData, findName , value, getName) {
    var arr = [];
    for(var i = 0; i < jsonData.length; i++) {
        if(jsonData[i][findName] == value) {
            arr.push(jsonData[i][getName]);
        }
    }
    return arr;
}

// 정수 특정 범위 랜덤(n1 ~ n2) // n2 는 나오지않음.
function randomRange(n1, n2) {
    return Math.floor( (Math.random() * (n2 - n1)) + n1 );
}

// + 1
function randomRangeEnd(n1, n2) {
    return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

// 배열의 랜덤 아이템
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function clone(obj) {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = clone(obj[attr]);
        }
    }
    return copy;
}

// 유효성 패턴 체크 (길드 이름 체크할때 사용한다)
function validationCheck(name){
    var blank_pattern = /[\s]/g;
    var special_pattern = /[`~!@#$%^&*_()|\\\'\";:\+\-\=\/?]/gi;
    if(name == null) return false;
    else if(name == "") return false;
    else if(name.length > 14) return false;
    else if(blank_pattern.test(name) == true) return false;
    else if(special_pattern.test(name) == true) return false;
    else return true;
}

function getDateyyyyMMdd(date) {
    return date.toString().substring(0, 10).replace( /-/gi, "");
}


// percent success
function getPercentageSuccess(rate) {
    var rand = Math.random() * 100;

    if(rand < rate) {
        return true;
    }
    else {
        return false;
    }
}

// percent
function getPercentage(rate, total) {
    return parseInt(parseInt(rate) / parseInt(total) * 100);
}


global.StringBuffer = function() {
    this.buffer = new Array();
};
StringBuffer.prototype.append = function(str) {
    this.buffer[this.buffer.length] = str;
};
StringBuffer.prototype.toString = function() {
    return this.buffer.join("");
};


function arrSort(sortList, sortStandard){
    sortList.sort(function(a, b) {
        return a[sortStandard] < b[sortStandard] ? -1 : a[sortStandard] > b[sortStandard] ? 1 : 0;
    });
}
 
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/gi, "");
}

function trimAll(str) {
    return str.replace(/ /gi,"");
}

// 한글, 영문 별도 자리수 체크
function chkStrLength(str) {
    var len = 0;
    for(var i = 0; i < str.length; i++) {
        (str.charCodeAt(i)  > 255) ? len+=2 : len++;  // 한글체크
    }
    return len;
}

// 현재시간을 Datetime(YYYY-MM-DD HH:MI:SS)로 문자열 날짜로 반환한다. (24시간 표기)
function getCurrentDatetime() {
    return new Date().toFormat("YYYY-MM-DD HH24:MI:SS");
}

// 문자열에서 숫자만 추출한다.
function getNumberByString(str) {
    return parseInt(str.replace(/[^0-9]/g,""));
}

// json내 특정키 검색
function getLikeSearchColumnListByJson(searchText, jsonData){
    var search_list = [];
    for(var column in jsonData) {
        if( column.indexOf(searchText) == 0 ) {
            search_list.push(jsonData[column]);
        }
    }

    return search_list;
}

function dateAdd(setDate, addDay) {
    var date = new Date(setDate);
        date.setDate(date.getDate() + addDay);

    return date;
}

// 두 날짜간의 차이를 가져온다.
function betweenDateTermDay(a, b) {
    var a_date = new Date(a);
    var b_date = new Date(b);

    var term_result = (a_date > b_date) ? (a_date.getTime() - b_date.getTime()) : (b_date.getTime() - a_date.getTime());

    return Math.floor(term_result / 1000 / 60 / 60 / 24);
}

// 두 날짜간의 차이를 가져온다.
function betweenDateTermDayNotFormat(a, b) {
    var a_date = a;
    var b_date = b;

    var term_result = (a_date > b_date) ? (a_date.getTime() - b_date.getTime()) : (b_date.getTime() - a_date.getTime());

    return Math.floor(term_result / 1000 / 60 / 60 / 24);
}



// 두날짜간의 일자차를 가져옴
function getDateToDateTerm(date1, date2) {
    return Math.floor( (date1 - date2) / 1000 / 60 / 60 / 24 ) ;
}

// 두 날짜간의 날짜차의 배열을 생성하여 리턴
function getArrayDateToDateTerm(start_date, end_date) {
    var term = getDateToDateTerm(end_date, start_date);

    var dateArr = [];
    for(var i = 0; i < term; i++) {
        var tempDate = new Date(start_date.getTime());
        tempDate.setDate(start_date.getDate() + i);

        dateArr.push(tempDate);
    }
    return dateArr;
}

// 4자리 임의수
function createCertificateFourNumber() {
    var result = randomRange(0, 10000) + 1000;

    if(result > 10000) {
        result = result - 1000;
    }
    return result;
}

// 임의의 랜덤문자를 가져온다.
// random() 메서드의 활용하면 임의의 문자를 얻을수 있다. A~Z 사이의 문자랜덤.
// [조건]
// 1.A 부터 Z 까지의 문자의 수는 26 개이다
// 2.아스키코드는 65 부터 90 까지가 영문대문자를 표현한다.
function getRandomUpperChar() {
    return String.fromCharCode(parseInt(Math.random() * 26) + 65);
}

// 0~ 9까지 랜덤
function getRandomNumber() {
    return parseInt(Math.random() * 10);
}

// 임의 랜덤자리 수를 생성한다.
function createRandomKey(digit) {
    var buffer = new StringBuffer();

    for(var i = 0; i < digit; i++) {
        var nextBool = parseInt(Math.random() * 2);
        // true 시 숫자
        if(nextBool) {
            buffer.append(getRandomNumber());
        }
        else {
            buffer.append(getRandomUpperChar());
        }
    }

    return buffer.toString();
}



// 랭크와 레이팅으로 티어 확인
var findTierByRankRating = function(rating, rank) {
    logger.debug("rating : " + rating );
    logger.debug("rank : " + rank );

    // 랭크와 레이팅이 0 일수 없음.
    if(rank == 0 || rating == 0) return null;

    var DuelBattleTierBasicList  = xmlModule.getXmlData("DuelBattleTierBasicList");
    if(typeof DuelBattleTierBasicList  == "undefined" || DuelBattleTierBasicList  == null) return null;
    DuelBattleTierBasicList  = DuelBattleTierBasicList ["DuelBattleTierBasicList"];
    if(typeof DuelBattleTierBasicList  == "undefined" || DuelBattleTierBasicList  == null) return null;

    DuelBattleTierBasicList = DuelBattleTierBasicList["_itemList"];

    for(var i = 0; i < DuelBattleTierBasicList.length; i++) {
        var tearRank = parseInt(DuelBattleTierBasicList[i]["_tierRank"]);
        var tearRating = parseInt(DuelBattleTierBasicList[i]["_tierRating"]);

        // 티어랭크가 없으면 넘어감
        if(tearRank <= 0) {
            continue;
        }

        // 해당 티어 검색
        if( rank <= tearRank && rating >= tearRating) {
            logger.debug("find Tear");
            logger.debug(DuelBattleTierBasicList[i]);
            return DuelBattleTierBasicList[i];
        }
    }

    // 티어를 찾을수없음.
    return null;
};

// 레이팅으로 티어 확인
var findTierRating = function(rating) {
    logger.debug("rating : " + rating );

    var DuelBattleTierBasicList  = xmlModule.getXmlData("DuelBattleTierBasicList");
    if(typeof DuelBattleTierBasicList  == "undefined" || DuelBattleTierBasicList  == null) return null;
    DuelBattleTierBasicList  = DuelBattleTierBasicList ["DuelBattleTierBasicList"];
    if(typeof DuelBattleTierBasicList  == "undefined" || DuelBattleTierBasicList  == null) return null;

    DuelBattleTierBasicList = DuelBattleTierBasicList["_itemList"];

    // 레이팅이 제일 낮은 경우
    if( rating <  parseInt(DuelBattleTierBasicList[DuelBattleTierBasicList.length-1]["_tierRating"]) ){
        logger.debug("LOW RATING!");
        logger.debug( DuelBattleTierBasicList[DuelBattleTierBasicList.length-1] );
        return DuelBattleTierBasicList[DuelBattleTierBasicList.length-1];
    }

    for(var i = 0; i < DuelBattleTierBasicList.length; i++) {
        var tearRating = parseInt(DuelBattleTierBasicList[i]["_tierRating"]);
        var tearRank = parseInt(DuelBattleTierBasicList[i]["_tierRank"]);

        // 티어랭크가 존재하면 넘어감
        if(tearRank > 0) {
            continue;
        }

        // 해당 티어 검색(해당 티어의 레이팅보다 크거나 같으면)
        if(rating >= tearRating) {
            logger.debug("find Tear");
            logger.debug(DuelBattleTierBasicList[i]);
            return DuelBattleTierBasicList[i];
        }
    }

    // 티어를 찾을수없음.
    return null;
};

var getDuelTierInfo = function(user_index, user_rating, user_rank) {
    //
    var TierInfo = null;

    // 랭크가 존재할 경우
    if( !isNaN(user_rank) && user_rank != 0 ) {
        logger.debug("user_rank != 0 ");
        TierInfo = findTierByRankRating( parseInt(user_rating), parseInt(user_rank) );
    }

    if(TierInfo == null) {
        TierInfo = findTierRating(user_rating)
    }

    logger.debug( "getDuelBattleTier  === " );
    logger.debug( TierInfo );
    logger.debug( "getDuelBattleTier  end === " );

    return TierInfo;
};

// 영혼장비(object) 코드, 레벨 => 영혼장비 풀코드
function getSoulItemCode(code, level) {
    if(level.toString().length <= 1) level = "0" + level;
    return code.toString() + level.toString();
}

// 영혼장비 풀코드 => 영혼장비(object) 코드, 레벨
function soulItemInfoByFullCode(full_code) {
    var soul_item_obj= {};
        soul_item_obj.code = Math.floor(full_code / 100);
        soul_item_obj.level = Math.floor(full_code % 100);

    return soul_item_obj;
}

function getChallengeModeXml(mode_type) {
    var ModeBasicList = null;
    //
    if(mode_type == defineSet.BATTLE_MODE_GROWTH_DUNGEON) {
        ModeBasicList = xmlModule.getXmlData("GrowthModeBasicList");
    }
    else if(mode_type == defineSet.BATTLE_MODE_RUNE_DUNGEON) {
        ModeBasicList = xmlModule.getXmlData("RuneModeBasicList");
    }
    else if(mode_type == defineSet.BATTLE_MODE_EVENT_DUNGEON) {
        ModeBasicList = xmlModule.getXmlData("EventModeBasicList");
    }

    return ModeBasicList;
}

// object 배열로 변환
function objectToArray(jsonData) {
    if(isArray(jsonData) == true) {
        return jsonData;
    }
    else {
        var arr = [];
        arr.push(jsonData);
        return arr;
    }
}

function toStringByIndex(index) {
    if(typeof index == "undefined" || index == null) {
        index = 0;
    }
    return index.toString();
}


function randomExcute(loggingStr, callback) {
    var random = randomRange(1, 10);
    var excuteTime = random * 1000;

    setTimeout(function(){
        console.log("randomExcute-excuteTime:" + excuteTime + " / item:" + loggingStr);
        callback(null);
    }, excuteTime);
}


exports.isArray = isArray;
exports.findArrayByIndex = findArrayByIndex;
exports.findArrayIndexByKeyValue = findArrayIndexByKeyValue;
exports.clone = clone;
exports.findItemListByIndex = findItemListByIndex;
exports.findGroupByIndex = findGroupByIndex;
exports.findGroupByIndexValue = findGroupByIndexValue;
exports.getRefreshRemainSeconds = getRefreshRemainSeconds;
exports.keyTotalCount = keyTotalCount;
exports.randomRange = randomRange;
exports.randomRangeEnd = randomRangeEnd;
exports.randomItem = randomItem;
exports.validationCheck = validationCheck;
exports.getDateyyyyMMdd = getDateyyyyMMdd;
exports.getPercentageSuccess = getPercentageSuccess;
exports.getPercentage = getPercentage;
exports.arrSort = arrSort;
exports.trim = trim;
exports.trimAll = trimAll;
exports.chkStrLength = chkStrLength;
exports.getCurrentDatetime = getCurrentDatetime;
exports.getNumberByString = getNumberByString;
exports.getLikeSearchColumnListByJson = getLikeSearchColumnListByJson;
exports.betweenDateTermDay = betweenDateTermDay;
exports.betweenDateTermDayNotFormat = betweenDateTermDayNotFormat;
exports.createCertificateFourNumber = createCertificateFourNumber;
exports.createRandomKey = createRandomKey;
exports.getDuelTierInfo = getDuelTierInfo;
exports.dateAdd = dateAdd;
exports.findArrayByKeyLargest = findArrayByKeyLargest;
exports.findArrayByKeySmallest = findArrayByKeySmallest;
exports.getSoulItemCode = getSoulItemCode;
exports.soulItemInfoByFullCode= soulItemInfoByFullCode;
exports.getChallengeModeXml= getChallengeModeXml;
exports.objectToArray = objectToArray;
exports.toStringByIndex = toStringByIndex;
exports.randomExcute = randomExcute;

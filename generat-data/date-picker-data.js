/**
 * Created by 2ue on 2018/1/4.
 */


const request = require('request');
const iconv = require('iconv-lite');

//N表示心里
//O表示旧历

const oldYear = 11;

var shuzi = '一二三四五六七八九十';
var chu = '初十廿三';

function getUrl(year) {
    return `http://data.weather.gov.hk/gts/time/calendar/text/T${year}c.txt`
}

const getData = function (year) {
    if(!year) return [];
    return new Promise(function (resolve,reject) {
        request({ url: getUrl(year), encoding: null }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('========request success==========');
                //gbk 或者 gb2312 都可以
                resolve(iconv.decode(body, 'big5').toString());
            }else {
                reject(error);
            }
        });
    })
};
getData(year).then(function (res) {
    var arr = JSON.parse(JSON.stringify(res.split(/\n/)).replace(/\s+/g,' '));
    arr = arr.splice(3,arr.length);
    console.log(arr);
    var res = {};
    res[year] = {};
    arr.map(function (item,index) {
        var info = item.split(' ');

        var temp = {}, N_date = info[0].replace(/[^0-9]/g,'-'), O_date = info[1].split('');

    })
});

//把旧历汉字转换成数字
function countOldToNum(text){
    let textArr = text.split('');
    var num =  textArr.length < 2 ? shuzi.indexOf(text) + 1 : textArr.reduce( (prev, curr) => chu.indexOf(prev) * 10 + shuzi.indexOf(curr) + 1 );
    return num > 30 ? 30 : num;
}

/**
 * Created by 2ue on 2018/1/4.
 */
//lunar农历，阴历
//solar阳历，太阳历
//divisions节气，分支
const request = require('request');
const iconv = require('iconv-lite');

//N表示心里
//O表示旧历

let lunarYear = 1900, lunarMon = 11;

var nmCN = '一二三四五六七八九十';
var lunarCN = '初十廿三';

//把旧历汉字转换成数字
function countOldToNum(text) {
    let textArr = typeof text === 'object' ? text : text.split('');
    var num = textArr.length < 2 ? nmCN.indexOf(text) + 1 : textArr.reduce((prev, curr) => lunarCN.indexOf(prev) * 10 + nmCN.indexOf(curr) + 1);
    return num > 30 ? 30 : num;
}
function getUrl(year) {
    return `http://data.weather.gov.hk/gts/time/calendar/text/T${year}c.txt`
}

const getData = function (year) {
    if (!year) return [];
    return new Promise(function (resolve, reject) {
        request({ url: getUrl(year), encoding: null }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(iconv.decode(body, 'big5').toString());
            } else {
                reject(error);
            }
        });
    })
};
function ggg(year) {
    getData(year).then(function (res) {
        var arr = JSON.parse(JSON.stringify(res.split(/\n/)).replace(/\s+/g, ' ').replace(/二十/g, lunarCN[1] + lunarCN[1]).replace(/正/g, nmCN[0]));
        arr = arr.splice(3, arr.length - 5);
        var res = {};
        res[year] = {};
        arr.map(function (item, index) {
            var info = item.split(' ');
            var temp = true, solar = info[0].split(/[^0-9]/), lunar = info[1].split(''), divisions = info[3];
            solar = solar.splice(0, solar.length - 1).join('-');
            //判断是否带月，带月表示当前月第一天
            if (lunar[lunar.length - 1] === '月') {
                lunarMon = countOldToNum(lunar.splice(0, lunar.length - 1));
                //防止润一月时，lunarYear重复加
                if (lunarMon === 1 && temp) {
                    lunarYear = lunarYear + 1;
                    temp = false;
                }
                lunar = '一';
            }
            lunar = `${lunarYear}-${lunarMon}-${countOldToNum(lunar)}`;
            res[year][solar] = { solar, lunar, divisions };
        })
        console.log(res);
    });
}

ggg(lunarYear + 1)

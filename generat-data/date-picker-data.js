/**
 * Created by 2ue on 2018/1/4.
 */

//lunar农历，阴历
//solar阳历，太阳历
//divisions节气，分支

const fs = require('fs');
const path = require('path');
const request = require('request');
const iconv = require('iconv-lite');

//遍历开始和结束的年份
let startYear = 1901, endYear = 2100;
//开始遍历的阴历年月
let lunarYear = 1900, lunarMon = 11;

//数字对应汉字
const nmCN = ['一','二','三','四','五','六','七','八','九','十'];
//数字对应的旧历汉字
const lunarCN = ['初','十','廿','三'];
//数字对应的星期数
const weekText = ['一','二','三','四','五','六','日'];

//把旧历汉字转换成数字
function countOldToNum(text) {
    let textArr = typeof text === 'object' ? text : text.split(''), num = textArr.length < 2 ? nmCN.indexOf(text) + 1 : textArr.reduce((prev, curr) => lunarCN.indexOf(prev) * 10 + nmCN.indexOf(curr) + 1);
    return num > 30 ? 30 : num;
}
function getUrl(year) {
    return `http://data.weather.gov.hk/gts/time/calendar/text/T${year}c.txt`
}

//解析页面
function getHtml (year) {
    if (!year) return [];
    return new Promise(function (resolve, reject) {
        request({ url: getUrl(year), encoding: null }, function (error, response, body) {
            console.log(`=== 开始抓取 ===>  ${getUrl(year)}`);
            if (!error && response.statusCode === 200) {
                resolve(iconv.decode(body, 'big5').toString());
            } else {
                reject(error);
            }
        });
    })
};
//写入数据
function writeData(data,year,cb) {

    const dataPath = path.relative(__dirname, './date-year1'), targetPath = path.join(dataPath,`/${year}.json`);

    //dataPath目录是否存在，一个可写入的流
    let dataPathIsExists, writerStream;

    //判断dataPath目录是否存在
    dataPathIsExists = fs.existsSync(dataPath);

    //如果不存在就创建
    if (!dataPathIsExists) {
        fs.mkdir(dataPath, function (err) {
            if (err) {
                console.log(`=====${year} 目录创建失败！${year} =====`);
                return console.error(err);
            }
            console.log(`=====${year} 目录创建成功！${year} =====`);
        });
    };

    //创建一个可写入的流
    writerStream = fs.createWriteStream(targetPath);
    writerStream.write(JSON.stringify(data, null, 4), 'utf-8');
    writerStream.end();//标记结束
    writerStream.on('finish', function () {
        console.log(`=====${year} 数据写入完成！ ${year}=====`);
    }).on('error', function (err) {
        console.log(err.stack);
        console.log(`=====${year} 数据写入失败！ ${year}=====`);
    });
    if(year < endYear) setTimeout(function () {
        cb(year+1);
    },1500);
}

function resolveHtml(year) {
    getHtml(year).then(function (data) {
        var result = {};
        var arr = JSON.parse(JSON.stringify(data.split(/\n/)).replace(/\s+/g, ' ')
        .replace(/二十/g, lunarCN[1] + lunarCN[1])//将汉字二十转换成十十，以便正确计算
        .replace(/正/g, nmCN[0]));//将汉字正月中正转换成一，以便正确计算
        //去除开始和尾部的多余数据
        arr = arr.splice(3, arr.length - 5);
        arr.map(function (item) {
            console.log('item==>',item)
            if(item && item.replace(/\s/g,'')){
                var info = item.split(' ');
                var temp = true, solar = info[0].split(/[^0-9]/), lunar = info[1].split(''), divisions = info[3], weekday = weekText.indexOf(info[2].split('')[2]);
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
                result[solar] = {solar,lunar, divisions,weekday};
            }
        });
        writeData(result,year,function (y) {
            resolveHtml(y)
        });
    });
}

resolveHtml(startYear);

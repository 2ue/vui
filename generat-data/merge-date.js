/**
 * Created by 2ue on 2018/1/5.
 */

//合并采集到的数据
//date-year目录

var fs = require('fs');
var path = require('path');

//遍历结束的年份
var startYear = 1901, endYear = 2100;
var res = {
    solarInfo:{},
    lunarInfo:{}
};

for(startYear; startYear <= endYear; startYear++){
    var data = JSON.parse(fs.readFileSync(`./date-year/${startYear}.json`, 'utf8'));
    res.solarInfo = {...res.solarInfo,...data.solarInfo};
    res.lunarInfo = {...res.lunarInfo,...data.lunarInfo};
};

//汇总
const allTargetPath = path.join(__dirname,'./date-year/all.json');
writeJsonData(res,allTargetPath,'阴历阳历');
//阴历
const solarTargetPath = path.join(__dirname,'./date-year/solar.json');
writeJsonData(res.solarInfo,solarTargetPath,'阳历');
//阳历
const lunarTargetPath = path.join(__dirname,'./date-year/lunar.json');
writeJsonData(res.lunarInfo,lunarTargetPath,'阴历');

function writeJsonData(data,path,msg) {
    let writerStream;
    //创建一个可写入的流
    writerStream = fs.createWriteStream(path);
    writerStream.write(JSON.stringify(data, null, 4), 'utf-8');
    writerStream.end();//标记结束
    writerStream.on('finish', function () {
        console.log(`=====  ${msg}汇总数据汇总成功！ =====`);
    }).on('error', function (err) {
        console.log(err.stack);
        console.log(`=====  ${msg}汇总数据汇总失败！ =====`);
    });
}

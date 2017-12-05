/*
 * @Author: 2ue
 * @Date: 2017-12-05 19:21:04
 * @Last Modified by: 2ue
 * @Last Modified time: 2017-12-05 19:27:29
 * @Function: 一个生成数据的公共方法
 */

const fs = require("fs");
const path = require('path');
const Mock = require('mockjs'); //数据模拟

function genrateJson(rules, targert) {
    //json目录
    const dataPath = path.relative(__dirname, './data');
    //json目录下对应的目标json文件
    const filePath = path.join(__dirname, dataPath, targert);

    //数据，json目录是否存在，一个可写入的流
    let data, dataPathIsExists, writerStream;

    //生成数据
    data = Mock.mock(rules);

    //判断dataPath目录是否存在
    dataPathIsExists = fs.existsSync(dataPath);

    //如果不存在就创建
    if (!dataPathIsExists) {
        fs.mkdir(dataPath, function (err) {
            if (err) {
                console.log("===== 目录创建失败！ =====");
                return console.error(err);
            }
            console.log("===== 目录创建成功！ =====");
        });
    };

    //创建一个可写入的流
    writerStream = fs.createWriteStream(filePath);
    writerStream.write(JSON.stringify(data, null, 4), 'utf-8');
    writerStream.end();//标记结束
    writerStream.on('finish', function () {
        console.log("===== 数据写入完成！ =====");
    }).on('error', function (err) {
        console.log(err.stack);
        console.log('===== 数据写入失败！ =====');
    });
}

module.exports = genrateJson;

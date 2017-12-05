/*
* @Author: 2ue
* @Date: 2017-11-27 14:26:51
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-05 12:57:21
* @Function: 生成菜单数据
* @Describtion: 生成菜单数据
*/

'use strict';

const fs = require("fs");
const path = require('path');
const Mock = require('mockjs'); //数据模拟

//json目录
const dataPath = path.relative(__dirname, './data');
//json目录下对应的目标json文件
const filePath = path.join(__dirname, dataPath, '/menu.json');

//数据，json目录是否存在，一个可写入的流
let data, dataPathIsExists, writerStream;

//生成数据
data = Mock.mock({
    // 属性 selectList 的值是一个数组，其中含有 1 到 20 个元素
    'items|3-8': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'name': '@name',
        'cname': '@name',
        'showChildren': false,//是否显示子集元素
        "children|2-4": [{
            'id|+1': 1001,
            'name': '@name',
            'cname': '@name',
            'showChildren': false,
            "children|3-8": [{
                'id|+1': 1001001,
                'name': '@name',
                'cname': '@name',
            }]
        }]
    }]
});

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

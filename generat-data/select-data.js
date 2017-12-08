/*
 * @Author: 2ue
 * @Date: 2017-12-05 19:28:51
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-08 14:43:11
 * @Fucntion: 生成一个级联选择数据
 */

const genrateJson = require('./common');

const rules = {
    'items|3': [{
        'id|+1': 1,
        'value': '@cname',
        "children|2-3": [{
            'id|+1': 1001,
            'value': '@name',
            "children|1-2": [{
                'id|+1': 1001001,
                'value': '@zip',
            }]
        }]
    }],
    'item|3-6': [{
        'id|+1': 1,
        'value': '@cname'
    }]
}

genrateJson(rules, '/select.json');

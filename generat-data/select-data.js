/*
 * @Author: 2ue
 * @Date: 2017-12-05 19:28:51
 * @Last Modified by: 2ue
 * @Last Modified time: 2017-12-05 21:06:02
 * @Fucntion: 生成一个级联选择数据
 */

const genrateJson = require('./common');

const rules = {
    'items|3-8': [{
        'id|+1': 1,
        'value': '@cname',
        "children|2-4": [{
            'id|+1': 1001,
            'value': '@name',
            'showChildren': false,
            "children|3-8": [{
                'id|+1': 1001001,
                'value': '@zip',
            }]
        }]
    }]
}

genrateJson(rules, '/select.json');

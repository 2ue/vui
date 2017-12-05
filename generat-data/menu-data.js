/*
 * @Author: 2ue
 * @Date: 2017-12-05 19:29:41
 * @Last Modified by: 2ue
 * @Last Modified time: 2017-12-05 19:30:03
 * @Function: 生成一个多级菜单数据
 */

const genrateJson = require('./common');

const rules = {
    // 属性 selectList 的值是一个数组，其中含有 1 到 20 个元素
    'items|3-8': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'name': '@name',
        'cname': '@cname',
        'showChildren': false,//是否显示子集元素
        "children|2-4": [{
            'id|+1': 1001,
            'name': '@name',
            'cname': '@cname',
            'showChildren': false,
            "children|3-8": [{
                'id|+1': 1001001,
                'name': '@name',
                'cname': '@cname',
            }]
        }]
    }]
}

genrateJson(rules, '/menu.json');

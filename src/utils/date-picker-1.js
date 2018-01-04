/**
 * Created by 2ue on 2018/1/4.
 */

//数据采集
//http://data.weather.gov.hk/gts/time/calendar/text/T1902c.txt

var gan = '甲乙丙丁戊己庚辛壬癸'.split('');
var zhi = '子丑寅卯辰巳午未申酉戌亥'.split('');
var xiao = '鼠牛虎兔龙蛇马羊猴鸡狗猪'.split('');
var shuzi = '一二三四五六七八九十';
var chu = '初十廿';



//1901辛丑-肖牛
//1902(壬寅-肖虎)


//修正年月
function fixedYM(year, month) {
    if (+month === 0) {
        year = +year - 1;
        month = 12;
    };

    if (+month === 13) {
        year = +year + 1;
        month = 1;
    };
    return [year, month];
}

//获取天干
function getGan(year) {
    return gan[(year + 6) % 10];
}
//获取地支
function getZi(year) {
    return zhi[(year - 4) % 12];
}
//获取生肖
function getXiao(year) {
    return xiao[(year - 4) % 12];
}

//获取某年的某月有多少天
function getMonthDays(year, month) {
    const YM = fixedYM(year, month);
    return new Date(YM[0], YM[1], 0).getDate();
}
//返回某年某月某日是星期几
function getWeekday(year, month, day){
    const YM = this.fixedYM(year, month);
    return new Date(YM[0], YM[1] - 1, day).getDay();
}

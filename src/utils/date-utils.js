const dateUtils = {};

// dateUtils.compareDate = (date1, date2) => {

// }

/*距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期
* 如-1表示昨天的日期，0表示今天，2表示后天
*/

dateUtils.fromToday = (days) => {
    var today = new Date();
    today.setDate(today.getDate() + days);
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    return date;
};

/* 两个时间差
 * day
 */
dateUtils.diffDays = (time1, time2) => {
    var days = (time1.getTime() - time2.getTime()) / 86400000;  
    return days;
};

export default dateUtils;
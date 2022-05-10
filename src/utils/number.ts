// 播放量数据格式化
export function useNumberFormat(number: any): string | number {
    if (number > 100000000) {
        return Number((number / 100000000).toFixed(1)) + ' 亿';
    }
    if (number > 10000000) {
        return Number((number / 10000000).toFixed(1)) + ' 千万';
    }
    if (number > 10000) {
        return Number((number / 10000).toFixed(1)) + ' 万';
    }
    return number;
}

// 转换成秒
export function formatSec(time:number) {
    time = Math.ceil(time)
    let secondTime
    let m = ((time % (1000 * 60 * 60)) / (1000 * 60))
    let s = ((time % (1000 * 60)) / 1000)
    secondTime = Number(m * 60 + s)
    console.log(secondTime)
    return secondTime
}

/**
 * @author 梁予安
 * @date 2022/04/29 18:00:00
 * @function formatNum
 * @description 保留n位小数,不四舍五入,整数补末尾补0.
 * @param num [string | number] 需要处理的数值
 * @param precision number  需要保留的小数位数
 * @returns {string} 经过处理后的数值
 * @example formatNum(12345.6789, 2) // ->12345.68
 */
export default function formatNum(num: number | string, precision = 2): string {
  if (typeof num === "number") {
    num = num.toString();
  }
  const [int, decimal] = num.split(".");
  if (decimal) {
    return `${int}.${decimal.substring(0, precision)}`;
  }
  return `${int}.${"0".repeat(precision)}`;
}

/**
 * @function shuffle 数组洗牌算法
 * @param {array} [arr] 需要操作的数组
 * @return {array} 经过洗牌算法处理后的结果
 * */
export default (arr: number[]) => {
  let result = [],
    random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result;
}
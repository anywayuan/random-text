/**
 * @function flat 数组扁平化处理
 */
const flat = (arr: any[]) => {
  let newArr: any[] = [];
  for (const i of arr) {
    if (Array.isArray(i)) {
      newArr = [...newArr, ...flat(i)];
    } else {
      newArr.push(i);
    }
  }
  return newArr;
};

export default flat;

// eslint-disable-next-line consistent-return
export function copy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof Array) {
    return obj.reduce((arr, item, index) => {
      arr[index] = copy(item);
      return arr;
    }, []);
  }
  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = copy(obj[key]);
      return newObj;
    }, {});
  }
}

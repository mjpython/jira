// 当结果不为0或其他有效值时返回假（其他false时触发）
export const isFalsy = (value) => (value === 0 ? false : !value);
// 删除值为空的对象的关键字
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

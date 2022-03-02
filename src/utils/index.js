// 当结果不为0或其他有效值时返回假（其他false时触发）
import { useEffect, useState } from "react";
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

export const useMount = (callback) => {
  useEffect(() => {
    callback(); // eslint-disable-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout); //useEffect的返回值会在下一个useEffect调用时调用
  }, [value, delay]);
  return debouncedValue;
};

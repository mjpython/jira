// 当结果不为0或其他有效值时返回假（其他false时触发）
import { useEffect, useState } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// 删除值为空的对象的关键字
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 初始化页面didmount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback(); // eslint-disable-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 小练习数组操作
export const useArray = <v>(arr: v[]) => {
  const [value, setValue] = useState(arr);
  return {
    value,
    setValue,
    add: (item: v) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

// 去抖
export const useDebounce = <v>(value: v, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout); //useEffect的返回值会在下一个useEffect调用时调用
  }, [value, delay]);
  return debouncedValue;
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);
  // 进入页面，离开页面（销毁组件时执行）
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};

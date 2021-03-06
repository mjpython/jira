// 当结果不为0或其他有效值时返回假（其他false时触发）
import { useEffect, useRef, useState } from "react";
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
  //新方法使用useRef的特性（在生命周期中不会发生更改）
  const oldTitle = useRef(document.title).current;
  // const oldTitle = document.title;
  // 旧方法利用了闭包的坑的特性，不好理解
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
  }, [keepOnUnmount, oldTitle]);
};
// 路由重置跳转
export const resetRoute = () => (window.location.href = window.location.origin);
// 判断组件是否已经挂载成功
export const useMountedRef = () => {
  const montedRef = useRef(false);
  useEffect(() => {
    montedRef.current = true;
    return () => {
      montedRef.current = false;
    };
  });
  return montedRef;
};

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

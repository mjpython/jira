import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

//返回页面url中，指定键的参数值

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    setSearchParam,
  ] as const;
  //  as const解释
  //  const a= ['123']  a的类型是sting【】
  //  const b=['123'] as const b的类型是['123']
};

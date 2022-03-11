// 在真实环境中，如果使用firebase这种第 三方auth服务的话，本文件不需要开发者开发
import { User } from "screens/project-list/search-panel";
const apiUrl = process.env.REACT_APP_API_URL;

// token在localstorage中的键名
const localStorageKey = "__auth__provider_token__";
// 获取token
export const getToken = () => window.localStorage.getItem(localStorageKey);
// 登录或注册成功时设置token
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};
// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};
// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};
// 登出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);

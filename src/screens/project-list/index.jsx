import React from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import qs from 'qs';
import { cleanObject } from 'utils'
import { useState, useEffect } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]); //负责人列表
  const [list, setList] = useState([]); //项目列表
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

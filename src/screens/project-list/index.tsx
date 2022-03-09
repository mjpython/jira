import React from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import { cleanObject, useMount, useDebounce } from "utils";
import { useState, useEffect } from "react";
import { useHttp } from "utils/http";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]); //负责人列表
  const [list, setList] = useState([]); //项目列表
  const client = useHttp();
  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

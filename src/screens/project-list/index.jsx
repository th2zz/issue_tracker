import qs from "qs";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../util";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
// 感兴趣的可以了解下 debounce类似的hrottle ?
// https://www.youtube.com/watch?v=cjIswDCKgu0

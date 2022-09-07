import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7777/users").then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} />
    </div>
  );
};

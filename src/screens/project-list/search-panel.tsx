export interface User {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string,
}
interface SearchPanelProps {
  users: User[],
  param: {
    name: string;
    personId: string;
  },
  setParam: (param:SearchPanelProps['param']) => void;
}
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name} //input发生改变 设置state param; spread operator覆盖之前的只改一个字段
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
        <select
          value={param.personId}
          onChange={(e) =>
            setParam({
              ...param,
              personId: e.target.value,
            })
          }
        >
          <option value={""}>Person</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

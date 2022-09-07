export const SearchPanel = ({ param, setParam, users }) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name} //input发生改变 设置state
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
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

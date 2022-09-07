export const List = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>owner</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr>
            <td>{project.name}</td>
            <td>{project.personName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

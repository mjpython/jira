import React from "react";

const SearchPanel = ({ users, setParam, param }) => {

  return (
    <div>
      <input
        type="text"
        value={param.name}
        onChange={(ev) =>
          setParam({
            ...param,
            name: ev.target.value,
          })
        }
      />
      <select
        value={param.personId}
        onChange={(ev) => {
          setParam({
            ...param,
            personId: ev.target.value,
          });
        }}
      >
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};
export default SearchPanel;

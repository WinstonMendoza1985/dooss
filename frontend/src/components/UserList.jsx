import axios from 'axios';
import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3007/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
    {console.log(users)}
      <h2>All Users</h2>
      {users.map(user => (
        <div key={user._id}>{user.first_name} {user.last_name}</div>
      ))}
    </div>
  );
}

export default UserList;

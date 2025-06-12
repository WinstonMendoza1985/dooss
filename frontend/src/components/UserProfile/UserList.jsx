import axios from 'axios';
import {Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import Navigator from '../Navigator';

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3007/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const columns = [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Name' },
        { id: 'phone', label: 'Phone' },
        { id: 'email', label: 'Email' }
    ];

  const UserList = users.map((l) => ({
      id: l._id,
      name: l.last_name+', '+l.first_name,
      phone: l.phone,
      email: l.email
  }));

  const handleAdd = () => {
      //alert('Add button clicked');
      // You could open a dialog or form here
      navigate('/register');
  };

  const handleEdit = (UserList) => {
      //alert(`Edit user: ${UserList.action}`);
      //let url = `/book/edit/${UserList.action}`;
      // You could open a form pre-filled with this row's data
  };

  return (
    <div>
      <Navigator />
      <DataTable columns={columns} rows={UserList} onAdd={handleAdd} title="Clients List" />
    </div>
  );
}

export default UserList;

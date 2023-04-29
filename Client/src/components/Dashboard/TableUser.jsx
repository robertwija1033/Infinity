import axios from "axios";
import { useEffect, useState } from "react";

const TableUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios
      .get("http://localhost:8080/users")
      .catch((err) => {
        console.log(err);
      });

    setUsers(response.data);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, key) => (
          <tr key={key}>
            <td data-label="ID">{user.id}</td>
            <td data-label="Nama pelanggan">{user.fullName}</td>
            <td data-label="date">{user.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUser;

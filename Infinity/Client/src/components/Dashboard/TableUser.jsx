import axios from "axios";
import { useEffect, useState } from "react";

const TableUser = () => {
  // const [url, setUrl] = useState({
  //   email: "",
  //   password: "",
  //   url: "http://localhost:3000/tes",
  // });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/index.php", {
        url: "http://localhost:3000/tes",
      })
      .then(function (response) {
        setUsers(response.data);
      });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama pelanggan</th>
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

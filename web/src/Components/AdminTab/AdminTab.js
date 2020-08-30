import React, { useState, useEffect } from "react";
import { Table } from "./Table";

function AdminTab({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error("Error fetching users", res);
        }
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => [console.log(err)]);
  });

  return (
    <div className="AdminTab">
      <div className="container">
        <div style={{ height: "300px", overflowY: "auto" }}>
          <Table
            tableHeader={[
              "Username",
              "First",
              "Last",
              "Role",
              "Email",
              "Varify",
            ]}
          >
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <th scope="row">{user.user_name}</th>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  {!user.varified && (
                    <td>
                      <button className="btn btn-sm btn-primary">Varify</button>
                    </td>
                  )}
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminTab;

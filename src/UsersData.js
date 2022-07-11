import React, { useEffect, useState } from "react";
import "./App.css";
import Users from "./Users.js";

function UsersData() {
  const [users, setUsers] = useState();
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/users")
        .then((res) => {
          if (!res.ok) {
            setLoading(false);
            throw Error("Error");
          }
          return res.json();
        })
        .then((data) => {
          if (data !== {}) {
            setUsers(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("Error message: ", err);
        });
    }, 500);
  }, []);

  return (
    <div className="home">
      {isLoading && <div className='loading'>Loading...</div>}
      {users && <Users users={users}/>}
      {!users && !isLoading && <div>Nema dostupnih blogova</div>}
    </div>
  );
}

export default UsersData;

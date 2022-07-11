import React, { useEffect, useState } from 'react'
import './App.css';
import EditModal from './modal/EditModal.js';
import {Link, NavLink} from 'react-router-dom';



function Developers() {
    const [users, setUsers] = useState();
    const [updateUsers, setUpdateUser] = useState();
    const [isLoading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");
    const [openEditModal, setOpenEditModal] = useState(false);

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
        }, 1000);
      }, []);

      let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
      };
    
      const usersFilter = users && users.filter((el) => {
        const nameFilter = el.first_name + " " + el.last_name + " " + el.email + " " + el.city + " " + el.role + " " + el.status;
        if (inputText === "") {
          return el;
        } else {
          return nameFilter.toLowerCase().includes(inputText);
        }
      });

      return (
        <div className="container-user">
          {isLoading && <div className='loading'>Loading...</div>}
          {users && (
          <div className="table">
            <div className="search">
              <img src="./images/lupa.png"></img>
              <input type="text" id="myInput" onChange={inputHandler} variant="outlined" placeholder="Search"></input>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="border-left">Avatar</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                 {usersFilter.map((info, index) => {
                  return (
                    <tr key={index}>
                      <td className="avatar-and-options avatar">
                        <img src={info.avatar.image_path}></img>
                      </td>
                      <td>{info.first_name}</td>
                      <td>{info.last_name}</td>
                      <td className="options">
                        <a onClick={() => {
                            setOpenEditModal(true);
                            setUpdateUser(info.id);
                          }}>
                          <img src="./images/icons/edit-3.svg" className="edit-btn"></img>
                        </a>
                        <Link to={`/userProfile/${info.id}`}>
                          <img src="./images/icons/eye.svg" alt="view"></img>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
          </div>
          )}
          
          {openEditModal && <EditModal users={users} updateUsers={updateUsers} closeEditModal={setOpenEditModal} />}
        </div>
      );
}

export default Developers;
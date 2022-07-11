import React, { useState } from "react";
import AddUser from "./modal/AddUser.js";
import ModalDelete from "./modal/ModalDelete.js";
import EditModal from "./modal/EditModal.js";
import { Link } from "react-router-dom";
import "./App.css";

function Users({ users }) {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [id, setId] = useState();
  const [inputText, setInputText] = useState("");
  const [updateUsers, setUpdateUser] = useState();


  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = users.filter((el) => {
    const nameFilter = el.first_name + " " + el.last_name + " " + el.email + " " + el.city + " " + el.role + " " + el.status;
    if (inputText === "") {
      return el;
    } else {
      return nameFilter.toLowerCase().includes(inputText);
    }
  });

  return (
    <div className="container-user">
      <div className="table">
        <div className="search">
          <img src="./images/lupa.png"></img>
          <input type="text" id="myInput" onChange={inputHandler} variant="outlined" placeholder="Search"></input>
          <input type="button" className="btn" onClick={() => {setOpenModal(true);}} value="Add user"></input>
        </div>
        <table>
          <thead>
            <tr>
              <th className="border-left">Avatar</th>
              <th>First name</th>
              <th>Last name</th>
              <th>City</th>
              <th>Role</th>
              <th>Status</th>
              <th>Email</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((info, index) => {
              return (
                <tr key={index}>
                  <td className="avatar-and-options avatar">
                    <img src={info?.avatar?.image_path}></img>
                  </td>
                  <td>{info.first_name}</td>
                  <td>{info.last_name}</td>
                  <td>{info.city}</td>
                  <td>{info.role}</td>
                  <td>{info.status}</td>
                  <td>{info.email}</td>
                  <td className="avatar-and-options">
                    <span onClick={() => {
                        setOpenEditModal(true);
                        setUpdateUser(info.id);
                      }}>
                      <img src="./images/icons/edit-3.svg" className="edit-btn"></img>
                    </span>
                    <Link to={`/userProfile/${info.id}`} >
                      <img src="./images/icons/eye.svg" alt="view"></img>
                    </Link>
                    <span onClick={() => {
                        setOpenDeleteModal(true);
                        setId(info.id);
                      }}
                      className="delete-btn">
                      <img src="./images/icons/trash-2.svg" alt="delete"></img>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {openModal && <AddUser closeModal={setOpenModal} />}
      {openDeleteModal && ( <ModalDelete id={id} closeModalDelete={setOpenDeleteModal} />)}
      {openEditModal && <EditModal users={users} updateUsers={updateUsers} closeEditModal={setOpenEditModal} />}
    </div>
  );
}

export default Users;

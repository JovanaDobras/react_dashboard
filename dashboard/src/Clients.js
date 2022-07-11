import React, { useEffect, useState } from "react";
import "./App.css";
import ModalDelete from "./modal/ModalDelete.js";
import EditClientModal from "./modal/EditClientModal.js";
import TimeModal from "./modal/TimeModal.js";
import DollarsModal from "./modal/DollarsModal.js";
import NewClient from "./modal/NewClient.js";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Clients({ clients, url }) {
  
  const [openDeleteModal, setOpenDeleteModal] = useState(false); /*delete*/
  const [openEditClientModal, setOpenEditClientModal] = useState(false); /*edit-client*/
  const [openTimeModal, setOpenTimeModal] = useState(false); /*time-modal*/
  const [openDollarsModal, setOpenDollarsModal] = useState(false); /*dollars-modal*/
  const [openNewClientModal, setOpenNewClientModal] = useState(false); /*new-client*/
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const [idEdit, setIdEdit] = useState();
  const [id, setId] = useState();
  

    let inputHandler = (e) => {
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase); 
    };
  
    const filteredData = clients.filter((el) => {
      const nameFilter = el.client_name;
      if (inputText === '') {

        return el;
      }
      else {
          return nameFilter.toLowerCase().includes(inputText);
      }
  })

  return (
    <div className="container-user">
      <div className="table">
        <div className="search">
          <img src="./images/lupa.png"></img>
          <input type="text" id="myInput" onChange={inputHandler} variant="outlined" placeholder="Search"></input>
          <input type="button" className="btn" onClick={() => {setOpenNewClientModal(true);}} value="Add user"></input>
        </div>
        <table>
          <thead>
            <tr>
              <th className="border-left">Avatar</th>
              <th>Client name</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>  
          {filteredData.map((info, index) => {
            return (
              <tr key={index}>
                <td className="avatar-and-options avatar">
                  <img src={info.avatar}></img>
                </td>
                <td>{info.client_name}</td>
                <td className="options">
                  <button onClick={() => {
                      setOpenTimeModal(true);}}className="time eye-btn">
                    <img src="./images/icons/clock.svg" alt="clock" />
                  </button>
                  <button className="eye-btn" onClick={() => {
                      setOpenEditClientModal(true);
                      setId(info.id);
                    }}>
                    <img
                      src="./images/icons/edit-3.svg"
                      className="edit-btn"
                    ></img>
                  </button>
                  <NavLink to={`/clientProfile/${info.id}`} className="eye-btn">
                    <img src="./images/icons/eye.svg" alt="view"></img>
                  </NavLink>
                  {/* <NavLink to={`/clientProfile/${info.id}`} className="eye-btn">
                    <img src="./images/icons/eye2.svg" alt="black eye" />
                  </NavLink> */}
                  <button
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setId(info.id);
                    }}
                    className="delete-btn eye-btn">
                    <img src="./images/icons/trash-2.svg" alt="delete"></img>
                  </button>
                  <button
                    onClick={() => {
                      setOpenDollarsModal(true);
                      setId(info.id);
                    }}
                    className="dollar-btn eye-btn">
                    <img src="images/icons/cash.svg" alt="dolar" />
                  </button>
                </td>
              </tr>
            );
          })} 
          </tbody>
        </table>
      </div>
      
      {openNewClientModal && (<NewClient closeNewClientModal={setOpenNewClientModal} />)}
      {openTimeModal && <TimeModal closeTimeModal={setOpenTimeModal} />}
      {openEditClientModal && (<EditClientModal url={url} id={id} clients={clients}  closeEditClientModal={setOpenEditClientModal} />)}
      {openDeleteModal && <ModalDelete id={id} url={url} closeModalDelete={setOpenDeleteModal} />}
      {openDollarsModal && (<DollarsModal id={id} clients={clients} closeDollarsModal={setOpenDollarsModal} />)}
      
    </div>
  );
}

export default Clients;

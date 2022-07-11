import React, { useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

const Modal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [addUser, setAddUser] = useState();

  const handleSubmit = (e) => {
    e.preventDefault(); 

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    })
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
    window.location.reload();
  };

  return (
    <div className="background-users">
      <div className="new-user add-users">
        <h2>New User</h2>
        {/* <div className="add-img">
          <input
            type="text"
            value={avatar}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Avatar"/>
        </div> */}

        <form className="inputs">
          <input
            type="text"
            required
            onChange={(e) => setAddUser({...addUser, first_name: e.target.value})}
            placeholder="Name"/>
          <input
            type="text"
            required
            onChange={(e) => setAddUser({...addUser, last_name: e.target.value})}
            placeholder="Last name"/>
          <input
            type="email"
            required
            onChange={(e) => setAddUser({...addUser, email: e.target.value})}
            placeholder="Email"/>
          <input
            type="tel"
            required
            onChange={(e) => setAddUser({...addUser, phone: e.target.value})}
            placeholder="Tel"/>
          <input
            type="text"
            required
            onChange={(e) => setAddUser({...addUser, street: e.target.value})}
            placeholder="Street"/>
          <input
            type="text"
            required
            onChange={(e) => setAddUser({...addUser, city: e.target.value})}
            placeholder="City"/>
          <input
            type="text"
            required
            onChange={(e) => setAddUser({...addUser, ptt: e.target.value})}
            placeholder="Ptt"/>
          <input
            type="text"
            required
            onChange={(e) => setAddUser({...addUser, country: e.target.value})}
            placeholder="Country" />
          <input
            type="password"
            required
            onChange={(e) => setAddUser({...addUser, password: e.target.value})}
            placeholder="Password"/>
          <input
            type="text"
            required
            onChange={(e) => setAddUser({...addUser, role: e.target.value})}
            placeholder="Role"/>
          <input
            type="text"
            required
            onChange={(e) => setAddUser({...addUser, tekuci_racun: e.target.value})}
            placeholder="Tekuci racun"/>

          <div className="cancle-and-add">
            <div className="cancle-btn">
              <button
                type="button"
                onClick={() => {
                  closeModal(false);}}>
                Cancle
              </button>
            </div>
             <button onClick={(e) => handleSubmit(e)} type="submit">Add user</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

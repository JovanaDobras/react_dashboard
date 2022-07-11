import React, { useState } from "react";

import "./Modal.css";

function EditModal({ closeEditModal, updateUsers, users }) {

  const [editUserId, setEditUserId] = useState(users[updateUsers-1]);

  function EditUser(id, e){
    e.preventDefault();

    fetch(`http://localhost:8000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(editUserId),
    })
    .then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

  return (
    <div className="background-users">
      <div className="new-user edit-users">
        <h2> Lorem Ipsum</h2>
        {/* <div className="add-img">
          <input
            type="text"
            defaultValue={editUserId?.avatar.image_path}
            onChange={(e) => setEditUserId({...editUserId, avatar: e.target.value})}
            placeholder="Avatar"/>
        </div> */}
        <form className="inputs">
          <input type="text" required defaultValue={editUserId?.first_name}
            onChange={(e) => setEditUserId({...editUserId, first_name: e.target.value})} placeholder="Name"/>
          <input type="text" required defaultValue={editUserId?.last_name}
            onChange={(e) => setEditUserId({...editUserId, last_name: e.target.value})} placeholder="Last name"/>
          <input type="email" required defaultValue={editUserId?.email}
            onChange={(e) => setEditUserId({...editUserId, email: e.target.value})} placeholder="Email"/>
            <input type="tel" required defaultValue={editUserId?.phone}
            onChange={(e) => setEditUserId({...editUserId, phone: e.target.value})} placeholder="Tel"/>
          <input type="text" required defaultValue={editUserId?.street}
            onChange={(e) => setEditUserId({...editUserId, street: e.target.value})} placeholder="Street"/>
          <input type="text" required defaultValue={editUserId?.city}
            onChange={(e) => setEditUserId({...editUserId, city: e.target.value})} placeholder="City"/>
          <input type="text" required defaultValue={editUserId?.ptt}
            onChange={(e) => setEditUserId({...editUserId, ptt: e.target.value})} placeholder="Ptt"/> 
          <input type="text" required defaultValue={editUserId?.country}
            onChange={(e) => setEditUserId({...editUserId, country: e.target.value})} placeholder="Country" />
            <input type="text" required defaultValue={editUserId?.status}
            onChange={(e) => setEditUserId({...editUserId, status: e.target.value})} placeholder="Country" />
          <input type="password" required defaultValue={editUserId?.password}
            onChange={(e) => setEditUserId({...editUserId, password: e.target.value})} placeholder="Password"/>
          <input type="text" required defaultValue={editUserId?.role}
            onChange={(e) => setEditUserId({...editUserId, role: e.target.value})} placeholder="Role"/>
          <input type="text" required defaultValue={editUserId?.tekuci_racun}
            onChange={(e) => setEditUserId({...editUserId, tekuci_racun: e.target.value})} placeholder="Tekuci racun"/>

          <div className="cancle-and-add">
            <div className="cancle-btn">
              <button type="button" onClick={() => {closeEditModal(false);}}> Cancle</button>
            </div>
              <button type="submit" onClick={(event) => EditUser(editUserId.id, event)}>Edit user</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditModal;



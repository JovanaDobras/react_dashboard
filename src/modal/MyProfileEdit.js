import React, { useState } from "react";
import "./Modal.css";
import ModalDelete from "./ModalDelete.js";

function MyProfileEdit({ closeEditModal, profile }) {
  
  const [editUserProfile, setEditUserProfile] = useState(profile);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState(profile.id);
  const url = "http://localhost:8000/users";

  function EditUserProfile(id, e){
    e.preventDefault();

    fetch(`http://localhost:8000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(editUserProfile),
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
        <div className="wraper">
          <div className="delete-user">
            <span onClick={() => {
                          setOpenDeleteModal(true);
                        }}> Delete user
              <img src="./images/icons/trash.svg" alt="black-bin" />
            </span>
          </div>
          <h2> Lorem Ipsum</h2>
          {/* <div className="add-img">
            <input
              type="text"
              defaultValue={editUserProfile?.avatar.image_path}
              onChange={(e) => setEditUserProfile({...editUserProfile, avatar: e.target.value})}
              placeholder="Avatar"/>
          </div> */}
          <form className="inputs">
            <input type="text" required defaultValue={editUserProfile?.first_name}
              onChange={(e) => setEditUserProfile({...editUserProfile, first_name: e.target.value})} placeholder="Name"/>
            <input type="text" required defaultValue={editUserProfile?.last_name}
              onChange={(e) => setEditUserProfile({...editUserProfile, last_name: e.target.value})} placeholder="Last name"/>
            <input type="email" required defaultValue={editUserProfile?.email}
              onChange={(e) => setEditUserProfile({...editUserProfile, email: e.target.value})} placeholder="Email"/>
              <input type="tel" required defaultValue={editUserProfile?.phone}
              onChange={(e) => setEditUserProfile({...editUserProfile, phone: e.target.value})} placeholder="Tel"/>
            <input type="text" required defaultValue={editUserProfile?.street}
              onChange={(e) => setEditUserProfile({...editUserProfile, street: e.target.value})} placeholder="Street"/>
            <input type="text" required defaultValue={editUserProfile?.city}
              onChange={(e) => setEditUserProfile({...editUserProfile, city: e.target.value})} placeholder="City"/>
            <input type="text" required defaultValue={editUserProfile?.ptt}
              onChange={(e) => setEditUserProfile({...editUserProfile, ptt: e.target.value})} placeholder="Ptt"/> 
            <input type="text" required defaultValue={editUserProfile?.country}
              onChange={(e) => setEditUserProfile({...editUserProfile, country: e.target.value})} placeholder="Country" />
              <input type="text" required defaultValue={editUserProfile?.status}
              onChange={(e) => setEditUserProfile({...editUserProfile, status: e.target.value})} placeholder="Country" />
            <input type="password" required defaultValue={editUserProfile?.password}
              onChange={(e) => setEditUserProfile({...editUserProfile, password: e.target.value})} placeholder="Password"/>
            <input type="text" required defaultValue={editUserProfile?.role}
              onChange={(e) => setEditUserProfile({...editUserProfile, role: e.target.value})} placeholder="Role"/>
            <input type="text" required defaultValue={editUserProfile?.tekuci_racun}
              onChange={(e) => setEditUserProfile({...editUserProfile, tekuci_racun: e.target.value})} placeholder="Tekuci racun"/>

            <div className="cancle-and-add">
              <div className="cancle-btn">
                <button type="button" onClick={() => {closeEditModal(false);}}> Cancle</button>
              </div>
                <button type="submit" onClick={(event) => EditUserProfile(editUserProfile.id, event)}>Edit user</button>
            </div>
          </form>
        </div>
      </div>

      {openDeleteModal && ( <ModalDelete id={id} url={url} closeModalDelete={setOpenDeleteModal} />)}
    </div>
  );
}

export default MyProfileEdit;

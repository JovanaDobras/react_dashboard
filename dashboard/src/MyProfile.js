import MyProfileEdit from "./modal/MyProfileEdit.js";
import React, { useEffect, useState } from "react";
import "./App.css";
import TimeModal from "./modal/TimeModal.js";
import { useGlobalHook, AuthContext } from './context';


function MyProfile() {
  const { user, logoutHandler, idProfile } = useGlobalHook(AuthContext);
  console.log(user, idProfile);

  const [openMyProfileEditModal, setMyProfileEditModal] = useState(false); /*add-user*/
  const [openTimeModal, setOpenTimeModal] = useState(false); /*time-modal*/

  const [profile, setProfile] = useState();
  const [tasks, setTasks] = useState();
  const [idUserLog, setIdUserLog] = useState(idProfile.id);


  useEffect(() => {
    setProfile(user[idUserLog-1]);
  },[user])

useEffect(() => {
  fetch("http://localhost:8000/mytasks")
  .then((response) => {
      if(!response.ok) {
          throw Error('Nešto nije u redu.');
      } else {
          return response.json();
      }
  })
  .then((data) => {
    setTasks(data);
  })
  .catch((error) => {
      console.log(error);
  })
}, []);
  
  return (
     <div className="table grid-profil">
      {/* <div class="insert-hours-img"><img src="img/clock.png" alt="insert hours"/></div> */}
      {profile &&<div className="user-profil">
        <div className="img-edit-users">
          <a onClick={() => { setMyProfileEditModal(true);}} className="edit-btn">
            <img src="./images/icons/edit-3.svg" alt="edit-btn" />
          </a>
        </div>
            <div>
            <div className="profil-img-avatar">
            {profile.avatar.image_path && <img src={profile.avatar.image_path} className="profil-avatar" />}
            </div>
            <h2>
                {`${profile.first_name}
                ${profile.last_name}`}
            </h2>
            <p><b>First name:</b> {profile.first_name}</p>
            <p><b>Last name:</b> {profile.last_name}</p>
            <p><b>Email:</b>{profile.email}</p>
            <p><b>Role:</b> {profile.role}</p>
            <p><b>Bank account:</b>{profile.tekuci_racun}</p>
            <p><b>Status:</b>{profile.status}</p>
            </div>
        
        <input onClick={() => {setOpenTimeModal(true);}} type="button" className="btn" value="Insert hours" />
        <p><b>This month: 120:16:45</b></p>
        <div className="log-out-btn">
          <input onClick={logoutHandler} type="button" className="btn" value="Log out" />
        </div>
      </div>}
      <div className="table-profil">
        <table className="border-left">
        <thead>
          <tr className="profil-tr">
            <th>Client</th>
            <th>Task</th>
            <th>Month</th>
            <th>Time</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {tasks?.map((info, index) => {
              return (
                <tr key={index} className="x">
                <td>{info.client_name}</td>
                <td>{info.task}</td>
                <td>{info.date}</td>
                <td>{info.time}</td>
                <td className="avatar-and-options">
                  <a className="dot-btn">
                    <img src="./images/icons/dots.svg" alt="edit" />
                  </a>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>

      {openMyProfileEditModal && (<MyProfileEdit profile={profile} closeEditModal={setMyProfileEditModal} />)}
      {openTimeModal && <TimeModal tasks={tasks} closeTimeModal={setOpenTimeModal} />}
    </div>
  );
}

export default MyProfile;

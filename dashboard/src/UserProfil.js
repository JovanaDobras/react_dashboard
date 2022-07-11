import ModalDelete from "./modal/ModalDelete.js";
import EditModal from "./modal/EditModal.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeModal from "./modal/TimeModal.js";
import EditTime from './modal/EditTimeModal.js';

function UserProfil() {

  const {id} = useParams();
  const url = "http://localhost:8000/mytasks";

  const [profileUser, setProfileUser] = useState();
  const [tasks, setTasks] = useState();
  const [idTasks, setIdTasks] = useState();

  const [openEditModal, setOpenEditModal] = useState(false); /*edit-modal*/
  const [openDeleteModal, setOpenDeleteModal] = useState(false); /*delete-modal*/
  const [openTimeModal, setOpenTimeModal] = useState(false); /*time-modal*/
  const [editTimeModal, setEditTimeModal] = useState(false); /*edit-time*/

  useEffect(() => {
      fetch(`http://localhost:8000/users/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Error");
          }
          return res.json();
        })
        .then((data) => {
          setProfileUser(data);
        })
        .catch((err) => {
          console.log("Error message: ", err);
        });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/mytasks`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        console.log("Error message: ", err);
      });
}, []);

  return (
    <div className="table grid-profil">
      <div className="user-profil">
      <div className="img-edit-users">
        <a onClick={() => {setOpenEditModal(true);}} className="edit-btn">
          <img src="../images/icons/edit-3.svg" alt="edit-btn" />
        </a>
      </div>
      {profileUser && (
        <>
          <div className="profil-img-avatar">
            <img alt={profileUser?.avatar.image_alt} src={profileUser?.avatar.image_path} className="profil-avatar" />
          </div>
          <h1>{profileUser?.first_name} {profileUser?.last_name}</h1> 
          <p><b>Email: </b>{profileUser?.email}</p>
          <p><b>Role: </b>{profileUser?.role}</p>
          <p><b>Status: </b>{profileUser?.status}</p>
        </>
      )}
      <div className="client-month">
        <input list="client" id="client-list" name="client-list" value="Client"/>
        <datalist id="client">
          <option value="Chocolate" />
          <option value="Coconut" />
        </datalist>
        <input list="month" id="month-list" name="month-list" value="Month" />
        <datalist id="month">
          <option value="Chocolate" />
          <option value="Coconut" />   
        </datalist>
      </div>
      <div className="hours">
        <p><b>Hourse in total:</b></p>
        <input type="number" id="appt" name="appt" min="00" max="24" value="00" required /> 
        <input type="number" id="appt" name="appt" min="00" max="60" value="00" required />
      </div>

      <input onClick={() => {setOpenTimeModal(true);}} type="button" className="btn" value="Insert hours" />
    </div>

      {tasks && (       
        <div className="table-profil">
          <table className="border-left">
            <thead>
              <tr>
                <th>Client</th>
                <th>Task</th>
                <th>Month</th>
                <th>Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>        
              {tasks.map((task) =>{
                return (
                  <tr key={task.id}>
                    <td>{task?.client_name}</td>
                    <td>{task?.task}</td>
                    <td>{task?.date}</td>
                    <td>{task?.time}</td>
                    <td className="avatar-and-options">
                      <a onClick={() => {setEditTimeModal(true); setIdTasks(task.id);}} className="edit-btn">
                        <img src="../images/icons/edit-3.svg" alt="edit" />
                      </a>
                      <a onClick={() => {setOpenDeleteModal(true); setIdTasks(task.id);}} className="delete-btn">
                        <img src="../images/icons/trash-2.svg" alt="delete" />
                      </a>
                    </td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
      )}
      {openDeleteModal && ( <ModalDelete id={idTasks} url={url} closeModalDelete={setOpenDeleteModal} />)}
      {openEditModal && <EditModal users={profileUser} updateUsers={id} closeEditModal={setOpenEditModal} />}
      {openTimeModal && <TimeModal closeTimeModal={setOpenTimeModal} />}
      {editTimeModal && <EditTime tasks={tasks} id={idTasks} closeTimeModal={setEditTimeModal} />}
    </div>
  );
}

export default UserProfil;


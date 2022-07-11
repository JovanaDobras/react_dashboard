import EditClientModal from "./modal/EditClientModal.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeModal from "./modal/TimeModal.js";
import TimeClientModal from './modal/AddTimeClient.js';

function ClientProfile({client}) {
  const {id} = useParams();
  const [openEditModal, setOpenEditClientModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false); /*time-user-client-modal*/
  const [profileClient, setProfileClientAll] = useState();
  const [tasksClient, setTasksClient] = useState();
  const url = "http://localhost:8000/clients"; 

  useEffect(() => {
    fetch(`http://localhost:8000/clients/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        setProfileClientAll(data);
      })
      .catch((err) => {
        console.log("Error message: ", err);
      });
}, []);

useEffect(() => {
  fetch(`http://localhost:8000/taskClient`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      setTasksClient(data);
    })
    .catch((err) => {
      console.log("Error message: ", err);
    });
}, []);


  return (
    <div className="table grid-profil">
      {/* <div class="insert-hours-img"><img src="img/clock.png" alt="insert hours"/></div> */}
      <div className="user-profil">
        <div className="img-edit-users">
          <a className="edit-btn"
            onClick={() => {setOpenEditClientModal(true);}}>
            <img src="../images/icons/edit-3.svg" alt="edit-btn" />
          </a>
        </div>
        {profileClient && (
            <>
            <div className="profil-img-avatar">
              <img alt={profileClient?.avatar} src={profileClient?.avatar} className="profil-avatar" />
            </div>
            <h1>{profileClient?.client_name}</h1> 
            <p><b>Email: </b>{profileClient?.email}</p>
            <p><b>Manager: </b>{profileClient?.manager}</p>
            <p><b>Manager Factor: </b>{profileClient?.manager_factor}</p>
            <p><b>Payment:</b>{profileClient?.paymentMethod}</p>
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
          <input type="number" id="appt" name="appt" min="00" max="24" value="00" required/>
          <input type="number" id="appt" name="appt" min="00" max="60" value="00" required/>
        </div>
        <input onClick={() => {setOpenTimeModal(true);}} type="button" className="btn" value="Insert hours" />
      </div>

      {tasksClient && (
      <div className="table-profil">
        <table className="border-left">
          <thead>
            <tr>
              <th className="avatar-and-options">Developer</th>
              <th>Task</th>
              <th>Month</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasksClient.map((task) =>{
                    return (
                      <tr key={task.id}>
                        <td>{task?.developer}</td>
                        <td>{task?.task}</td>
                        <td>{task?.date}</td>
                        <td>{task?.time}</td>
                        <td className="avatar-and-options">
                          <a className="edit-btn">
                          <img src="../images/icons/dots.svg" alt="edit" />
                          </a>
                        </td>
                      </tr>
                    )})}
          </tbody>
        </table>
      </div>
      )}

      {openEditModal && (<EditClientModal id={id} url={url} clients={client} closeEditClientModal={setOpenEditClientModal} />)}
      {openTimeModal && (<TimeModal closeTimeModal={setOpenTimeModal} />)}
      {openTimeModal && (<TimeClientModal closeTimeModal={setOpenTimeModal} />)}
    </div>
  );
}

export default ClientProfile;

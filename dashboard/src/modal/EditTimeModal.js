import React, { useState } from "react";

function EditTime({ closeTimeModal, id, tasks}) {
  const [task, setTasks] = useState(tasks[id]);
  console.log(task.id);

  function updateTask(id, e){
    e.preventDefault();

    fetch(`http://localhost:8000/mytasks/${id}`, {
      method: "PUT",
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(task),
    })
      .then(() => {
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      });
  }

  return (
    <div className="times">
      <div className="time-center">
        <div className="modal-time">
          <p>Enter time used for: Lorem ipsum</p>
          <div className="time-grid">
            <div className="description">
              <label htmlFor="description">Description:</label>
              <textarea rows={2} cols={30} required 
              onChange={(e) => setTasks({...task, task: e.target.value})}
              placeholder="Invoice data:"/>
              <label htmlFor="html">Client:</label>
              <input type="text" required onChange={(e) => setTasks({...task, client_name: e.target.value})} className="input-time-client"></input>
            </div>
            <div className="date">
              <label htmlFor="html">Date:</label>
              <input type="date" id="date-time" required onChange={(e) => setTasks({...task, date: e.target.value})} />
              <label htmlFor="html">Time spent:</label>
              <div className="hours hours-time">
                <input type="number" id="appt" min="00" max="24"  onChange={(e) => setTasks({...task, time: e.target.value})} required/>
                {/* <input type="number" id="appt" min="00" max="60"  onChange={(e) => setTasks({...task, minute: e.target.value})} required/> */}
              </div>
            </div>
          </div>
          <div className="btn-delete delete-margin">
           <input type="button" className="delete-input" value="Yes" onClick={(event) => updateTask(task.id, event)}/>
            <div className="delete-no log-out-btn">
              <input onClick={() => closeTimeModal(false)} type="button" className="delete-input" value="No"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditTime;

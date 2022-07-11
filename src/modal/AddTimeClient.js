import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function TimeModal({ closeTimeModal}) {
  const navigate = useNavigate();
  const [addTime, setAddTime] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/taskClient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addTime),
    })
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
    window.location.reload();
  };

  return (
    <div className="times">
      <div className="time-center">
        <div className="modal-time">
          <p>Enter time used for: Lorem ipsum</p>
          <div className="time-grid">
            <div className="description">
              <label htmlFor="description">Description:</label>
              <textarea rows={2} cols={30} required 
              onChange={(e) => setAddTime({...addTime, task: e.target.value})}
              placeholder="Invoice data:"/>
              <label htmlFor="html">Client:</label>
              <input type="text" required onChange={(e) => setAddTime({...addTime, client_name: e.target.value})} className="input-time-client"></input>
            </div>
            <div className="date">
              <label htmlFor="html">Date:</label>
              <input type="date" id="date-time" required onChange={(e) => setAddTime({...addTime, date: e.target.value})} />
              <label htmlFor="html">Time spent:</label>
              <div className="hours hours-time">
                <input type="number" id="appt" min="00" max="24"  onChange={(e) => setAddTime({...addTime, time: e.target.value})} required/>
                {/* <input type="number" id="appt" min="00" max="60"  onChange={(e) => setAddTime({...addTime, minute: e.target.value})} required/> */}
              </div>
            </div>
          </div>
          <div className="btn-delete delete-margin">
            <input type="button" className="delete-input" value="Yes" onClick={(e) => handleSubmit(e)}/>
            <div className="delete-no log-out-btn">
                <input onClick={() => closeTimeModal(false)} type="button" className="delete-input" value="No"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeModal;

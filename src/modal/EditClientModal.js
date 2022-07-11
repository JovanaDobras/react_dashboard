import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditClientModal({ closeEditClientModal, clients, id, url }) {
 
  const [idClientEdit, setIdClientEdit] = useState(clients[id-1]);
  console.log(idClientEdit);
  
  function updateUser(id, e){
    e.preventDefault();

    fetch(`${url}/${id}`, {
      method: "PUT",
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(idClientEdit),
    })
      .then(() => {
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      });
  }

  return (
    <div className="background-users">
      <div className="new-user edit-users">
        <h2> Lorem Ipsum</h2>
        {/* <div className="add-img">
          <input
            type="text"
            value={avatar}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Avatar"/>
        </div> */}
        <form className="inputsClient">
          <input type="text" required defaultValue={idClientEdit?.client_name}
            onChange={(e) => setIdClientEdit({...idClientEdit, client_name: e.target.value})} placeholder="Client name"/>
          <input type="text" required defaultValue={idClientEdit?.email}
            onChange={(e) => setIdClientEdit({...idClientEdit, email: e.target.value})}placeholder="Email"/>
          <input type="text" required defaultValue={idClientEdit?.manager}
            onChange={(e) => setIdClientEdit({...idClientEdit, manager: e.target.value})} placeholder="Manager"/>
          <input type="text" required defaultValue={idClientEdit?.developers}
            onChange={(e) => setIdClientEdit({...idClientEdit, developers: e.target.value})} placeholder="Manager"/>
          <input type="text" required defaultValue={idClientEdit?.billing}
            onChange={(e) => setIdClientEdit({...idClientEdit, billing: e.target.value})} placeholder="Manager"/>
          <input type="text" required defaultValue={idClientEdit?.manager_factor}
            onChange={(e) => setIdClientEdit({...idClientEdit, manager_factor: e.target.value})} placeholder="Manager"/>
          <input type="text" required defaultValue={idClientEdit?.paymentMethod}
            onChange={(e) => setIdClientEdit({...idClientEdit, paymentMethod: e.target.value})} placeholder="Manager"/>
          <textarea defaultValue={idClientEdit?.invoice_data} rows="4" cols="50" className="textarea" placeholder="Invoice data:"
            onChange={(e) => setIdClientEdit({...idClientEdit, invoice_data: e.target.value})}></textarea>
          
          <div className="cancle-and-add">
            <div className="cancle-btn">
              <button type="button"  onClick={() => {
                  closeEditClientModal(false);
                }}> Cancle
              </button>
            </div>
            <button type="submit" onClick={(event) => updateUser(idClientEdit.id, event)}>Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClientModal;

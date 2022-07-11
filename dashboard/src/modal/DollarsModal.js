import React from "react";
import "./Modal.css";

function DollarsModal({ closeDollarsModal, id, clients }) {

  return (
    <div className="delete">
      <div className="dollars-center">
        <div className="dollar-modal margin-dollars">
          <div className="grid-dollars">
            <p>Invoice data</p>
            <a
              onClick={() => {
                closeDollarsModal(false);
              }}
              className="exit-dollars">
              <img src="./images/icons/x-icon.svg" />
            </a>
          </div>
          <div className="email-dollars">
            <p>{clients[id].invoice_data}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DollarsModal;

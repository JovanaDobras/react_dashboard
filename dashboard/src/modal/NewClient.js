import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

function NewClient({ closeNewClientModal }) {
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);

  const [avatarImg, setAvatarImg] = useState();
  const [client_name, setClient_name] = useState();
  const [email, setEmail] = useState();
  const [manager, setManager] = useState();
  const [developers, setDevelopers] = useState();
  const [billing, setBilling] = useState();
  const [manager_factor, setManagerFactor] = useState();
  const [paymentMethod, setpaymentMethod] = useState();
  const [invoiceData, setInvoiceData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault(); /*ne radi refresh kada subminuje*/
    const client = {avatarImg, client_name, email, manager, developers, billing, manager_factor, paymentMethod, invoiceData};

    console.log("client: ", client);
    setIsPosting(true);

    fetch("http://localhost:8000/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then(() => setIsPosting(false))
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
    console.log("radi btn");
    window.location.reload(false);
  };

  return (
    <div className="background-users">
      <div className="new-user add-users">
        <h2> New client</h2>
        <div className="add-img">
          <input
            type="text"
            value={avatarImg}
            onChange={(e) => setAvatarImg(e.target.value)}
            placeholder="Avatar"/>
        </div>
        <form onSubmit={handleSubmit} className="inputs-client">
          <input
            type="text"
            required
            value={client_name}
            onChange={(e) => setClient_name(e.target.value)}
            placeholder="Client name"/>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"/>
          <input
            type="text"
            required
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            placeholder="Manager"/>
          <input
            type="text"
            required
            value={developers}
            onChange={(e) => setDevelopers(e.target.value)}
            placeholder="Developers"/>
          <input
            type="text"
            required
            value={billing}
            onChange={(e) => setBilling(e.target.value)}
            placeholder="Billing"/>
          <input
            type="text"
            required
            value={manager_factor}
            onChange={(e) => setManagerFactor(e.target.value)}
            placeholder="Manager factor"/>
          <input
            type="text"
            required
            value={paymentMethod}
            onChange={(e) => setpaymentMethod(e.target.value)}
            placeholder="Payment Method"/>

          <div className="textarea">
            <textarea
              rows={4}
              required
              value={invoiceData}
              onChange={(e) => setInvoiceData(e.target.value)}
              placeholder="Invoice data:"/>
          </div>
          <div className="cancle-and-add">
            <div className="cancle-btn">
              <button
                onClick={() => closeNewClientModal(false)}
                className="cancle-btn">
                Cancle
              </button>
            </div>
            {!isPosting && <button type="submit">Add user</button>}
            {isPosting && <button type="submit">Korisnik se dodaje...</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewClient;

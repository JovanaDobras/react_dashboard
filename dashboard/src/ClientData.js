import React, { useEffect, useState } from "react";
import "./App.css";
import Clients from "./Clients.js";

function ClientData() {
  const [clients, setClients] = useState();
  const [isLoading, setLoading] = useState(true);
  const url = 'http://localhost:8000/clients';

  fetch("http://localhost:8000/clients").then((res) => {
    if (!res.ok) {
      setLoading(false);
      throw Error("Error");
    }
    return res.json();
  });
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/clients")
        .then((res) => {
          if (!res.ok) {
            setLoading(false);
            throw Error("Error");
          }
          return res.json();
        })
        .then((data) => {
          if (data !== {}) {
            setClients(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("Error message: ", err);
        });
    }, 1000);
  }, []);

  return (
    <div className="home">
      {isLoading && <div className="loading">Loading...</div>}
      {clients && <Clients url={url} clients={clients} />}
      {!clients && !isLoading && <div>Nema dostupnih klienata</div>}
    </div>
  );
}

export default ClientData;

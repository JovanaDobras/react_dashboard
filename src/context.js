import React, {createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({children}) =>  {

  let [user, setUser] = useState([]);
  let [client, setClients] = useState();
  const url = 'http://localhost:8000/users';


  const [loggedIn, setLoggedIn] = useState(false);

//ucitavanje podataka
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => {
        if (!response.ok) {
          throw Error("Nešto nije u redu.");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

//ucitavanje podataka
  useEffect(() => {
    fetch("http://localhost:8000/clients")
      .then((response) => {
        if (!response.ok) {
          throw Error("Nešto nije u redu.");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

//login
  const loginHandler = (e, form) => {
    e.preventDefault();
    user = user.filter(element => element.email === form.email.trim());
    
    if (form.email.trim() === user[0].email && form.password.trim() === user[0].password) {
      setLoggedIn(true);
      localStorage.setItem('user', JSON.stringify({ email: form.email, token: form.password, id: user[0].id }));
    }
    else {
      setLoggedIn(false);
      alert('Pogresnja email adresa ili password');
    }
  };
//logout
  const logoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem('user');
  };

//active
let currentuser = JSON.parse(localStorage.getItem('user'));
let idProfile = currentuser;

  useEffect(() => {
    if (currentuser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [currentuser, setLoggedIn]);


  const contextValue = {

    url,

    loggedIn,
    setLoggedIn,
    loginHandler,
    logoutHandler,
    idProfile,

    user,
    client,
  }

  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
}

const useGlobalHook = () => {
    return useContext(AuthContext);
};

export {AuthContext, AuthProvider, useGlobalHook};

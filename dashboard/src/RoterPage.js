import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Developers from "./Developers.js";
import ClientsData from "./ClientData.js";
import MyProfile from "./MyProfile";
import UserProfile from "./UserProfil";
import ClientProfile from "./ClientProfile";
import UsersData from "./UsersData.js";
import Login from './Login.js';
import { useGlobalHook, AuthContext } from './context';
import "./App.css";

const RoterPage = () => {

    const { loggedIn } = useGlobalHook(AuthContext);
    //  const [loggedIn, setLoggedIn] = useState(false);

  return (

    <div>
        {!loggedIn && (
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="*" element={<Login />} />
            </Routes>
            )}

        {loggedIn && (
        <div className="App">
            <div className="grid">
            <NavBar />
            <Routes>
            <Route path="/" element={<UsersData />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/clients" element={<ClientsData />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/userProfile/:id" element={<UserProfile />} />
            <Route path="/clientProfile/:id" element={<ClientProfile />} />
            </Routes>
            </div>
        </div>
        )}
    </div>

  )
}

export default RoterPage
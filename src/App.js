import React from "react";
import { AuthProvider } from "./context";
import  RouterPage  from "./RoterPage";
import "./App.css";


function App() {

  return (
    <AuthProvider>
       <RouterPage />
    </AuthProvider>
  );
}

export default App;

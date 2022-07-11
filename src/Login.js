import React, { useState } from 'react';
import { useGlobalHook, AuthContext } from './context';


const Login = () => {

  const { loginHandler } = useGlobalHook(AuthContext);

    
  const [form, setForm] = useState({email: '', password:''});
   

  return (
    <div className="background-page">
    <div className="container">
        <div className="flex full-height">
            <div action="" className="form">
                <div className="center-form">
                    <img src="./images/universal-logo-big.png"></img>
                    <h1>Login</h1>
                    <form onSubmit={(e) => loginHandler(e, form)} className="log-content">
                        <input type="text" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="Email"/>
                        <div className="password">
                            <input type={"password"} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="Password"/>
                        </div>
                        <input type="submit" name="submit" id="submit" placeholder="Submit"/>
                    </form>                 
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login
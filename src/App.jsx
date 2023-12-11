import { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase-config";

function App() {
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
useEffect(()=>{
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
},[]);
  

  const register = async () => {
    try {
      setLoading(true);
      
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      window.location.href = 'http://127.0.0.1:5000';
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
      window.location.href = 'https://www.google.com';
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <button onClick={register} disabled={loading}>
          {loading ? 'Creating User...' : 'Create User'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login} disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <h4> User Logged In: </h4>
      {user?user.email:"not Logged In"}

      <button onClick={logout}> Sign Out </button>
    </div>
  );
}

export default App;

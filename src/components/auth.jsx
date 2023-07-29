import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");

  // 
  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }

    setEmail("");
    setPassword("");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <h3>Authentication</h3>

      <input
      name='email'
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="buttons">
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Auth;

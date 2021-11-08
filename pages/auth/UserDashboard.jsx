import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import PrivateRoute from "../PrivateRoute";
import Link from "next/link";
import { auth } from '../../firebase_config'

function UserDashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout ,user } = useAuth();

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch (err) {
      setError("Failed to log out");
      console.log(err);
    }
  }

  console.log(user)


  return (
    <div>
      <h1>Welcome {currentUser.displayName} </h1>
      <h2>Profile</h2>
      {error}
      <p>Email : {currentUser.email} </p> <br />
      <div>
        <Link href="/auth/UpdateProfile">Update Profile</Link> <br />{" "}
      </div>
      <br />
      <button style={{ background: "red" }} onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default PrivateRoute(UserDashboard);

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, Form } from "react-router";
import LoginModal from "../components/LoginModal/LoginModal";

export const clientLoader = async () => {
  console.log("test");
  // handle form logic here
};

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [file, setFile] = useState()
  let navigate = useNavigate();

  const handleClose = (state) => {
    setShowLogin(false);
    if (state != "done") {
      navigate(-1);
    }
  }

  const handleFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
    console.log(file)
    //https://www.youtube.com/watch?v=JJ0pjRotdKI
  }

  if (!isAuthenticated) {
    return (
      <>
        <h2>This page requires login</h2>

        {showLogin && <LoginModal onClose={handleClose} />}
      </>
    );
  }

  return (
    <>
      <h2>Hi, {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>You are {user.subscribed ? null : "not"} subscribed to the emails</p>

      <input type="file" onChange={handleFile} />
      <img src={file}/>
    </>
  );
};

export default Profile;

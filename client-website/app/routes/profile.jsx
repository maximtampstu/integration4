import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, Form } from "react-router";
import LoginModal from "../components/LoginModal/LoginModal";
import { addMedia, getMediaByUser, deleteMedia } from "../services/media"; 


export const clientLoader = async () => {
  console.log("test");
  // handle form logic here
};

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [file, setFile] = useState()
  const [uploadedURL, setUploadedURL] = useState("");
  const [mediaList, setMediaList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);


  let navigate = useNavigate();

  const handleClose = (state) => {
    setShowLogin(false);
    if (state != "done") {
      navigate(-1);
    }
  }

  const loadUserMedia = async () => {
  try {
    const media = await getMediaByUser(user.id);
    setMediaList(media);
  } catch (err) {
    console.error("Failed to load user media:", err);
  }
};


const handleDelete = async (id) => {
  try {
    await deleteMedia(id);
    loadUserMedia();
  } catch (err) {
    console.error("Delete failed:", err);
  }
};



  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "media_upload_preset");
    data.append("cloud_name", "dngqj5iyc");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dngqj5iyc/auto/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      const url = result.secure_url;
      setUploadedURL(url);

      
      const type = selectedFile.type.startsWith("video") ? "video" : "image";
      await addMedia({
        userId: user.id,
        url,
        type,
      });

      await loadUserMedia();
    console.log("Uploaded and saved media");
  } catch (err) {
    console.error("Upload failed:", err);
  } finally {
    setIsUploading(false);  
  }

  };

  if (!isAuthenticated) {
    return (
      <>
        <h2>This page requires login</h2>

        {showLogin && <LoginModal onClose={handleClose} />}
      </>
    );
  }

  console.log(uploadedURL)

  return (
    <>
      <h2>Hi, {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>You are {user.subscribed ? null : "not"} subscribed to the emails</p>

      
      <input type="file" onChange={handleFile} />
      {isUploading && <p>Uploading...</p>}
      {mediaList.length > 0 && (
          <div>
            <h3>Your Uploads</h3>
            {mediaList.map((item) => (
              <div key={item.id} style={{ marginBottom: "20px" }}>
                {item.type === "image" ? (
                  <img src={item.url} alt="User Upload" style={{ maxWidth: "200px" }} />
                ) : (
                  <video src={item.url} controls style={{ maxWidth: "200px" }} />
                )}
                <br />
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}


      {/* {uploadedURL && (
        <div>
          <p>Uploaded:</p>
          <img src={uploadedURL} alt="Uploaded file" style={{ maxWidth: "300px" }} />
        </div>
      )} */}

    </>
  );
};

export default Profile;

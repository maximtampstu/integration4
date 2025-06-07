import { Link } from "react-router";

const Home = () => {

  return (
    <>
      <h1>Home</h1>
      <ul>
        <li><Link to="/upload-info">Upload</Link></li>
        <li><Link to="/vote">Vote</Link></li>
        <li><Link to="/about">About ABBY</Link></li>
        <li><Link to="/previous-event-gallery">Previous Event</Link></li>
      </ul>
    </>
  );
};

export default Home;

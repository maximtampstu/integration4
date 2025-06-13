import { Link } from "react-router";

const Home = () => {

  return (
    <>
      <h1>Home</h1>
      <ul>
        <li><Link to="/kiosk/upload-info">Upload</Link></li>
        <li><Link to="/kiosk/vote">Vote</Link></li>
        <li><Link to="/kiosk/about">About ABBY</Link></li>
        <li><Link to="/kiosk/previous-event-gallery">Previous Event</Link></li>
      </ul>
    </>
  );
};

export default Home;

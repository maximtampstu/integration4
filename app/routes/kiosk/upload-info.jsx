import BackButton from "../../components/BackButton/BackButton";
import QRCodeSVG from "../../components/QRCodeSVG/QRCodeSVG";
import "./upload-info.css"

const UploadInfo = () => {
    const url = `${window.location.origin}/upload`;

    return (
        <>
            <h1 className="visually-hidden">Upload</h1>
            <div className="upload-info__top">
                <BackButton />
                <div className="upload-info__head">
                    <h2>LET’S SHAPE ABBY</h2>
                    <p>We want your work at the next Abby event</p>
                </div>
            </div>
            <ul className="upload-info__type-list">
                <li className="upload-info__type-item upload-info__type-item--blue">Motion Graphic</li>
                <li className="upload-info__type-item">Music</li>
                <li className="upload-info__type-item upload-info__type-item--blue">PHYSICAL & DIGITAL ART</li>
                <li className="upload-info__type-item">PERFORMANCE</li>
            </ul>
            <div className="upload-info__current">
                <h3>Japanese Garden</h3>
                <p>Current theme</p>
            </div>
            <div className="upload-info__bottom">
                <p>Scan to submit and become a part of ABBY</p>
                <QRCodeSVG value={url} />
            </div>
        </>
    );
};

export default UploadInfo;
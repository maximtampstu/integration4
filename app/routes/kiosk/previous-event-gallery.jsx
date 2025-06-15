import { Link } from "react-router";
import BackButton from "../../components/BackButton/BackButton";
import "./previous-event-gallery.css"
import { getAllArtTypes, getArtByEventId } from "../../services/art";
import { getPastEvents } from "../../services/events";
import QRCodeSVG from "../../components/QRCodeSVG/QRCodeSVG";
import PreviousEventArtCard from "../../components/PreviousEventArtCard/PreviousEventArtCard";

export async function clientLoader() {
    const pastEvent = (await getPastEvents())[0]
    const eventArt = await getArtByEventId(pastEvent.id)
    const artTypes = await getAllArtTypes();

    return { pastEvent, eventArt, artTypes };
}

const PreviousEventGallery = ({ loaderData = {} }) => {
    const { pastEvent, eventArt, artTypes } = loaderData
    const url = `${window.location.origin}/event-gallery/${pastEvent.id}`;

    return (
        <>  
            <div className="previous-event-gallery__title">
                <h1 className="previous-event-gallery__masked-text" style={{ backgroundImage: `url(${pastEvent?.thumbnail})` }}>
                    {pastEvent?.name}
                </h1>
            </div>
            <div className="previous-event-gallery__left">
                <BackButton />
                <ul>
                    <PreviousEventArtCard item={eventArt.find(item => item.id === 9)} artType={artTypes.find(type => type.id === (eventArt.find(item => item.id === 9)).artTypeId)}/>
                    <PreviousEventArtCard item={eventArt.find(item => item.id === 25)} artType={artTypes.find(type => type.id === (eventArt.find(item => item.id === 25)).artTypeId)} />
                    <PreviousEventArtCard item={eventArt.find(item => item.id === 32)} artType={artTypes.find(type => type.id === (eventArt.find(item => item.id === 32)).artTypeId)} />
                </ul>
                <Link className="kiosk-button kiosk-button--sec" to="/kiosk/upload-info">Upload Your Work</Link>
            </div>
            <div className="previous-event-gallery__qr">
                <h2>Want to explore more? Or leave Feedback?</h2>
                <p>Scan to browse the full gallery</p>
                <QRCodeSVG value={url} />
            </div>
        </>
    );
};

export default PreviousEventGallery;
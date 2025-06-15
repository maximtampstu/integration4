import BackButton from "../../components/BackButton/BackButton";
import QRCodeSVG from "../../components/QRCodeSVG/QRCodeSVG";
import { getCurrentEvent } from "../../services/events";
import { getArtByEventId } from "../../services/art";
import "./vote-art.css"

export async function clientLoader() {
    const currentEvent = await getCurrentEvent()
    const eventArt = await getArtByEventId(currentEvent.id)

    return { eventArt };
}

const VoteArt = ({ loaderData }) => {
    const { eventArt } = loaderData;
    const url = `${window.location.origin}/vote-art`;

    return (
        <>
            <h1 className="visually-hidden">Vote Art</h1>
            <div className="vote-art__head">
                <div className="vote-art__top">
                    <h2>You @abby</h2>
                    <p>Choose the winning art</p>
                </div>
                <BackButton />
            </div>
            <div className="vote-art__qr">
                <QRCodeSVG value={url} />
                <p>Scan the QR-code to cast your votes!</p>
            </div>
            <div className="vote-art__slider">
                <img src={eventArt.find(item => item.id === 39)?.url} alt="art foto" />
                <img src={eventArt.find(item => item.id === 60)?.url} alt="art foto" />
                <img src={eventArt.find(item => item.id === 35)?.url} alt="art foto"/>
                <img src={eventArt.find(item => item.id === 62)?.url} alt="art foto" />
                <img src={eventArt.find(item => item.id === 36)?.url} alt="art foto" />
                <img src={eventArt.find(item => item.id === 52)?.url} alt="art foto" />
                <img src={eventArt.find(item => item.id === 59)?.url} alt="art foto" />
                <img src={eventArt.find(item => item.id === 55)?.url} alt="art foto" />
                <img src={eventArt.find(item => item.id === 56)?.url} alt="art foto" />
            </div>
        </>
    );
};

export default VoteArt;
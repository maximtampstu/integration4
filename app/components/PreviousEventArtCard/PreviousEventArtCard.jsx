import "./PreviousEventArtCard.css"

const PreviousEventArtCard = ({ item, artType}) => {
    const isAudio = item?.url?.endsWith(".mp3");
    const isVideo = item?.type === "video";

    return (
        <li className="previous-event-art-card">
            {isAudio ? (
                <audio className="art-card-gallery__media art-card-gallery__media--audio" controls>
                    <source src={item.url} type="audio/mpeg" />
                </audio>
            ) : isVideo ? (
                <video className="art-card-gallery__media" controls width="290">
                    <source src={item.url} type="video/mp4" />
                </video>
            ) : (
                <img className="art-card-gallery__media" src={item.url} alt={item.title} />
            )}
            <p>{artType.name}</p>
        </li>
    );
};

export default PreviousEventArtCard;
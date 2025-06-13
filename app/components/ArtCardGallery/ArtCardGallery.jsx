import { useEffect, useState } from "react";
import { Link } from "react-router"

import { getUserById } from "../../services/users";
import { getArtTypeById } from "../../services/art";
import "./ArtCardGallery.css";

import frame from "/winner-frame.png"


const ArtCardGallery = ({ item }) => {
    const [user, setUser] = useState(null);
    const [category, setCategory] = useState(null);

    const isAudio = item?.url?.endsWith(".mp3");
    const isVideo = item?.type === "video";

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserById(item.userId);
            setUser(userData);
            const artType = await getArtTypeById(item.artTypeId)
            setCategory(artType);
        };
        fetchUser();
    }, [item.userId, item.artTypeId]);

    return (
        <li className="art-card-gallery">
            <div className="art-card-gallery__square-top"></div>
            <div className="art-card-gallery__top">
                <div className="art-card-gallery__avatar">
                    {user?.avatar === null ? (
                        <svg width="24" height="45" viewBox="0 0 24 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_828_2413)">
                                <path d="M14.5497 8.80082C14.5497 7.25126 13.2935 5.99508 11.7439 5.99507C10.1944 5.99507 8.93818 7.25124 8.93818 8.80082V9.19675H3.00293V8.80082C3.00293 3.97331 6.91643 0.0598145 11.7439 0.0598145C16.5714 0.0598262 20.4849 3.9733 20.4849 8.80082V9.19675H14.5497V8.80082Z" fill="#231F20" />
                                <path d="M3.00293 8.86553V8.4696H8.93818V8.86553C8.9382 10.4151 10.1944 11.6713 11.7439 11.6713C13.2935 11.6713 14.5497 10.415 14.5497 8.86553V8.4696H20.4849V8.86553C20.4849 13.693 16.5714 17.6065 11.7439 17.6065C6.91644 17.6065 3.00295 13.693 3.00293 8.86553Z" fill="#231F20" />
                                <path d="M18.0395 37.1339H5.7373V44.9037H18.0395V37.1339Z" fill="#231F20" />
                                <path d="M23.3276 44.9037H15.748L10.8633 18.5237H15.2338L23.3276 44.9037Z" fill="#231F20" />
                                <path d="M0.179688 44.9037H7.75937L12.644 18.5237H8.27352L0.179688 44.9037Z" fill="#231F20" />
                            </g>
                            <defs>
                                <clipPath id="clip0_828_2413">
                                    <rect width="23.5252" height="45" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>                                                
                    ) : (
                            <img className="art-card-gallery__avatar-image" src={user?.avatar} alt={`avatar of ${user?.username}`} />
                    )}
                </div>
                <div className="art-card-gallery__user-info">
                    <h4>{item.title}</h4>
                    <p>@{user?.username}</p>
                </div>
            </div>
            <div className="art-card-gallery__mid">
                <div className="art-card-gallery__frame-wrapper">
                    <img className="art-card-gallery__frame" src={frame} alt="frame" />
                </div>
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
            </div>
            <div className="art-card-gallery__bottom">
                <p>{category?.name}</p>
            </div>
            <div className="art-card-gallery__square-bottom"></div>
            <Link className="button button--black" to={`/event-gallery/${item.id}`}>See Gallery</Link>
        </li>
    );
};

export default ArtCardGallery;

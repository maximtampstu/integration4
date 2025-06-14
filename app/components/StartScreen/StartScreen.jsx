import { useRef, useState } from "react";
import introPhoto from "../../../assets/intro-photo.png";
import "./StartScreen.css"
import Banner from "../Banner/Banner";



const StartScreen = ({ handleUnlock, endDate }) => {

    //swipup made with help of AI but started with this https://medium.com/@serhanelmali/how-to-implement-swipe-functionality-in-react-with-the-useswipe-hook-5ead46025370
    const startY = useRef(0);
    const [translateY, setTranslateY] = useState(0);
    const [animateUp, setAnimateUp] = useState(false);

    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        const deltaY = e.touches[0].clientY - startY.current;
        if (deltaY < 0) setTranslateY(deltaY);
    };

    const handleTouchEnd = () => {
        if (translateY < -100) {
            setAnimateUp(true);
            setTranslateY(-window.innerHeight);
            setTimeout(() => handleUnlock(), 500);
        } else {
            setTranslateY(0);
        }
    };

    return (
        <section className="start-screen" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ transform: `translateY(${translateY}px)`, transition: animateUp || translateY === 0 ? "transform 0.5s ease-out" : "none" }}>
            <h1 className="visually-hidden">StartScreen</h1>
            <img src={introPhoto} alt="" />
            <div className="start-screen__content">
                <Banner deg={-3} date={endDate} />
                <Banner deg={4} date={endDate}/>
                <div className="start-screen__cta">
                    <p>Don’t hesitate, SWIPE UP!</p>
                    <button onClick={handleUnlock}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.9579 0.500003L0.499992 47.5L16.0084 47.5L24.0791 9.42582L32.1498 47.5L47.5 47.5L31.2003 0.500005L16.9579 0.500003Z" fill="black" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default StartScreen;
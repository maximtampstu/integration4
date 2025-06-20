import { Link } from "react-router";
import header_image from "../../../assets/header_image.svg";
import at_abby_kortrijk from "../../../assets/at_abby_kortrijk.svg";
import arrow from "../../../assets/arrow.svg";
import "./current-event.css";
import gallery_page_image from "../../../assets/gallery_page_image.svg"
import NotifyBox from "../../components/NotifyBox/NotifyBox"
import { useState, useEffect } from "react";


import { getCurrentEvent, getEndDate, getCountdown, getPhaseStatus, getDateString } from "../../services/events";





export async function clientLoader() {
  const currentEvent = await getCurrentEvent(); 
  
  return {
    currentEvent
  };
}


const CurrentEvent = ({ loaderData }) => {
 const {currentEvent} = loaderData;
 const [countdown, setCountdown] = useState(getCountdown(getEndDate(currentEvent.startDate)));


 
 useEffect(() => {
     const interval = setInterval(() => {
         setCountdown(getCountdown(getEndDate(currentEvent.startDate)));
        }, 1000);
        
        return () => clearInterval(interval);
    }, [currentEvent.startDate]);
    
    
    
    const { days, hours, minutes } = countdown;
    
    
    console.log(currentEvent.startDate)

    return (
        <main className="current-event">
            <h1 className="visually-hidden">Current Event</h1>
            <article className="current-event__intro">
                <h2 className="visually-hidden">Current Theme</h2>
                <section className="current-event__banner">
                    
                     <h3 className="current-event__headline"
                        style={{
                            backgroundImage: `url(${gallery_page_image})`,
                            backgroundPosition: "bottom",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textAlign: "left"
                        }}
                        >{currentEvent.name}</h3>
                </section>
                
                <section className="current-event__about">
                    <h3 className="current-event__about-heading">NOW@ABBY</h3>
                    <p className="current-event__about-text">
                        Dive into the calm of Japanese gardens: cherry blossoms, koi ponds, tea, and tradition. Over 4 weeks, we’ll create themed personal spaces inspired by this beauty. It all ends with a surprise showcase in the free open spaces of the Abby Museum. Come vote, join in, or just enjoy!
                    </p>
                </section>
            </article>

            <article className="current-event__showcase">
                <h2 className="visually-hidden">Showcase Details</h2>

                <section className="current-event__showcase-details">
                    <h3 className="visually-hidden">Showcase Info</h3>
                    <div className="current-event__showcase-label">
                        <p className="current-event__showcase-title">Showcase  & Party</p>
                        <div className="current-event__showcase-datetime">
                            <p className="current-event__showcase-date">
                                {getDateString(getEndDate(currentEvent.startDate)).toUpperCase().replace("20", "'")}
                            </p>
                            <p className="current-event__showcase-time">16:00</p>
                        </div>

                    </div>
                    <div className="current-event__showcase-image-wrapper">
                        <img src={at_abby_kortrijk} alt="Showcase event" className="current-event__showcase-image" />
                    </div>
                </section>

                <section className="current-event__countdown">
                    <h3 className="visually-hidden">Countdown</h3>
                    <p className="current-event__countdown-message">Hey, you should come! It starts in</p>
                    <div className="current-event__countdown-timer">
                        <p><span>{days}</span> DAYS</p>
                        <p><span>{hours}</span> H</p>
                        <p><span>{minutes}</span> MIN</p>
                    </div>
                </section>
            </article>

            
            <article className="current-event__timeline">
                <h2 className="current-event__timeline-heading">TIME TO CONTRIBUTE WITH SOME COOL STUFF!</h2>
                <p className="current-event__timeline-subheading">Check out this month’s cycle</p>

                <section className="timeline">
                    <h3 className="visually-hidden">Timeline</h3>
                    <div className="timeline__container">
                        <div className="timeline__line-start"></div>
                        <section className="timeline__week timeline__week--active">
                            <h4 className="visually-hidden">Week 1</h4>

                            <div className="timeline__status">
                                <div className="timeline__now-label">NOW</div>
                                <div className="timeline__week-label">WEEK 1</div>
                            </div>

                            <div className="timeline__uploading">
                                <img src={arrow} alt="arrow" className="timeline__arrow" />
                                <div className="timeline__uploading-content">
                                    <p className="timeline__phase">UPLOADING</p>
                                    <p className="timeline__description">
                                    We can’t wait to see how you envision a <strong>Japanese garden</strong>! Maybe it’s a playlist, a graphic, motion design, video snippets, or photography—anything that captures the theme.
                                    </p>
                                </div>
                                    <Link to="/upload" className="timeline__cta">Take Part Now</Link>
                            </div>
                        </section>

                        <div className="timeline__line"></div>
                        <section className="timeline__week">
                            <h4 className="visually-hidden">Week 2</h4>
                            <div className="timeline__label">WEEK 2</div>
                        </section>

                        <div className="timeline__line"></div>

                        <section className="timeline__week">
                            <h4 className="visually-hidden">Week 3</h4>
                            <div className="timeline__label">WEEK 3</div>
                        </section>

                        <div className="timeline__line"></div>
                        <section className="timeline__week timeline__week--upcoming">
                            <h4 className="visually-hidden">Week 4</h4>
                            <div className="timeline__label timeline__label-week4">WEEK 4</div>
                            <div className="timeline__label timeline__label-party">PARTY</div>
                        </section>
                        <div className="timeline__line-end"></div>
                    </div>


                </section>
            </article>



            <ul className="you-are-abby__list">
                <NotifyBox label="Uploading Cycle" time={getPhaseStatus(currentEvent.startDate, 1, 17)} active={false} />
                <NotifyBox label="Art & Theme Voting" time={getPhaseStatus(currentEvent.startDate, 21, 27)} active={true} />
            </ul>

        </main>
    );
};

export default CurrentEvent;
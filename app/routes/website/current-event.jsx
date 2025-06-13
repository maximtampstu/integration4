import { Link } from "react-router";
import header_image from "../../../assets/header_image.svg";
import at_abby_kortrijk from "../../../assets/at_abby_kortrijk.svg";
import arrow from "../../../assets/arrow.svg";
import "./current-event.css";

const CurrentEvent = () => {

    return (
        // <>
        //     <h1>Current Event</h1>
        //     <ul>
        //         <li><Link to="/participate">Participate</Link></li>
        //     </ul>

        // </>
        <main className="current-event">
            <h1 className="visually-hidden">Current Event</h1>
            <article className="current-event__intro">
                <h2 className="visually-hidden">Current Theme</h2>
                <section className="current-event__banner">
                    <h3 className="visually-hidden">JAPANESE GARDEN</h3>
                    <img src={header_image} alt="Japanese garden visual" className="current-event__banner-image" />
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
                            <p className="current-event__showcase-date">1 JULY 25’</p>
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
                        <p><span>22</span> DAYS</p>
                        <p><span>5</span> H</p>
                        <p><span>32</span> MIN</p>
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
                        <section className="timeline__week">
                            <h4 className="visually-hidden">Week 1</h4>
                            <div className="timeline__label">WEEK 1</div>
                        </section>

                        <div className="timeline__line"></div>
                        <section className="timeline__week">
                            <h4 className="visually-hidden">Week 2</h4>
                            <div className="timeline__label">WEEK 2</div>
                        </section>

                        <div className="timeline__line"></div>
                        <section className="timeline__week timeline__week--active">
                            <h4 className="visually-hidden">Week 3</h4>

                            <div className="timeline__status">
                                <div className="timeline__now-label">NOW</div>
                                <div className="timeline__week-label">WEEK 3</div>
                            </div>

                            <div className="timeline__uploading">
                                <img src={arrow} alt="arrow" className="timeline__arrow" />
                                <div className="timeline__uploading-content">
                                    <p className="timeline__phase">UPLOADING</p>
                                    <p className="timeline__urgent">ENDS TOMORROW!</p>
                                    <p className="timeline__description">
                                    We can’t wait to see how you envision a <strong>Japanese garden</strong>! Maybe it’s a playlist, a graphic, motion design, video snippets, or photography—anything that captures the theme.
                                    </p>
                                </div>
                                    <Link to="" className="timeline__cta">Take Part Now</Link>
                            </div>
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



            <article className="current-event__status-cards">
                <h2 className="visually-hidden">Cycle Status</h2>

                <div className="status-card status-card--past">
                    <div className="status-card__content">
                        <p className="status-card__title">Theme Voting</p>
                        <p className="status-card__state">ENDED</p>
                    </div>
                    <button className="status-card__btn">Notify Me</button>
                </div>

                <div className="status-card status-card--active">
                    <div className="status-card__content">
                        <p className="status-card__title">Uploading Cycle</p>
                        <p className="status-card__state">NOW</p>
                    </div>
                    <button className="status-card__btn">Notify Me</button>
                </div>

                <div className="status-card status-card--upcoming">
                    <div className="status-card__content">
                        <p className="status-card__title">Artwork Voting</p>
                        <p className="status-card__state">12 DAYS</p>
                    </div>
                    <button className="status-card__btn">Notify Me</button>
                </div>
             </article>

        </main>
    );
};

export default CurrentEvent;
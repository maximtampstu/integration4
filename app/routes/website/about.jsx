import { Link } from "react-router";
import arrow from "../../../assets/arrow.svg";
import asterix from "../../../assets/asterix.svg";

import you_belong_abby from "../../../assets/you_belong_abby.png";
import about_page_hand_image from "../../../assets/about_page_hand_image.svg";
import road_trip_romp_thumbnail from "../../../assets/road_trip_romp_thumbnail.png";
import "./about.css";
import japaneseGardenThumbnail from "../../../assets/japanese-garden-thumbnail.png"

import ArticleSection from "../../components/ArticleSection/ArticleSection";
import FaqItem from "../../components/Faq/FaqItem";

import { getCurrentEvent, getPastEvents } from "../../services/events";
import { getMonthByMonthValue, getEndDate } from "../../services/events";



export async function clientLoader() {
  const currentEvent = await getCurrentEvent(); 
  const pastEvents = await getPastEvents(); 
  
  return {
    currentEvent,pastEvents
  };
}


const About = ({ loaderData }) => {
    const {currentEvent, pastEvents} = loaderData;

    const startDate = new Date(currentEvent.startDate);
    const endDate = new Date(getEndDate(currentEvent.startDate));

    const startMonth = getMonthByMonthValue(startDate.getMonth() + 1).toUpperCase();
    const startDay = startDate.getDate();
    const endMonth = getMonthByMonthValue(endDate.getMonth() + 1).toUpperCase();
    const endDay = endDate.getDate();


    const pastEvent = pastEvents[0]; 
    const pastStartDate = new Date(pastEvent.startDate);
    const pastEndDate = new Date(getEndDate(pastEvent.startDate));

    const pastStartMonth = getMonthByMonthValue(pastStartDate.getMonth() + 1).toUpperCase();
    const pastStartDay = pastStartDate.getDate();
    const pastEndMonth = getMonthByMonthValue(pastEndDate.getMonth() + 1).toUpperCase();
    const pastEndDay = pastEndDate.getDate();

    

    return (
        <>
           
            <main className="about">
                <h1 className="visually-hidden">About Page</h1>

                <article className="about__intro">
                    <h2 className="visually-hidden">first section about page</h2>
                    <section className="about__intro-message">
                        <h3 className="visually-hidden">you belong @ abby</h3>
                        <img src={you_belong_abby} alt="you_belong_abby" className="about__intro-message-img" />
                    </section>
                    <section className="about__intro-image">
                        <h3 className="visually-hidden">image of the museum</h3>

                        <img src={about_page_hand_image} alt="" className="about__intro-img" />
                    </section>
                    <section className="about__intro-description">
                        <h3 className="about__intro-subheading">A living, breathing art cycle where you set the stage.</h3>
                        <p className="about__intro-paragraph">Abby’s open spaces—Living Room and café—are your canvas. Every four weeks, know the theme, build the rooms together, submit work, and use your 3 votes to bring Abby to life.</p>
                    </section>
                </article>
                <section className="about__follow">
                    <h2 className="about__follow-heading">hey, follow me</h2>
                    <div className="about__follow-arrows">
                        <a href="#how-section"><img src={arrow} alt="arrow" className="about__follow-arrow" /></a>
                        <a href="#how-section"><img src={arrow} alt="arrow" className="about__follow-arrow" /></a>
                        <a href="#how-section"><img src={arrow} alt="arrow" className="about__follow-arrow" /></a>
                    </div>

                </section>
                <article className="about__how" id="how-section">
                    <h2 className="about__how-heading">SO.. HOW DO YOU SHAPE ABBY?</h2>


                    <ArticleSection
                        numberBg="blue"
                        titleBg="green"
                        sectionNumber="1"
                        sectionTitle="CREATE & UPLOAD"
                        timelineTitle="DAY 1 - MID WEEK 3"
                        descriptionText="The public-picked theme is locked. Make your piece—music playlist, motion graphic, art, or performance idea. Log in, fill a quick form, upload a file or photo. Voters get reminders, and all eyes on the displayed public screens."
                        arrowImageSrc={arrow}
                    />

                    <section className="about__curator-note">
                        <img src={asterix} className="about__curator-note-icon" />
                        <p className="about__curator-note-text">
                            One sec— here Abby’s in the middle of a curator shortlist.
                        </p>
                        <img src={asterix} className="about__curator-note-icon" />
                    </section>




                    <ArticleSection
                        numberBg="green"
                        titleBg="blue"
                        sectionNumber="2"
                        sectionTitle="DOUBLE VOTING"
                        timelineTitle="DURING WEEK 4"
                        descriptionText="Community voting opens. Leave your vote, help shortlist the top six pieces. On the displayed screens, make sure to vote for one of the 3 themes that will shape the next event!"
                        arrowImageSrc={arrow}
                    />


                    <ArticleSection
                        numberBg="blue"
                        titleBg="purple"
                        sectionNumber="3"
                        sectionTitle="SHOWCASE, PARTY & REVEAL"
                        timelineTitle="END OF WEEK 4"
                        descriptionText="Winning works take over a room at Abby for a evening party—projections, live sets, snacks. Before lights out, the new public-voted winning theme drops and the four-week cycle begins again."
                        arrowImageSrc={arrow}
                    />



                    <section className="about__cta">
                        <p className="about__cta-text">
                            Don’t hesitate to take a peek at this month’s schedule!
                        </p>

                        <Link to="/current-event">Check It Out</Link>
                    </section>
                </article>

                <section className="about__events-wrapper">
                    <h2 className="visually-hidden">Abby Events Section</h2>
                    <article className="about__now">
                        <h3 className="visually-hidden">Abby Now Section</h3>

                        <section className="about__now-event">
                            <h4 className="visually-hidden">Current Featured Event</h4>

                            <div className="about__now-event-header">
                                <h5 className="about__now-event-title">{currentEvent.name.toUpperCase()}</h5>
                                <p className="about__now-event-dates">{`${startMonth} ${startDay} – ${endMonth} ${endDay}`}</p>

                            </div>

                            <div className="about__now-image-wrapper">
                                <img
                                src={currentEvent.thumbnail || japaneseGardenThumbnail}
                                alt="event thumbnail"
                                className="about__now-image"
                                />

                            </div>
                        </section>

                        <section className="about__now-description">
                            <h3 className="about__now-heading">NOW @ ABBY</h3>
                            <p className="about__now-text">{currentEvent.description}</p>

                            <Link to="/participate" className="about__now-button">Shape ABBY</Link>
                        </section>
                    </article>


                    <article className="about__previous">
                        <h3 className="visually-hidden">Abby Previous Event Section</h3>

                        <section className="about__previous-event">
                            <h4 className="visually-hidden">Previous Featured Event</h4>
                            <div className="about__previous-event-header">
                                <h5 className="about__previous-event-title">{pastEvent.name.toUpperCase()}</h5>
                                <p className="about__previous-event-dates">{`${pastStartMonth} ${pastStartDay} – ${pastEndMonth} ${pastEndDay}`}</p>

                            </div>

                            <div className="about__previous-image-wrapper">
                                <img src={pastEvent.thumbnail || road_trip_romp_thumbnail} alt="past event" className="about__previous-image" />
                            </div>
                        </section>

                        <section className="about__previous-description">
                            <h3 className="about__previous-heading">PREVIOUSLY @ ABBY</h3>

                            <p className="about__previous-text">
                            {pastEvent.description}
                            </p>


                            <div className="about__previous-buttons">
                                <Link to={`/event-gallery/${pastEvent.id}`} className="about__previous-button about__previous-button--dark">
                                    See Gallery
                                </Link>
                                <Link to="/previous-events" className="about__previous-button about__previous-button--light">
                                    All Past Events
                                </Link>
                            </div>
                        </section>


                    </article>
                </section>


                <article className="about__faq">
                    <h2 className="about__faq-heading">faq</h2>
                    <FaqItem
                        question="Hold up—it's really free to join and submit?"
                        answer="That’s right! Uploading, voting, and attending the showcase are all free."
                    />
                    <FaqItem
                        question="Who exactly is allowed to submit something or is it open to anyone with an idea?"
                        answer="Anyone aged 14 + living, studying, or working in West Flanders. No prior art experience required."
                        color="green"
                    />
                    <FaqItem
                        question="Are we allowed to submit the assignment as a group?"
                        answer="Yes—just list every collaborator’s name when you upload."
                    />
                    <FaqItem
                        question="Can I attend without any participation whatsoever?"
                        answer="Yes—just list every collaborator’s name when you upload."
                        color="green"
                    />
                </article>

            </main>
        </>
    );
};

export default About;









import { Link } from "react-router";
import heroImage from "/hero-home.png"
import japaneseGardenThumbnail from "/japanese-garden-thumbnail.png"
import youAreAbbyText from "/you-are-abby-text.png"
import NotifyBox from "../components/NotifyBox/NotifyBox"
import CardSlider from "../components/CardSlider/CardSlider"
import EventCardHome from "../components/EventCardHome/EventCardHome"

import "./home.css";
import { getCurrentEvent, getPastEvents } from "../services/events";
import { getThemeVotes } from "../services/theme";
import { getArtAmount, getArtVotes } from "../services/art";

export async function clientLoader() {
    const currentEvent = await getCurrentEvent()
    const previousEvents = await getPastEvents()
    const totalVotes = (await getThemeVotes()).length + (await getArtVotes()).length
    const totalArt = await getArtAmount()

    return { currentEvent, previousEvents, totalVotes, totalArt };
  }

const Home = ({ loaderData }) => {
    const { currentEvent, previousEvents, totalVotes, totalArt } = loaderData
    return (
        <>
            <h1 className="visually-hidden">Home</h1>
            <section className="hero-image">
                <div className="hero-image__text">
                    <div className="hero-image__info">
                        <h2>You @ ABBY</h2>
                        <ul>
                            <li>Your art.</li>
                            <li>Your voice.</li>
                            <li>Your space.</li>
                        </ul>
                    </div>
                    <a href="#quick-info">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5969 24.6717L24.6384 0.547768L16.7201 0.667085L12.8923 20.1691L8.47861 0.791273L0.641118 0.909373L9.32501 24.7812L16.5969 24.6717Z" fill="black" />
                        </svg>
                    </a>
                </div>
                <img className="hero-image__image" src={heroImage} alt="Step in hero image" />
            </section>
            <section className="quick-info" id="quick-info">
                <h2 className="visually-hidden">Quick Info</h2>
                <p>Upload your art, music, or performance. Or vote for what inspires you. The best works shape ABBY’s next immersive event.</p>
                <Link className="button" to="/about">How does it work?</Link>
            </section>
            <section className="now-at-abby">
                <div className="now-at-abby__heading">
                    <h2>Now @ abby</h2>
                    <p>This Month's Theme</p>
                </div>
                <div className="now-at-abby__event">
                    <img src={currentEvent.thumbnail || japaneseGardenThumbnail} alt={currentEvent.name} />
                    <h3>{currentEvent.name}</h3>
                    <div>
                        <p>This month’s theme is “{currentEvent.name}”. Show us your take, or dive in to vote. Your choices build the experience.</p>
                        <Link className="button button--green" to="/about">How does it work?</Link>
                    </div>
                </div>
            </section>
            <section className="banner">
                <h2 className="visually-hidden">Banner</h2>
                <p>Artwork Voting - available until 20.05 • Artwork Voting - available until 20.05 • Artwork Voting - available until 20.05 • Artwork Voting - available until 20.05 • </p>
            </section>
            <section className="you-are-abby">
                <div className="you-are-abby__head">
                    <h2>You are <span className="visually-hidden">ABBY</span></h2>
                    <img src={youAreAbbyText} alt="Photo of Abby building" />
                </div>
                <div className="you-are-abby__text">
                    <h3>Share your identity</h3>
                    <p>Spaces where anyone can test ideas, remix themes, and see their work shape Abby. Be part of it, dont hesitate to Participate</p>
                </div>
                <ul className="you-are-abby__list">
                    <NotifyBox label="Uploading Cycle" time="Now" active={false} />
                    <NotifyBox label="Art Voting" time="12 Days" active={true} />
                </ul>
            </section>
            <section className="stats">
                <h2 className="visually-hidden">Stats</h2>
                <svg className="stats__top" width="146" height="137" viewBox="0 0 146 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M70 137H0V0H68.4892V25.1838C62.9496 25.1838 53.8849 23.8407 45.8273 29.2132C38.2734 34.25 36.259 41.8051 36.259 46.3382V60.9449H70V137Z" fill="#BC7CD2" />
                    <path d="M146 137H76V0H144.489V25.1838C138.95 25.1838 129.885 23.8407 121.827 29.2132C114.273 34.25 112.259 41.8051 112.259 46.3382V60.9449H146V137Z" fill="#BC7CD2" />
                </svg>
                <ul className="stats__list">
                    <li className="stats__item">
                        <p className="stats__value">{totalVotes + 12347}</p>
                        <p className="stats__label">votes cast</p>
                    </li>
                    <li className="stats__item">
                        <p className="stats__value stats__value--purple">{totalArt + 624}</p>
                        <p className="stats__label">artworks uploaded</p>
                    </li>
                    <li className="stats__item">
                        <p className="stats__value stats__value--blue">27</p>
                        <p className="stats__label">schools involved this year</p>
                    </li>
                </ul>
                <svg className="stats__bottom" width="146" height="137" viewBox="0 0 146 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M76 137H146V0H77.5108V25.1838C83.0504 25.1838 92.1151 23.8407 100.173 29.2132C107.727 34.25 109.741 41.8051 109.741 46.3382V60.9449H76V137Z" fill="#BC7CD2" />
                    <path d="M0 137H70V0H1.51079V25.1838C7.05036 25.1838 16.1151 23.8407 24.1727 29.2132C31.7266 34.25 33.741 41.8051 33.741 46.3382V60.9449H0V137Z" fill="#BC7CD2" />
                </svg>
            </section>
            <section className="previously-at-abby">
                <div className="previously-at-abby__head">
                    <h2>previously @ abby</h2>
                    <p>Last season’s favorites</p>
                </div>
                <div className="previously-at-abby__content">
                    <CardSlider data={previousEvents} cardComponent={EventCardHome} />
                    <Link className="button button--sec previously-at-abby__button" to="/previous-events">See More Events</Link>
                </div>
            </section>
        </>
    );
};

export default Home;
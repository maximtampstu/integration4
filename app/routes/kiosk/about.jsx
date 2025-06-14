import BackButton from "../../components/BackButton/BackButton";
import aboutImage1 from "../../../assets/about-page-image-1.png";
import aboutImage2 from "../../../assets/about-page-image-2.png";
import aboutImage3 from "../../../assets/about-page-image-3.png";
import aboutImage4 from "../../../assets/about-page-image-4.png";
import aboutImage5 from "../../../assets/about-page-image-5.png";
import aboutImage6 from "../../../assets/about-page-image-6.png";
import aboutImage7 from "../../../assets/about-page-image-7.png";

import "./about.css"

const About = () => {

    return (
        <>
            <h1 className="visually-hidden">About</h1>
            <div className="about__head">
                <h2>You@Abby</h2>
                <BackButton />
            </div>
            <div className="about__info">
                <ul>
                    <li>Your art.</li>
                    <li>Your voice.</li>
                    <li>Your space.</li>
                </ul>
                <p>ABBY isn’t a gallery you tiptoe through, it’s an open house where students, neighbours, and first-time creators experiment together. Every four weeks we pick a new theme and turn the Living Room and café into a crowd-built installation.</p>
            </div>
            <div className="about__images">
                <div className="slider-track">
                    <img src={aboutImage1} alt="foto1"/>
                    <img src={aboutImage2} alt="foto2"/>
                    <img src={aboutImage3} alt="foto3"/>
                    <img src={aboutImage4} alt="foto4"/>
                    <img src={aboutImage1} alt="foto1"/>
                    <img src={aboutImage2} alt="foto2"/>
                    <img src={aboutImage3} alt="foto3"/>
                    <img src={aboutImage4} alt="foto4"/>
                </div>
                <div className="slider-track slider-track--bottom">
                    <img src={aboutImage5} alt="foto5" />
                    <img src={aboutImage6} alt="foto6" />
                    <img src={aboutImage7} alt="foto7" />
                    <img src={aboutImage5} alt="foto5" />
                    <img src={aboutImage6} alt="foto6" />
                    <img src={aboutImage7} alt="foto7" />
                </div>
            </div>
        </>
    );
};

export default About;
import { Link } from "react-router";
import { useState } from "react";
import logo from "/you@abby-logo.png"

import "./Footer.css";

const Footer = () => {

    const [email, setEmail] = useState("");
    const [checkBox, setCheckBox] = useState(false);

    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__general-info">
                    <section className="contact">
                        <h2>Contact</h2>
                        <ul className="contact__list">
                            <li>Begijnhofpark</li>
                            <li>8500</li>
                            <li>Kortrijk</li>
                            <li>+32 (0)56 27 74 60</li>
                            <li>abby@kortrijk.be</li>
                        </ul>
                    </section>
                    <section className="find-us">
                        <h2>Find Us</h2>
                        <ul className="find-us__list">
                            <li><a href="https://www.facebook.com/abbykortrijk" target="_blank" rel="noopener noreferrer">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="49.6162" height="49.6162" rx="24.8081" fill="black" />
                                    <path d="M28.6068 17.0195H30.7614V13.3117C29.7182 13.2013 28.67 13.1469 27.6211 13.1485C24.5037 13.1485 22.372 15.084 22.372 18.6286V21.6834H18.8535V25.8343H22.372V36.468H26.5896V25.8343H30.0967L30.6239 21.6834H26.5896V19.0367C26.5896 17.8124 26.9105 17.0195 28.6068 17.0195Z" fill="white" />
                                </svg>
                            </a></li>
                            <li><a href="https://www.instagram.com/abbykortrijk" target="_blank" rel="noopener noreferrer">
                                <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.884766" width="49.6162" height="49.6162" rx="24.8081" fill="black" />
                                    <mask id="mask0_748_1696" maskUnits="userSpaceOnUse" x="14" y="13" width="24" height="24">
                                        <path d="M21.8277 24.8077C21.8277 22.6365 23.5584 20.876 25.6938 20.876C27.8292 20.876 29.5608 22.6365 29.5608 24.8077C29.5608 26.9788 27.8292 28.7393 25.6938 28.7393C23.5584 28.7393 21.8277 26.9788 21.8277 24.8077ZM19.7373 24.8077C19.7373 28.1525 22.404 30.8638 25.6938 30.8638C28.9836 30.8638 31.6503 28.1525 31.6503 24.8077C31.6503 21.4629 28.9836 18.7516 25.6938 18.7516C22.404 18.7516 19.7373 21.4629 19.7373 24.8077ZM30.4941 18.5115C30.4941 19.2927 31.1172 19.9272 31.8864 19.9272C32.6548 19.9272 33.2788 19.2927 33.2788 18.5115C33.2788 17.7303 32.6557 17.0968 31.8864 17.0968C31.1172 17.0968 30.4941 17.7303 30.4941 18.5115ZM21.0069 34.4077C19.876 34.3553 19.2613 34.1638 18.8528 34.0018C18.3112 33.7875 17.9251 33.5322 17.5185 33.1197C17.1128 32.7072 16.8607 32.3147 16.6508 31.764C16.4915 31.3487 16.3032 30.7237 16.2517 29.5739C16.1954 28.3306 16.1842 27.9572 16.1842 24.8077C16.1842 21.6582 16.1964 21.2857 16.2517 20.0415C16.3032 18.8916 16.4925 18.2676 16.6508 17.8513C16.8616 17.3007 17.1128 16.9082 17.5185 16.4947C17.9242 16.0822 18.3102 15.8259 18.8528 15.6125C19.2613 15.4506 19.876 15.2591 21.0069 15.2067C22.2297 15.1495 22.597 15.1381 25.6938 15.1381C28.7915 15.1381 29.1579 15.1505 30.3816 15.2067C31.5126 15.2591 32.1263 15.4515 32.5358 15.6125C33.0774 15.8259 33.4634 16.0822 33.8701 16.4947C34.2758 16.9072 34.5269 17.3007 34.7377 17.8513C34.897 18.2667 35.0854 18.8916 35.1369 20.0415C35.1931 21.2857 35.2044 21.6582 35.2044 24.8077C35.2044 27.9562 35.1931 28.3297 35.1369 29.5739C35.0854 30.7237 34.8961 31.3487 34.7377 31.764C34.5269 32.3147 34.2758 32.7072 33.8701 33.1197C33.4643 33.5322 33.0774 33.7875 32.5358 34.0018C32.1273 34.1638 31.5126 34.3553 30.3816 34.4077C29.1588 34.4648 28.7915 34.4763 25.6938 34.4763C22.597 34.4763 22.2297 34.4648 21.0069 34.4077ZM20.9114 13.0851C19.6764 13.1423 18.8331 13.3414 18.0957 13.6329C17.333 13.9339 16.6864 14.3379 16.0408 14.9933C15.3962 15.6487 14.9989 16.3061 14.7028 17.0825C14.4161 17.8323 14.2202 18.6897 14.164 19.9453C14.1069 21.2028 14.0938 21.6048 14.0938 24.8077C14.0938 28.0105 14.1069 28.4126 14.164 29.6701C14.2202 30.9257 14.4161 31.7831 14.7028 32.5328C14.9989 33.3083 15.3952 33.9666 16.0408 34.622C16.6855 35.2775 17.332 35.6804 18.0957 35.9824C18.834 36.274 19.6764 36.4731 20.9114 36.5302C22.1491 36.5874 22.5436 36.6017 25.6938 36.6017C28.8449 36.6017 29.2394 36.5883 30.4763 36.5302C31.7112 36.4731 32.5545 36.274 33.2919 35.9824C34.0547 35.6804 34.7012 35.2775 35.3468 34.622C35.9914 33.9666 36.3878 33.3083 36.6848 32.5328C36.9715 31.7831 37.1683 30.9257 37.2236 29.6701C37.2798 28.4116 37.2929 28.0105 37.2929 24.8077C37.2929 21.6048 37.2798 21.2028 37.2236 19.9453C37.1674 18.6897 36.9715 17.8323 36.6848 17.0825C36.3878 16.307 35.9914 15.6497 35.3468 14.9933C34.7021 14.3379 34.0547 13.9339 33.2929 13.6329C32.5545 13.3414 31.7112 13.1413 30.4772 13.0851C29.2404 13.028 28.8449 13.0137 25.6947 13.0137C22.5436 13.0137 22.1491 13.027 20.9114 13.0851Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_748_1696)">
                                        <mask id="mask1_748_1696" maskUnits="userSpaceOnUse" x="-42" y="-44" width="136" height="138">
                                            <path d="M-41.7969 -43.8105H93.2511V93.4285H-41.7969V-43.8105Z" fill="white" />
                                        </mask>
                                        <g mask="url(#mask1_748_1696)">
                                            <mask id="mask2_748_1696" maskUnits="userSpaceOnUse" x="-42" y="-44" width="136" height="138">
                                                <path d="M-41.7969 -43.8105H93.2511V93.4285H-41.7969V-43.8105Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask2_748_1696)">
                                                <path d="M-41.7969 -43.8105H93.1855V93.4285H-41.7969V-43.8105Z" fill="white" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a></li>
                        </ul>
                    </section>
                </div>
                <section>
                    <h2>Stay Informed</h2>
                    <form className="form" onSubmit={(e) => {
                            e.preventDefault();
                            setEmail("")
                            setCheckBox(false)
                        }}>
                        <label className="form__checkbox">
                            <input type="checkbox" checked={checkBox} onChange={(e) => setCheckBox(e.target.checked)} required/>
                            <span className="checkmark"></span>
                            I agree with the privacy policy
                        </label>
                        <div>
                            <label htmlFor="email">Email</label>
                            <div className="form__email-input">
                                <input type="email" id="email" placeholder="Your email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button type="submit">
                                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.273412 17.0319L0.18467 11.8612L16.125 8.25439L16.1762 11.2359L0.273412 17.0319Z" fill="black" />
                                        <path d="M0.00110081 1.243L0.0898381 6.41375L16.1445 9.47107L16.0934 6.48957L0.00110081 1.243Z" fill="black" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
            <ul className="footer__bottom">
                <li><img src={logo} alt="Logo" /></li>
                <div>
                    <li>© 2025 Abby</li>
                    <li>Website by Abby Patrol</li>
                </div>
            </ul>
        </footer>
    );
};

export default Footer;

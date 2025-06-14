import "./Banner.css"

const Banner = ({ deg, date }) => {

    return (
        <section style={{ rotate: `${deg}deg` }} className={`banner banner--${deg}`}>
            <h2 className="visually-hidden">Banner</h2>
            <p>Artwork Voting - available until {date} • Artwork Voting - available until {date} • Artwork Voting - available until {date} • Artwork Voting - available until {date} • </p>
        </section>
    );
};

export default Banner;
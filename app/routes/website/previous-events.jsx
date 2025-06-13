import { Link } from "react-router";
import { useState } from "react";

import { getCountDownToParty, getCurrentEvent, getEndDate, getPastEvents } from "../../services/events";
import "./previous-events.css";

import roadTripRompThumbnail from "/road-trip-romp-thumbnail.png"
import japaneseGardenThumbnail from "/japanese-garden-thumbnail.png"

import CardSlider from "../../components/CardSlider/CardSlider"
import EventCardPreviousEvents from "../../components/EventCardPreviousEvents/EventCardPreviousEvents"
import DropDownSelect from "../../components/DropDownSelect/DropDownSelect"

export async function clientLoader() {
  const previousEvents = await getPastEvents();
  const currentEvent = await getCurrentEvent();
  return { previousEvents, currentEvent };
}

export default function PreviousEvents({ loaderData }) {
  const { previousEvents, currentEvent } = loaderData;

  const { days, hours, minutes } = getCountDownToParty(currentEvent.startDate);

  const monthOptions = [
    { label: "Month", value: "month" },
    { label: "All", value: "month" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
  ];

  const yearOptions = [
    { label: "Year", value: "year" },
    { label: "All", value: "year" },
    { label: "2025", value: "2025" },
  ];


  const [month, setMonth] = useState("month")
  const [year, setYear] = useState("year")

  const handleMonth = (value) => {
    setMonth(value)
  }

  const handleYear = (value) => {
    setYear(value)
  }

  //I used AI to give me a start but then I worked further on that
  const filteredEvents = previousEvents.filter((event) => {
    const start = new Date(event.startDate);
    const end = new Date(getEndDate(event.startDate));

    const isMonthSet = month !== "month";
    const isYearSet = year !== "year";

    if (!isMonthSet && !isYearSet) return true;

    // Define target range
    const m = isMonthSet ? parseInt(month) - 1 : 0;
    const y = isYearSet ? parseInt(year) : start.getFullYear();

    const rangeStart = new Date(y, m, 1);
    const rangeEnd = isMonthSet
      ? new Date(y, m + 1, 0) // last day of selected month
      : new Date(y, 11, 31);  // end of year if no month selected

    return start <= rangeEnd && end >= rangeStart;
  });

  return (
    <>
      <section className="hero-image">
        <div className="hero-image__info">
          <h1>Previously <br></br>@ <br></br>abby</h1>
          <div className="hero-image__text">
            <h2>{previousEvents[0].name}</h2>
            <p>Explore the ideas that have already reshaped AbbY. Spark your own</p>
          </div>
        </div>
        <img src={previousEvents[0].thumbnail || roadTripRompThumbnail} alt={previousEvents[0].name} />
      </section>
      <section className="extra-info">
        <h2 className="visually-hidden">Extra info</h2>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.0001 11.4105L39.9982 17.1078L22.3447 20.7761L22.3458 17.491L40.0001 11.4105Z" fill="black" />
          <path d="M39.9938 28.8143L39.9957 23.117L22.3447 19.4373L22.3436 22.7224L39.9938 28.8143Z" fill="black" />
          <path d="M11.148 0.138045L16.853 0.0932294L20.6685 17.6915L17.3789 17.7174L11.148 0.138045Z" fill="black" />
          <path d="M28.5722 0.000775628L22.8671 0.0455837L19.3271 17.7017L22.6167 17.6758L28.5722 0.000775628Z" fill="black" />
          <path d="M28.9127 39.9381L23.2075 39.9583L19.4658 22.3436L22.7555 22.332L28.9127 39.9381Z" fill="black" />
          <path d="M11.4845 39.9994L17.1897 39.9792L20.8062 22.3386L17.5165 22.3502L11.4845 39.9994Z" fill="black" />
          <path d="M0.169753 28.9775L0.114624 23.2804L17.7305 19.436L17.7623 22.721L0.169753 28.9775Z" fill="black" />
          <path d="M0.00256704 11.5747L0.0576909 17.2717L17.7446 20.775L17.7128 17.4901L0.00256704 11.5747Z" fill="black" />
          <rect x="17.6528" y="17.6274" width="5.2405" height="5.23323" fill="black" />
        </svg>
        <p>Every four‑week cycle leaves behind a trail of bold artworks, workshops, and spontaneous dance‑offs. Dip into the archive to see what happens when a community takes the reins.</p>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.0001 11.4105L39.9982 17.1078L22.3447 20.7761L22.3458 17.491L40.0001 11.4105Z" fill="black" />
          <path d="M39.9938 28.8143L39.9957 23.117L22.3447 19.4373L22.3436 22.7224L39.9938 28.8143Z" fill="black" />
          <path d="M11.148 0.138045L16.853 0.0932294L20.6685 17.6915L17.3789 17.7174L11.148 0.138045Z" fill="black" />
          <path d="M28.5722 0.000775628L22.8671 0.0455837L19.3271 17.7017L22.6167 17.6758L28.5722 0.000775628Z" fill="black" />
          <path d="M28.9127 39.9381L23.2075 39.9583L19.4658 22.3436L22.7555 22.332L28.9127 39.9381Z" fill="black" />
          <path d="M11.4845 39.9994L17.1897 39.9792L20.8062 22.3386L17.5165 22.3502L11.4845 39.9994Z" fill="black" />
          <path d="M0.169753 28.9775L0.114624 23.2804L17.7305 19.436L17.7623 22.721L0.169753 28.9775Z" fill="black" />
          <path d="M0.00256704 11.5747L0.0576909 17.2717L17.7446 20.775L17.7128 17.4901L0.00256704 11.5747Z" fill="black" />
          <rect x="17.6528" y="17.6274" width="5.2405" height="5.23323" fill="black" />
        </svg>
      </section>
      <section className="previous-events-filterd">
        <div className="previous-events-filterd__head">
          <h2>{year === "year" ? "2025" : year}</h2>
          <div>
            <DropDownSelect name="month" color="blue" handle={handleMonth} options={monthOptions} />
            <DropDownSelect name="year" color="purple" handle={handleYear} options={yearOptions} />
          </div>
        </div>
        <CardSlider data={filteredEvents} cardComponent={EventCardPreviousEvents} />
      </section>
      <section className="quote">
        <h2 className="visually-hidden">Quote</h2>
        <svg className="quote__top" width="146" height="137" viewBox="0 0 146 137" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M70 137H0V0H68.4892V25.1838C62.9496 25.1838 53.8849 23.8407 45.8273 29.2132C38.2734 34.25 36.259 41.8051 36.259 46.3382V60.9449H70V137Z" fill="#BC7CD2" />
          <path d="M146 137H76V0H144.489V25.1838C138.95 25.1838 129.885 23.8407 121.827 29.2132C114.273 34.25 112.259 41.8051 112.259 46.3382V60.9449H146V137Z" fill="#BC7CD2" />
        </svg>
        <p>Showing my generative visuals at Abby started my first freelance gig.” – Jamal, 19</p>
        <svg className="quote__bottom" width="146" height="137" viewBox="0 0 146 137" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M76 137H146V0H77.5108V25.1838C83.0504 25.1838 92.1151 23.8407 100.173 29.2132C107.727 34.25 109.741 41.8051 109.741 46.3382V60.9449H76V137Z" fill="#BC7CD2" />
          <path d="M0 137H70V0H1.51079V25.1838C7.05036 25.1838 16.1151 23.8407 24.1727 29.2132C31.7266 34.25 33.741 41.8051 33.741 46.3382V60.9449H0V137Z" fill="#BC7CD2" />
        </svg>
      </section>
      <section className="now-at-abby">
        <div className="now-at-abby__head">
          <h2>Now@Abby</h2>
          <p className="now-at-abby__masked-text" style={{ backgroundImage: `url(${currentEvent.thumbnail || japaneseGardenThumbnail})` }}>
            {currentEvent.name}
          </p>
        </div>
        <div className="now-at-abby__bottom">
          <div className="now-at-abby__text">
            <h3>live for another {days} days.</h3>
            <p>Jump in while the canvas is blank.</p>
          </div>
          <Link className="button" to="/">Check It Out</Link>
        </div>
      </section>
    </>
  );
}

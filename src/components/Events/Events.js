import { React, useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import { Link } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const query = new Parse.Query("Events");
    query.find().then((results) => {
      setEvents(results);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="events-container">
        {events.map((event, index) => (
          <Link to={`/events/${event.id}`} key={index}>
            <div className="event-card">
              <div className="event-card-tittle">{event.get("eventName")}</div>
              <div className="event-card-date">
                {new Date(
                  Date.parse(event.get("eventStart"))
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  Date.parse(event.get("eventEnd"))
                ).toLocaleDateString()}
              </div>
              <div className="event-card-description">
                {event.get("eventDescription")}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Events;

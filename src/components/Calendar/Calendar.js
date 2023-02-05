import Parse from "parse/dist/parse.min.js";
import { React, useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


function Calendar() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const user = Parse.User.current();
        if (!user) {
            window.location.href = "/login";
        }
        else {
            const query = new Parse.Query("Events");
            query.find().then((results) => {
                const eventsArray = results.map((event) => {
                    return {
                        title: event.get("eventName"),
                        start: event.get("eventStart"),
                        end: event.get("eventEnd"),
                        describtion: event.get("description"),
                        fullDescription: event.get("fullDescription"),

                    }
                });
                setEvents(eventsArray);
            });
        }
    }, []);
    return (
        <div className="calendar-container">
            {!localStorage.getItem('token') ? <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" weekends={true} events={events} eventContent={renderEventContent} /> : null}
            </div>
        );
    function renderEventContent(eventInfo) {
        return (
            <div>
                <b>{eventInfo.textInfo}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        );
    }

}

export default Calendar;
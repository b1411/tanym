import { React, useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import { useParams } from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";

function Event() {
  let [event, setEvent] = useState({});
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const [loaded, setLoaded] = useState(false);

  const previewStyle = {
    margin: "0 auto",
    width: "100%",
  };

  useEffect(() => {
    const query = new Parse.Query("Events");
    query.get(params.id).then((result) => {
      setName(result.get("eventName"));
      setStart(result.get("eventStart"));
      setEnd(result.get("eventEnd"));
      setDescription(result.get("fullDescription"));
      setPreviewLink(result.get("previewURL"));
      setImage(result.get("image"));
      setLoaded(true);
      document.title = result.get("eventName");
    });
  }, []);

  function EventPage(props) {
    return (
      <div className="event-page">
        <div className="event-tittle">{props.tittle}</div>
        <div>
          {previewLink ? (
            <iframe
              style={previewStyle}
              src={previewLink}
              width="744"
              height="504"
              frameBorder="0"
              allowFullScreen
              title="Event Preview"
            ></iframe>
          ) : image !== null ? (
            <img
              src={image}
              style={{ width: "40%", display: "block", margin: "0 auto" }}
              alt=""
            ></img>
          ) : (
            setLoaded(true)
          )}
        </div>
        <div className="event-description">
          <pre>{props.description}</pre>
        </div>
        <div className="event-date">
          {new Date(Date.parse(props.start)).toLocaleDateString()} -{" "}
          {new Date(Date.parse(props.end)).toLocaleDateString()}
        </div>
      </div>
    );
  }

  return loaded ? (
    <>
      <Navbar />
      <EventPage
        tittle={name}
        start={start}
        end={end}
        description={description}
      />
      <Footer />
    </>
  ) : (
    <Preloader />
  );
}

export default Event;

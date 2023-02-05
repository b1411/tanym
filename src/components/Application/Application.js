import { React, useState } from "react";
import InputMask from "react-input-mask";
import ReCAPTCHA from "react-google-recaptcha";
import Parse from "parse/dist/parse.min.js";

function Application() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [message, setMessage] = useState("");

  function acceptApllication(e) {
    e.preventDefault();
    if (name && surname && email && phone && message) {
      const apllication = new Parse.Object("Apllications");
      apllication.set("name", name);
      apllication.set("surname", surname);
      apllication.set("email", email);
      apllication.set("phone", phone.replace("+7", "7").trim());
      apllication.set("message", message);
      apllication
        .save()
        .then((result) => {
            alert("Заявка отправлена");
            setName("");
            setSurname("");
            setEmail("");
            setPhone("");
            setMessage("");
        })
        .catch((error) => console.log(error));
    } else {
      alert("Заполните все поля");
    }
  }

  return (
    <div style= {
        {
            height: (window.innerHeight + "px"),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            width: "100%",
            padding: "20px",
            boxSizing: "border-box",   
        }
    }>
      <div
        style={{
          textAlign: "center",
          fontSize: "clamp(1.2rem, 5vw, 1.3rem)",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Отправить заявку
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "clamp(0.8rem, 5vw, 0.8rem)",
          marginBottom: "20px",
        }}
      >
        Заполните форму и мы свяжемся с вами в ближайшее время
      </div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          width: "300px",
        }}
      >
        <div className="form-group">
          <input
            required
            type="text"
            className="form-control"
            id="name"
            placeholder="Введите имя"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            required
            type="text"
            className="form-control"
            id="surname"
            placeholder="Введите фамилию"
            onChange={(e) => setSurname(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            required
            type="email"
            className="form-control"
            id="email"
            placeholder="Введите email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <InputMask
            required
            mask="+7\ 999 999 99 99"
            maskChar=" "
            {...phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Введите номер телефона"
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            id="message"
            rows="3"
            placeholder="Введите сообщение"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        {/* <div className="form-group">
          <ReCAPTCHA
            required
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={() => setCaptcha(true)}
          ></ReCAPTCHA>
        </div> */}
        <button className="btn" onClick={(e) => acceptApllication(e)}>
          Отправить заявку
        </button>
      </form>
    </div>
  );
}

export default Application;
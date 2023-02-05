import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTwitter,
  faVk,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faFacebook, faInstagram, faTelegram, faTwitter, faVk, faYoutube);

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-wrap">
        <img
          src="https://taplink.st/a/d/f/7/3/7b81de.png?13"
          alt="logo"
          height={70}
        />
        <div className="footer-container">
          <div className="firstCol column">
            <div className="link-wrapper">
              <p>СТРАНИЦЫ</p>
              <ul>
                <li>
                  <Link to="/">Главная</Link>
                </li>
                <li>
                  <Link to="/events">Мероприятия</Link>
                </li>
                {/* <li>
                  <Link to="/partners">Партнеры</Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="secondCol column">
            <div className="link-wrapper">
              <p>АККАУНТ</p>
              <ul>
                <li>
                  <Link to="/login">Войти</Link>
                </li>
                <li>
                  <Link to="/register">Регистрация</Link>
                </li>
                <li>
                  <Link to="/profile-page">Профиль</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="thirdCol column">
            <div className="link-wrapper">
              <p>КОНТАКТЫ</p>
              <ul>
                <li>
                  <a href="tel:77472004910">+7 747 200 4910</a>
                </li>
                <li>
                  <a href="mailto:tanym.centre@gmail.com">Эл. Почта</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© 2023 TANYM. Все права защищены.</p>
          </div>
          <div className="footer-bottom-right">
            <ul className="footer-social">
              <li>
                <a href="https://www.facebook.com/tanym.centre">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/rcpk__kz/">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import Parse from "parse/dist/parse.min.js";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTelegram,
    faTwitter,
    faVk,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {useEffect} from "react";
import "animate.css";

library.add(
    faFacebook,
    faInstagram,
    faTelegram,
    faTwitter,
    faVk,
    faYoutube,
    faBars
);

function Navbar() {
    const user = Parse.User.current();
    const navigate = useNavigate();

    const hamburgerClick = (e) => {
        const menu = document.querySelector(".nav-center ul");
        const menuBtn = document.querySelector(".menu-btn");
        if (menu.style.display === "none") {
            menu.style.display = "block";
            menu.classList.add("animate__animated", "animate__fadeInLeft", "active");
        } else {
            menu.classList.add("animate__animated", "animate__fadeOutLeft");
            setTimeout(() => {
                menu.classList.remove("animate__animated", "animate__fadeOutLeft", "active");
                menu.style.display = "none";
            }, 300);
        }
    };

    useEffect(() => {
        const menu = document.querySelector(".nav-center ul");
        const menuBtn = document.querySelector(".menu-btn");
        if (window.innerWidth < 768) {
            menu.style.display = "none";
            menuBtn.style.display = "block";
        }
    }, []);


    return (
        <div className="navbar">
            <div className="nav-container">
                <div className="nav-left">
                    <Link to="/">
                        <img
                            src="https://taplink.st/a/d/f/7/3/7b81de.png?13"
                            alt="logo"
                            height={70}
                        />
                    </Link>
                </div>
                <div className="nav-center">
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
                    <div className="menu-btn" onClick={(e) => hamburgerClick()}>
                        <FontAwesomeIcon icon={faBars}/>
                    </div>
                </div>
                <div className="nav-right">
                    {user ? (
                        <Link to={"/profile-page"}><img style={{border: "1px solid grey", borderRadius: "50%"}} src={user.get("avatar")} alt="avatar" height={50} width={50}/>
                        </Link>) : (<button className={"btn"} onClick={() => navigate("/login")}>Войти</button>)}
                </div>
            </div>
        </div>
    );
}

export default Navbar;

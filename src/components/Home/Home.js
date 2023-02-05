import Navbar from "../Navbar/Navbar.js";
import { React, useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "animate.css";
import Footer from "../Footer/Footer.js";
import { Link } from "react-router-dom";
import twopeoples from "./download.svg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AnimationOnScroll } from "react-animation-on-scroll";
import InputMask from "react-input-mask";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ReCAPTCHA from "react-google-recaptcha";
import Preloader from "../Preloader/Preloader.jsx";

function Home() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function PartnerCard(props) {
    return (
      <div className="partner-card">
        <div className="partner-card-tittle">
          <div className="partner-card-logo">
            <img src={props.logo} alt="magnum"></img>
          </div>
          <h4>{props.tittle}</h4>
        </div>
        <div className="partner-card-description">{props.description}</div>
        <div className="partner-discount">-{props.discount}%</div>
      </div>
    );
  }

  const [events, setEvents] = useState([]);
  const [partners, setPartners] = useState([]);
  const responsive = {
    0: { items: 1 },
    768: { items: 2 },
    1024: { items: 3 },
  };

  const carouselItems = partners.map((partner, index) => (
    <PartnerCard
      key={index}
      logo={partner.get("logo")?.url() ?? { twopeoples }}
      tittle={partner.get("partnerName")}
      description={partner.get("shortDescription")}
      discount={partner.get("discount")}
    />
  ));
  useEffect(() => {
    const query = new Parse.Query("Partners");
    query.find().then((results) => {
      setPartners(results);
    });
  }, []);

  useEffect(() => {
    const query = new Parse.Query("Events");
    query.find().then((results) => {
      setEvents(results.slice(0, 3));
    });
    setLoaded(true);
  }, []);

  function acceptApllication(e) {
    e.preventDefault();
    if (name && surname && email && phone && captcha) {
      const apllication = new Parse.Object("Apllications");
      apllication.set("name", name);
      apllication.set("surname", surname);
      apllication.set("email", email);
      apllication.set("phone", phone.replace("+7", "7").trim());
      apllication
        .save()
        .then((result) => {
          setOpen(false);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Заполните все поля");
    }
  }

  return (
    (loaded ? (<>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "clamp(1.2rem, 5vw, 1.3rem)",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Вступить в TANYM
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
              <ReCAPTCHA
                required
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={() => setCaptcha(true)}
              ></ReCAPTCHA>
            </div>
            <button className="btn" onClick={(e) => acceptApllication(e)}>
              Отправить заявку
            </button>
          </form>
        </Box>
      </Modal>
      <Navbar />
      <div className="header-cont">
        <header className="header container">
          <div className="grid-tittle">
            <h1>
              ПРОФЕССИОНАЛЬНЫЙ СОЮЗ РАБОТНИКОВ ОБРАЗОВАНИЯ{" "}
              <span style={{ color: "#e57700" }}>TANYM</span>
            </h1>
            <p className="subtittle">
              Tanym centre — Республиканский центр поддержки работников
              образования. Это общественное объединение для граждан, работающих
              в организациях, учреждениях образования и науки
            </p>
          </div>
          <button className="btn" onClick={() => setOpen(true)}>
            Вступить в TANYM
          </button>
        </header>
      </div>
      <section className="section-regular">
        <div className="container">
          <div className="section-regular-tittle">
            <AnimationOnScroll animateIn="animate__fadeInLeft" animateOnce>
              <h2>Участвуйте в мероприятиях</h2>
              <p className="subtittle ">
                Участвуйте в мероприятиях, выигрывайте самые разные призы
              </p>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce>
              <Link to="/events">
                {" "}
                <button className="btn">Подробнее</button>
              </Link>
            </AnimationOnScroll>
          </div>
          <AnimationOnScroll animateIn={"animate__fadeIn"} animateOnce>
            <div className="event-card-list">
              {events.map((event, index) => (
                <Link to={`/events/${event.id}`} key={index}>
                  <div className="event-card">
                    <div className="event-card-tittle">
                      {event.get("eventName")}
                    </div>
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
          </AnimationOnScroll>
        </div>
      </section>
      <section className="section-partnership">
        <div className="container">
          <div className="section-partnership-tittle">
            <div className="section-regular-tittle">
              <h2>Присое&shy;диняйтесь к нашей партреской программе</h2>
              <p className="subtittle">Покупайте с выгодой у наших партнеров</p>
              <Link to="/partners">
                <button className="btn">Подробнее</button>
              </Link>
            </div>
          </div>
          <div className="partnership-list">
            <AliceCarousel
              mouseTracking
              items={carouselItems}
              responsive={responsive}
            />
          </div>
        </div>
      </section>
      <section
        className="section-regular"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="container">
          <div className="section-adv-tittle">
            <h2>Почему именно мы?</h2>
            <p className="subtittle">
              Что получат участники программы «TANYM»?
            </p>
          </div>
          <iframe
            className="adv-img"
            src="https://www.youtube.com/embed/T2LIRCfXyF0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
          <div className="why-us-list">
            <Accordion
              style={{
                width: "100%",
              }}
            >
              <AccordionSummary>
                <div className="why-us-item">
                  <img src={twopeoples} alt=""></img>
                  <div>
                    <div className="why-us-item-tittle">
                      Защита прав и свобод
                    </div>
                    <div className="why-us-item-description">
                      С юридическим направлением TANYM по защите трудовых прав и
                      конституционных свобод педагогов, каждый участник будет
                      защищен на юридическом уровне.
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  🔐 TANYM. Защита трудовых прав и конституционных свобод
                  педагогов.
                  <br />
                  <br />
                  ❗Педагоги, к сожалению, часто поддаются нападкам, хотя должны
                  пользоваться уважением и надежностью, ведь на них возложена
                  обязанность формировать детей с помощью системы образования,
                  предоставляя ее самые основные ценности, ценности, которые
                  будут перенесены в дальнейшую жизнь учеников.
                  <br />
                  <br />✅ С юридическим направлением TANYM по защите трудовых
                  прав и конституционных свобод педагогов, каждый участник будет
                  защищен на юридическом уровне.
                  <br />
                  <br />
                  Педагогам TANYM открыт доступ к правовой консультации и
                  поддержке наших сотрудников юридического отдела.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                width: "100%",
              }}
            >
              <AccordionSummary>
                <div className="why-us-item">
                  <img src={twopeoples} alt=""></img>
                  <div>
                    <div className="why-us-item-tittle">
                      Ресурсный центр TANYM
                    </div>
                    <div className="why-us-item-description">
                      Данное направление предлагает нашим педагогам доступ к
                      коворкинг зоне и программе foundation.
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                🔐 Ресурсный центр TANYM
                <br />
                <br />
                Данное направление предлагает нашим педагогам доступ к коворкинг
                зоне и программе foundation.
                <br />
                <br />
                Foundation — программа дополнительного внешкольного образования
                для учеников. Foundation подразумевает установку связи между
                учеником и педагогом для проведения репетиторских занятий
                индивидуально и в мини-группах. Уроки проводятся в специальных
                кабинетах ресурсного центра TANYM.
                <br />
                <br />
                ✅Мы находим клиентов — вы занимаетесь любимым делом
                <br />
                <br />
                Коворкинг зона TANYM - это свободное пространство для педагогов
                центра, оборудованное под репетиторские занятия с учениками в
                online и offline формате. Компьютерная техника, оборудованные
                классы, библиотека и свободное пространство, ресурсный центр
                TANYM предоставляет все необходимое для комфортного пребывания
                на территории коворкинг зоны.
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                width: "100%",
              }}
            >
              <AccordionSummary>
                <div className="why-us-item">
                  <img src={twopeoples} alt=""></img>
                  <div>
                    <div className="why-us-item-tittle">
                      Международные стажировки TANYM
                    </div>
                    <div className="why-us-item-description">
                      Программа международных стажировок TANYM – это программа
                      повышения квалификации для учителей средних школ.
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                🌍 Международные стажировки TANYM
                <br></br>
                <br />
                Программа международных стажировок TANYM – это программа
                повышения квалификации для учителей средних школ. Программа
                предоставляет уникальную возможность педагогам расширить
                профессиональные знания в своей предметной области,
                усовершенствовать педагогические навыки и поближе познакомиться
                с культурой и повседневной жизнью в различных странах мира.
                <br></br>
                <br></br>• Международные стажировки на 2-4 недели 🌍
                <br></br>• Заграничные конференции 🔝
                <br></br>• Повышение квалификации 📚
                <br></br>
                <br></br>✅Стажировка полностью оплачивается за счет программы
                TANYM и предусматривает:<br></br>
                <br></br>• Оплату тестирования по английскому языку для всех
                отобранных участников программы
                <br></br>• Поддержку в получении визы (при необходимости)
                <br></br>• Оплату всех транспортных расходов из города
                проживания до места стажировки в США и обратно
                <br></br>• Медицинскую страховку
                <br></br>• Встреча представителя в стране стажировки для
                ознакомления с городом.
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                width: "100%",
              }}
            >
              <AccordionSummary>
                <div className="why-us-item">
                  <img src={twopeoples} alt=""></img>
                  <div>
                    <div className="why-us-item-tittle">TANYM CARD</div>
                    <div className="why-us-item-description">
                      TANYM CARD — это индивидуальные бонусные карты участников
                      программы TANYM.
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <br></br>💳 TANYM CARD<br></br>
                <br></br>TANYM CARD — это индивидуальные бонусные карты
                участников программы TANYM.<br></br>
                <br></br>📱 Управление картой, бонусами, покупками и оплатой
                производится через удобное мобильное приложение «Tanym».
                <br></br>TANYM Bonus:<br></br>
                <br></br>• Частичная или полная оплата покупок бонусами TANYM
                CARD в магазинах-партнерах*
                <br></br>• Предоставление скидок на товары магазинов-партнеров
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                width: "100%",
              }}
            >
              <AccordionSummary>
                <div className="why-us-item">
                  <img src={twopeoples} alt=""></img>
                  <div>
                    <div className="why-us-item-tittle">TANYM TEACHER</div>
                    <div className="why-us-item-description">
                      TANYM TEACHER — программа подготовки преподавателей нового
                      формата.
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <br />✅ Направления программы TANYM TEACHER:
                <br />
                <br />• Нi-tech 🤖
                <br></br>• Social media 📹
                <br></br>• Инновационные методики 📒
                <br></br>• Психология ученика 3000 🎓
                <br></br>
                <br></br>🤖 Нi-tech — направление, основной задачей которого
                является внедрение компьютерных технологий в преподавательскую
                деятельность. Корректное использование программ и платформ для
                online-обучения, умение исправлять базовые ошибки в работе
                программы и базовые навыки владения ПК. Обучение педагогов
                компьютерной грамотности одна из важнейших задач TANYM TEACHER.
                <br></br>
                <br></br>📹 Social media — направление, значимой задачей которой
                является освоение социальных сетей педагогами TANYM. Съемка
                обучающего контента и внедрение преподавателей в
                медиа-пространство не только привлечет молодое поколение 21
                века, а повысит тягу к знаниям.
                <br></br>
                <br></br>📒 Инновационные методики — совместная разработка
                преподавателями TANYM новых пособий и методик образования, их
                внедрение на государственном уровне в школы нашей республики.
                <br></br>
                <br></br>🎓 Психология ученика 3000 — психологическое
                направление программы TANYM TEACHER. Профессиональные психологи
                проведут теоретические и практические занятия по работе с
                подростками различных типов. Психология учеников третьего
                тысячелетия это неизвестность, с которой нужно уметь правильно
                работать.
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                width: "100%",
              }}
            >
              <AccordionSummary>
                <div className="why-us-item">
                  <img src={twopeoples} alt=""></img>
                  <div>
                    <div className="why-us-item-tittle">
                      Общественный совет педагогов Tanym (ОСП)
                    </div>
                    <div className="why-us-item-description">
                      ОСП Tanym по вопросам педагогической этики и защите прав
                      педагога является совещательным органом.
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionSummary>
                <br></br>ОСП Tanym по вопросам педагогической этики и защите
                прав педагога является совещательным органом, созданным в
                Республиканском Центре Поддержки Работников Образования (РЦПРО)
                города Алматы и Республиканском центре подготовки и повышения
                квалификации.
                <br></br>
                <br></br>Основными задачами ОСП по вопросам педагогической этики
                и защите прав педагога являются:
                <br></br>🔝 Обеспечение повышения благосостояния педагогов при
                соблюдении норм Закона Республики Казахстан «О статусе педагога»
                и Правил педагогической этики;
                <br></br>📖 Выработка рекомендаций, направленных на обеспечение
                профессиональной деятельности педагога, на предупреждение и
                профилактику нарушений прав педагога при осуществлении
                профессиональной деятельности и норм Педагогической этики;
                <br></br>📝 Оказание методической и консультативной помощи
                педагогическим коллективам, руководителям, председателям Советов
                по педагогической этике организаций образования города Алматы;
                <br></br>📢 Осуществление деятельности, направленной на
                повышение и укрепление статуса педагога в обществе.
                <br></br>
                <br></br>❗Проведение ежемесячных собраний с педагогами TANYM
                даст возможность проработать разработать, принять и утвердить
                новые реформы в сфере образования.
              </AccordionSummary>
            </Accordion>
          </div>
        </div>
      </section>
      <section
        className="testimonial-section"
        style={{
          backgroundColor: "#f9f9fb",
        }}
      >
        <div className="container">
          <div className="testimonial-section-tittle">
            <div className="subtittle">Отзывы</div>
            <h2>Что о нас говорят учителя</h2>
          </div>
        </div>
        <div className="testimonial-carousel">
          <AliceCarousel
            mouseTracking
            items={[
              <div
                style={{
                  padding: "50px 0",
                  margin: "0 auto",
                  width: "70%",
                  maxWidth: "500px",
                }}
              >
                <div className={"review"}>
                  <div className={"tittle-review"}>
                    <img
                      height={50}
                      src="https://i.imgur.com/pks5i9x.jpg"
                      alt=""
                    />
                    <h4>Ақнұр Ақылжан</h4>
                  </div>
                  <p>
                    Білім және ғылым ұйымдарында, мекемелерінде жұмыс істейтін
                    азаматтарға арналған қоғамдық бірлестік, өз жұмыстарыңызды
                    жақсы атқарудасыздар, керемет, пайдалы парақша, тиісті
                    сұрақтарға мұғалімдерге толық жауап беріп отырғандарыңызға
                    рахмет!
                  </p>
                </div>
              </div>,
              <div
                style={{
                  padding: "50px 0",
                  margin: "0 auto",
                  width: "70%",
                  maxWidth: "500px",
                }}
              >
                <div className={"review"}>
                  <div className={"tittle-review"}>
                    <img
                      height={50}
                      src="https://i.imgur.com/wzGBsKU.jpg"
                      alt=""
                    />
                    <h4>Айнура Жакенова</h4>
                  </div>
                  <p>
                    Мемлекеттік ұйымдарда, мекемелерінде жұмыс істейтін
                    азаматтарға арналған қоғамдық бірлестігіне сәттілік
                    тілеймін! Жұмыстарыңыз өрлей берсін! Әр сұраққа тиянақты
                    жауап беріп белсенділік танытып жатырсыздар! Өте керемет!
                  </p>
                </div>
              </div>,
              <div
                style={{
                  padding: "50px 0",
                  margin: "0 auto",
                  width: "70%",
                  maxWidth: "500px",
                }}
              >
                <div className={"review"}>
                  <div className={"tittle-review"}>
                    <img
                      height={50}
                      src="https://i.imgur.com/9mnnafZ.png"
                      alt=""
                    />
                    <h4>Амангул Даулетбаева</h4>
                  </div>
                  <p>
                    TANYM вы на самом деле самый лучший профсоюз 🔥🔥🔥 Спасибо
                    вам за ваше внимание, очень приятный сюрприз. Как никогда
                    чувствуем себя под защитой. 😍😍😍 В свою очередь, хочу
                    пожелать вам здоровья, счастья и творческих успехов 👏👏👏👏
                  </p>
                </div>
              </div>,
            ]}
            responsive={{
              0: { items: 1 },
              600: { items: 1 },
              1024: { items: 1 },
            }}
          />
        </div>
      </section>
      <Footer />
      </>
  ) : ( <Preloader />)));
}

export default Home;

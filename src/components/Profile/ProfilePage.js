import Parse from "parse/dist/parse.min.js";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {React, useState, useEffect} from "react";
import {Typography, Box, Modal} from "@mui/material";
import Avatar from "react-avatar-edit"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXbox} from "@fortawesome/free-brands-svg-icons";
import {faCircleCheck, faFaceFrown, faFaceSmile, faXmark} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

library.add(faXbox, faCircleCheck, faFaceFrown, faFaceSmile, faXmark);


function ProfilePage() {
    const user = Parse.User.current();
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const sheetUrl = "https://sheets.googleapis.com//v4/spreadsheets/1X73ypgJipmjbnhwtrBSODKpeb0oteiL2gnKXrPRa21g/values/A1:B?majorDimension=ROWS&key=AIzaSyB-JGnnhjkEY0gcRPGfj88CNwz_pHamfcs"

    async function getSheet() {
        const res = await axios.get(sheetUrl);
        return res.data.values;
    }

    // function levenshtein(s1, s2, costs) {
    //     var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    //     l1 = s1.length;
    //     l2 = s2.length;

    //     costs = costs || {};
    //     var cr = costs.replace || 1;
    //     var cri = costs.replaceCase || costs.replace || 1;
    //     var ci = costs.insert || 1;
    //     var cd = costs.remove || 1;

    //     cutHalf = flip = Math.max(l1, l2);

    //     var minCost = Math.min(cd, ci, cr);
    //     var minD = Math.max(minCost, (l1 - l2) * cd);
    //     var minI = Math.max(minCost, (l2 - l1) * ci);
    //     var buf = new Array((cutHalf * 2) - 1);

    //     for (i = 0; i <= l2; ++i) {
    //         buf[i] = i * minD;
    //     }

    //     for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
    //         ch = s1[i];
    //         chl = ch.toLowerCase();

    //         buf[flip] = (i + 1) * minI;

    //         ii = flip;
    //         ii2 = cutHalf - flip;

    //         for (j = 0; j < l2; ++j, ++ii, ++ii2) {
    //             cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
    //             buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
    //         }
    //     }
    //     return buf[l2 + cutHalf - flip];
    // }

    function handleEnter(e) {
        setIsHover(true);
    }

    function handleOpen() {
        setOpen(true);
    }

    function onCrop(prev) {
        setPreview(prev);
    }

    function onClose() {
        setPreview(null);
    }

    function onBeforeFileUpload(elem) {
        if (elem.target.files[0].size > 1000000) {
            alert("Размер файла не должен превышать 1 мб");
            elem.target.value = "";
        }
        else if(elem.target.files[0].type !== "image/jpeg" && elem.target.files[0].type !== "image/png") {
            alert("Неверный формат файла");
            elem.target.value = "";
        }
    }

    return (<>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: 24,
                p: 4,
            }}>
                <FontAwesomeIcon
                    icon={faXmark}
                    style={{position: "absolute", top: "10px", right: "10px", cursor: "pointer", display: "block"}}
                    onClick={() => setOpen(false)}
                />
                <Typography id="modal-modal-title" variant="h5" component="h2"
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                            }}>
                    Поменять аватар
                </Typography>
                <div className={"avatar-cont"}>
                    <Avatar
                        width={300}
                        height={300}
                        onCrop={onCrop}
                        onClose={onClose}
                        onBeforeFileLoad={onBeforeFileUpload}
                    />
                    <button className={"btn"} onClick={() => {
                        if(preview.size === 0) {setOpen(false); return;}
                        user.set("avatar", preview);
                        user.save();
                        setOpen(false);
                    }}>Загрузить
                    </button>
                </div>
            </Box>
        </Modal>
        <Navbar/>
        <div className="profile-page">
            <div className="profile-cont">
                <h1>Профиль</h1>
                <div className={"flex-cont"}>
                    <div className="profile-tittle">
                        <div
                            className={"profile-image"}
                            onMouseEnter={(e) => handleEnter(e)}
                            onClick={handleOpen}
                            onMouseLeave={() => setIsHover(false)}>
                            <img src={user.get("avatar")} alt="avatar"></img>
                            {isHover && <span className={"avatar-text"}>Поменять аватарку</span>}
                        </div>
                        <p className={"profile-name"}>{user.get("fullname")}</p>
                        <p>{user.get("username").toString()}</p>
                    </div>
                    <ul>
                        <li>
                            <span className="profile-info">Email: </span> {user.get("email")}
                        </li>
                        <li>
                            <span className="profile-info">Номер школы: </span> {user.get("school")}
                        </li>
                        <li>
                            <span className="profile-info">Уникальный код: </span>
                            {user["id"]}
                        </li>
                        <li className={"member-wrap"}>
                            {user.get("isMember") ? (<p style={{color: "#4BB543", fontSize: "1rem"}}>
                                <FontAwesomeIcon icon={faFaceSmile}/> Вы являетесь членом партнерской программы!
                            </p>) : (<p style={{color: "#FC100D", fontSize: "1rem"}}>
                                <FontAwesomeIcon icon={faFaceFrown}/> Вы не являетесь членом партнерской программы!
                            </p>)}
                        </li>
                    </ul>
                </div>
                {user.get("role") === "admin" ? (<a href={"https://tanym.admin.back4app.com/"}>Админ панель</a>) : null}

                <div className="profile-btns">
                    <div
                        className="btn logout-btn"
                        onClick={() => {
                            Parse.User.logOut();
                            navigate("/login");
                        }}
                    >
                        Выйти
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>);
}

export default ProfilePage;

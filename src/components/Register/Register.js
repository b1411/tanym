import Parse from "parse/dist/parse.min.js";
import {React, useState} from "react";
import {Navigate} from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "../Navbar/Navbar";
import useVH from "react-viewport-height";
import {useNavigate} from "react-router";
import Avatar from "react-avatar-edit"

function Register() {
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameIsValid, setNameIsValid] = useState(false);
    const [surnameIsValid, setSurnameIsValid] = useState(false);
    const [phoneIsValid, setPhoneIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [confrimPasswordIsValid, setConfrimPasswordIsValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [isRegistered, setRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [isCaptchaValid, setCaptchaValid] = useState(false);
    const [school, setSchool] = useState("");
    const [schoolIsValid, setSchoolIsValid] = useState(false);
    const [preview, setPreview] = useState(null);

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
    //     var buf = new Array(cutHalf * 2 - 1);
      
    //     for (i = 0; i <= l2; ++i) {
    //       buf[i] = i * minD;
    //     }
      
    //     for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
    //       ch = s1[i];
    //       chl = ch.toLowerCase();
      
    //       buf[flip] = (i + 1) * minI;
      
    //       ii = flip;
    //       ii2 = cutHalf - flip;
      
    //       for (j = 0; j < l2; ++j, ++ii, ++ii2) {
    //         cost = ch === s2[j] ? 0 : chl === s2[j].toLowerCase() ? cri : cr;
    //         buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
    //       }
    //     }
    //     return buf[l2 + cutHalf - flip];
    //   }  

    const doRegister = async (e) => {
        e.preventDefault();
        if (
            nameIsValid &&
            surnameIsValid &&
            phoneIsValid &&
            passwordIsValid &&
            confrimPasswordIsValid &&
            emailIsValid &&
            isCaptchaValid &&
            schoolIsValid
        ) {
            // let res = await fetch("https://sheets.googleapis.com//v4/spreadsheets/1X73ypgJipmjbnhwtrBSODKpeb0oteiL2gnKXrPRa21g/values/A1:B?majorDimension=ROWS&key=AIzaSyB-JGnnhjkEY0gcRPGfj88CNwz_pHamfcs")
            // res.json().then((data) => {
            //     let teachers = data.values.filter((item) => item[1] === school && item.every((i) => i !== !!i));
            //     const nearest = teachers.reduce((prev, curr) => {
            //         const prevDist =
            //           levenshtein(prev[0], user[0]) + levenshtein(prev[1], user[1]);
            //         const currDist =
            //           levenshtein(curr[0], user[0]) + levenshtein(curr[1], user[1]);
                  
            //         return prevDist < currDist ? prev : curr;
            //       });  
            // })
            const user = new Parse.User();
            const phoneVal = phone.replace("+7", "7").replaceAll(" ", "");
            user.set("password", password);
            user.set("username", phoneVal);
            user.set("fullname", username + " " + surname);
            user.set("email", email);
            user.set("school", school);
            user.set(
                "memberID",
                (process.env.REACT_APP_BASE % parseInt(phoneVal)) + parseInt(phoneVal)
            );
            user.set("avatar", preview ?? "http://cdn.onlinewebfonts.com/svg/img_258083.png");
            try {
                const createdUser = await user.signUp();
                setErrorMessages(["Подтвердите свою почту, чтобы войти"]);
                await Parse.User.logOut();
                setRegistered(true);
                return true;
            } catch (error) {
                console.log(preview);
                console.log(error.message);
                setErrorMessages(["Такой пользователь уже зарегистрирован"]);
                return false;
            }
        }
    };

    function onNameChange(e) {
        let val = e.target.value;
        if (val.length > 2) {
            setName(val);
            setNameIsValid(true);
            setErrorMessages([]);
        } else {
            setErrorMessages(["Имя должно содержать не менее 3 символов"]);
        }
    }

    function onSurnameChange(e) {
        let val = e.target.value;
        if (val.length > 2) {
            setSurname(val);
            setSurnameIsValid(true);
            if (nameIsValid) {
                setErrorMessages([]);
            }
        } else {
            setErrorMessages(["Фамилия должна содержать не менее 3 символов"]);
        }
    }

    function onEmailChange(e) {
        let val = e.target.value;
        if (val.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm)) {
            setEmail(val);
            setEmailIsValid(true);
            if (nameIsValid && surnameIsValid) {
                setErrorMessages([]);
            }
        } else {
            setErrorMessages(["Email неправильного формата"]);
        }
    }

    function onSchoolChange(e) {
        setSchool(e.target.value);
        setSchoolIsValid(true);
    }

    function onPhoneChange(e) {
        let val = e.target.value;
        if (val.length > 16) {
            return;
        }
        val = val.replace(/ /gm, "");
        let num = `+7 ${val.substring(2, 5)} ${val.substring(5, 8)} ${val.substring(
            8,
            10
        )} ${val.substring(10, 12)}`;
        num = num.trim();
        setPhone(num);
        if (num.length === 16) {
            setPhoneIsValid(true);
            if (nameIsValid && surnameIsValid && emailIsValid) {
                setErrorMessages([]);
            }
        }
    }

    function onPasswordChange(e) {
        let val = e.target.value;
        if (
            val.length > 7 &&
            val.length < 17 &&
            val.match(/[a-z]/gm) &&
            val.match(/[A-Z]/gm) &&
            val.match(/[0-9]/gm)
        ) {
            setPassword(val);
            setPasswordIsValid(true);
            if (nameIsValid && surnameIsValid && emailIsValid && phoneIsValid) {
                setErrorMessages([]);
            }
        } else {
            setErrorMessages([
                "Пароль должен содержать от 8 до 16 символов, включая цифры, строчные и прописные буквы",
            ]);
        }
    }

    function onConfirmPasswordChange(e) {
        let val = e.target.value;
        if (val === password) {
            setConfirmPassword(val);
            setConfrimPasswordIsValid(true);
            if (
                nameIsValid &&
                surnameIsValid &&
                nameIsValid &&
                phoneIsValid &&
                passwordIsValid
            ) {
                setErrorMessages([]);
            }
        } else {
            setErrorMessages(["Пароли не совпадают"]);
        }
    }

    function onCaptchaChange() {
        setCaptchaValid(true);
    }

    // function onBeforeFileUpload(elem) {
    //     if (elem.target.files[0].size > 1000000) {
    //         setErrorMessages(["Размер файла не должен превышать 1 МБ"]);
    //         elem.target.value = "";
    //         return false;
    //     }
    // }

    // function onClose() {
    //     setPreview(null);
    // }

    // function onCrop(prev) {
    //     setPreview(prev);
    // }

    useVH();

    return (
        <>
            <Navbar/>
            <div className="reg-container">
                <div className="register">
                    <h1>Регистрация</h1>
                    <form>
                        <div style={{color: "#FC100D"}}>{errorMessages}</div>
                        <div className="form-group">
                            <input
                                type="text"
                                required
                                className="form-control"
                                placeholder="Имя"
                                onChange={(e) => onNameChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                required
                                className="form-control"
                                placeholder="Фамилия"
                                onChange={(e) => onSurnameChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                required
                                className="form-control"
                                placeholder="Номер школы"
                                onChange={(e) => onSchoolChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                required
                                className="form-control"
                                placeholder="Эл. почта"
                                onChange={(e) => onEmailChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                required
                                value={phone}
                                className="form-control tel"
                                placeholder="Номер телефона"
                                onChange={(e) => onPhoneChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                required
                                className="form-control"
                                placeholder="Пароль"
                                onChange={(e) => onPasswordChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                required
                                className="form-control"
                                placeholder="Подтвердите пароль"
                                onChange={(e) => onConfirmPasswordChange(e)}
                            />
                        </div>
                        {/* <div className={"form-group"}>
                            <Avatar
                                width={300}
                                height={250}
                                onCrop={onCrop}
                                onClose={onClose}
                                onBeforeFileLoad={onBeforeFileUpload}
                            ></Avatar>
                        </div> */}
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={(e) => onCaptchaChange(e)}
                        ></ReCAPTCHA>
                        <button className="btn btn-primary" onClick={(e) => doRegister(e)}>
                            Принять
                        </button>
                        {isRegistered &&
                            setTimeout(() => {
                                navigate("/login");
                            }, 1000)}
                        {Parse.User.current() && <Navigate to="/profile-page"/>}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;

import { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Navigate } from 'react-router';
import {Link} from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Navbar from '../Navbar/Navbar';
import useVH from 'react-viewport-height';

function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [isCaptchaValid, setCaptchaValid] = useState(false);

    function onPhoneChange(e) {

        let val = e.target.value;
        if (val.length > 16) {
            return;
        }
        val = val.replace(/ /gm, '');
        let num = `+7 ${val.substring(2, 5)} ${val.substring(5, 8)} ${val.substring(8, 10)} ${val.substring(10, 12)}`;
        num = num.trim();
        setPhone(num);
    }

    function onCaptchaChange() {
        setCaptchaValid(true);
    }

    async function doUserLogIn(e) {
        e.preventDefault();
        const phoneVal = phone.replace('+7', '7').replaceAll(' ', '');
        const passwordVal = password.target.value;
        if (phone.length > 15 && passwordVal.length > 7 && isCaptchaValid) {
            try {
                const user = await Parse.User.logIn(phoneVal, passwordVal);
                if (user) {
                    setIsLogged(true);
                }
            }
            catch (error) {
                if (error.code === 101) {
                    setErrorMessages(['Неверный номер телефона или пароль']);
                }
            }
        }
        else {
            setErrorMessages(['Неверный формат номера телефона или пароля']);
        }
    }
    useVH();
    return (
        <>
        {Parse.User.current() ? <Navigate to='/profile-page' /> : null}
        <Navbar/>
        <div className='reg-container'>
            <div className="register">
                <h1>Вход</h1>
                <form>
                    <div className='error-messages'>{errorMessages}</div>
                    {/* <div className="form-group">
                        <input type='text' placeholder='Имя' required onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <input type='text' placeholder='Фамилия' required onChange={(e) => setSurname(e.target.value)}></input>
                    </div> */}
                    <div className="form-group">
                        <input type="text" value={phone} required className="form-control" placeholder="Номер телефона" onChange={(e) => onPhoneChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="password" required className="form-control" placeholder="Пароль" onChange={(e) => setPassword(e)} />
                    </div>
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onChange={(e) => onCaptchaChange(e)}
                    ></ReCAPTCHA>
                    <button className="btn btn-primary" onClick={(e) => doUserLogIn(e)}>Войти</button>
                    {(isLogged || localStorage.getItem('token')) ? <Navigate to='/'></Navigate> : null}
                </form>
                <div className="reg-link">
                    <Link className='' to="/register">Нет аккаунта</Link>
                    <Link className='' to="/reset-password">Забыли пароль?</Link>
                </div>
            </div>
        </div>
        </>
    );
} 


export default Login;
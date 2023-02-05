import Parse from "parse/dist/parse.min.js";
import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";

function ResetPassword() {

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const navigate = useNavigate();

    function onChangeMail(e) {
        setEmail(e.target.value);
        if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm)) {
            setIsEmailValid(true);
        }
        else {
            setIsEmailValid(false);
        }
    }

    async function doRequestPasswordReset(email) {
        if (!isEmailValid) {
            try {
                await Parse.User.requestPasswordReset(email);
                alert('Письмо с инструкциями по восстановлению пароля отправлено на указанный адрес');
                navigate('/login');
            } catch (error) {
                alert('Что-то пошло не так');
            }
        }
    }

    return (
        <>
        <Navbar/>
        <div className='reg-container'>
            <div className='register'>
                <h1>Восстановление пароля</h1>
                <form>
                    <div className='form-group'>
                        <input type='email' placeholder='Email' onChange={(e) => onChangeMail(e)}></input>
                    </div>
                    <button className="btn btn-primary" onClick={() => doRequestPasswordReset(email)}>Восстановить</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default ResetPassword;
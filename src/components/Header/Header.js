import logo from './img/logo.png';
import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';


function Profile() {
    const user = Parse.User.current();
    const [isOPen, setOpen] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (!(ref.current.contains(event.target))) {
            setOpen(false);
        }

    }

    useEffect(() => {
        document.addEventListener("mousedown", (e) => handleClickOutside(e));
        return () => {
            document.removeEventListener("mousedown", (e) => handleClickOutside(e));
        };
    }, []);

    if (user) {
        return (
            <div className='profile'>
                <div className='profile-name' onMouseOver={() => setOpen(true)} onMouseDown={(e) => (handleClickOutside(e))}>
                    <span>{user.get('fullname')}</span> 
                </div>
                <div className='profile-menu' ref={ref} style={{ display: isOPen ? 'block' : 'none' }}>
                    <Link to='/profile-page'>Профиль</Link>
                </div>
            </div>)
    }
    else {
        return (
            <div className='profile'>
                <Link to='/login'>Войти</Link>
                <Link to='/register'>Регистрация</Link>
            </div>)
    }
}

function Header() {
    return (
        <div className='container'>
            <header>
                <Link to='/'><img src={logo} className="logo"></img></Link>
                <Profile></Profile>
            </header >
        </div >
    );
}

export default Header;
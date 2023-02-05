import {React , useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


function Error404() {   
    return (
        <div className='reg-container'>
            <div className='register'>
                <h1>404</h1>
                <h2>Страница не найдена</h2>
                <Link to='/' className='back-link'>Вернуться на главную</Link>
            </div>
        </div>

    );
}

export default Error404;
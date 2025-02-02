import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Надсилання запиту на сервер
            const response = await axios.post('http://localhost:5000/api/user/login', {
                username,
                password,
            });

            // Отримання токена та збереження в локальному сховищі
            localStorage.setItem('token', response.data.token);
            navigate('/')
        } catch (error) {
            setError('Неправильний логін або пароль');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Логін</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Користувач</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Увійти</button>
            </form>
        </div>
    );
};

export default Login;

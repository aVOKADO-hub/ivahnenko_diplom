import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [statistics, setStatistics] = useState(null);
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Завантажуємо статистику
        axios.get('http://localhost:5000/api/statistics')
            .then((response) => setStatistics(response.data))
            .catch((error) => console.error('Помилка завантаження статистики:', error));

        // Завантажуємо новини
        axios
            .get('https://gnews.io/api/v4/top-headlines?lang=ua&country=ua&category=general&apikey=ef5af941adcee1e5d2ab9e0e06571f0b')
            .then((response) => setNews(response.data.articles.slice(0, 10))) // Беремо тільки 5 новин
            .catch((error) => console.error('Помилка завантаження новин:', error));
    }, []);

    return (
        <div>
            <h2 className="mb-4">Головна сторінка</h2>

            {/* Статистика */}
            <div className="mb-4">
                <h4>Статистика обліку кадрів</h4>
                {statistics ? (
                    <ul className="list-group">
                        <li className="list-group-item">Загальна кількість кадрів: {statistics.total}</li>
                        <li className="list-group-item">Офіцерів: {statistics.officers}</li>
                        <li className="list-group-item">Сержантів: {statistics.sergeants}</li>
                        <li className="list-group-item">Рядових: {statistics.soldiers}</li>
                    </ul>
                ) : (
                    <p>Завантаження...</p>
                )}
            </div>

            {/* Новини */}
            <div className="container mt-4">
                <h3 className="mb-4">Новини</h3>
                <div className="row">
                    {news.map((article, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <div className="card">
                                {/* Відображення зображення */}
                                {article.image && (
                                    <img
                                        src={article.image}
                                        className="card-img-top"
                                        alt={article.title}
                                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <div>
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.description}</p>
                                    </div>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                        Детальніше
                                    </a>
                                </div>
                                <div className="card-footer text-muted">
                                    <small>Опубліковано: {new Date(article.publishedAt).toLocaleString()}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

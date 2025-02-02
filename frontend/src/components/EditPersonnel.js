import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPersonnel = ({ personnel, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        rank: '',
        unit: '',
        contact: ''
    });

    // useEffect для оновлення даних форми при зміні personnel
    useEffect(() => {
        if (personnel) {
            setFormData({
                name: personnel.name || '',
                rank: personnel.rank || '',
                unit: personnel.unit || '',
                contact: personnel.contact || ''
            });
        } else {
            // Скидання форми при створенні нового запису
            setFormData({
                name: '',
                rank: '',
                unit: '',
                contact: ''
            });
        }
    }, [personnel]); // Залежність від personnel

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (personnel) {
                // Редагування
                const updated = await axios.put(
                    `http://localhost:5000/api/personnel/${personnel._id}`,
                    formData
                );
                onSave(updated.data);
            } else {
                // Додавання
                const created = await axios.post('http://localhost:5000/api/personnel', formData);
                onSave(created.data);
            }
            onClose();
        } catch (error) {
            console.error('Помилка збереження даних:', error);
        }
    };

    const ranks = [
        'солдат', 'старший солдат',
        'молодший сержант', 'сержант', 'старший сержант',
        'головний сержант', 'штаб-сержант', 'майстер-сержант',
        'старший майстер-сержант', 'головний майстер-сержант',
        'молодший лейтенант', 'лейтенант', 'старший лейтенант',
        'капітан', 'майор', 'підполковник', 'полковник',
        'бригадний генерал', 'генерал-майор', 'генерал-лейтенант', 'генерал'
    ];

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{personnel ? 'Редагувати запис' : 'Додати новий запис'}</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Ім'я</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Звання</label>
                                <select
                                    id="rank"
                                    name="rank"
                                    value={formData.rank}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">Оберіть звання</option>
                                    {ranks.map((rank) => (
                                        <option key={rank} value={rank}>
                                            {rank}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Підрозділ</label>
                                <input
                                    type="text"
                                    name="unit"
                                    className="form-control"
                                    value={formData.unit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Контакт</label>
                                <input
                                    type="text"
                                    name="contact"
                                    className="form-control"
                                    value={formData.contact}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Скасувати
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Зберегти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPersonnel;
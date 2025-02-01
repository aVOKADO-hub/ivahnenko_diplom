import React, { useEffect, useState } from 'react';
import EditPersonnel from './EditPersonnel';
import axios from 'axios';

const PersonnelTable = () => {
    const [personnel, setPersonnel] = useState([]);
    const [editingPersonnel, setEditingPersonnel] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    // Отримати дані з API
    useEffect(() => {
        const fetchPersonnel = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/personnel');
                setPersonnel(response.data);
            } catch (error) {
                console.error('Помилка завантаження даних:', error);
            }
        };
        fetchPersonnel();
    }, []);

    // Видалити запис
    const handleDelete = async (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити запис?')) {
            try {
                await axios.delete(`http://localhost:5000/api/personnel/${id}`);
                setPersonnel(personnel.filter((p) => p._id !== id));
            } catch (error) {
                console.error('Помилка видалення:', error);
            }
        }
    };

    const handleEdit = (person) => {
        setEditingPersonnel(person); // Установка даних обраного військовослужбовця
        setShowEditModal(true);
    };

    const handleSave = (updatedPersonnel) => {
        // Оновлення даних на сервері
        axios
            .put(`/api/personnel/${updatedPersonnel._id}`, updatedPersonnel)
            .then((response) => {
                // Оновлюємо стан з оновленими даними
                setPersonnel((prev) =>
                    prev.map((person) =>
                        person._id === updatedPersonnel._id ? updatedPersonnel : person
                    )
                );
                setShowEditModal(false);
            })
            .catch((error) => console.error('Помилка оновлення даних:', error));
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    return (
        <div className="container mt-5">
            <h2>Облік кадрів</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ім'я</th>
                        <th>Звання</th>
                        <th>Підрозділ</th>
                        <th>Контакт</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {personnel.map((person, index) => (
                        <tr key={person._id}>
                            <td>{index + 1}</td>
                            <td>{person.name}</td>
                            <td>{person.rank}</td>
                            <td>{person.unit}</td>
                            <td>{person.contact}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(person)}
                                >
                                    Редагувати
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(person._id)}
                                >
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Модальне вікно */}
            {showEditModal && (
                <EditPersonnel
                    personnel={editingPersonnel}
                    onSave={handleSave}
                    onClose={handleCloseModal}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};

export default PersonnelTable;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import PersonnelTable from './components/PersonnelTable';
import EditPersonnel from './components/EditPersonnel';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/style.css';

const App = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPersonnel, setEditingPersonnel] = useState(null);
  const [personnelList, setPersonnelList] = useState([]);

  // Функція для завантаження даних
  const loadPersonnelData = async (shouldRefresh = false) => {
    try {
      const response = await axios.get('http://localhost:5000/api/personnel');
      setPersonnelList(response.data);

      if (shouldRefresh) {
        window.location.reload();
      }

    } catch (error) {
      console.error('Помилка завантаження даних:', error);
    }
  };

  // Завантаження даних при першому рендері
  useEffect(() => {
    if (localStorage.getItem('token')) {
      loadPersonnelData();
    }
  }, []);

  const handleAddNew = () => {
    setEditingPersonnel(null);
    setShowEditModal(true);
  };

  const handleEdit = (personnel) => {
    setEditingPersonnel(personnel);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/personnel/${id}`);
      await loadPersonnelData(); // Перезавантаження даних після видалення
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  const handleSave = async (updatedPersonnel) => {
    try {
      // Видаляємо прямі HTTP-запити звідси, оскільки вони вже є в EditPersonnel
      await loadPersonnelData(true); // Просто оновлюємо дані після збереження
      setShowEditModal(false);
      handleCloseModal()
    } catch (error) {
      console.error('Помилка збереження:', error);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleExitClick = () => {
    localStorage.removeItem('token');
    setPersonnelList([]); // Очищення списку при виході
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token');
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    activeClassName="active-link"
                    exact
                  >
                    Головна
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/personnel"
                    activeClassName="active-link"
                  >
                    Облік кадрів
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={handleExitClick}
                    activeClassName="active-link"
                  >
                    {isAuthenticated() ? 'Вихід' : ''}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/personnel"
              element={
                <ProtectedRoute>
                  <>
                    <button className="btn btn-primary mb-3" onClick={handleAddNew}>
                      Додати запис
                    </button>
                    <PersonnelTable
                      personnelList={personnelList}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {showEditModal && (
          <EditPersonnel
            personnel={editingPersonnel}
            onSave={handleSave}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
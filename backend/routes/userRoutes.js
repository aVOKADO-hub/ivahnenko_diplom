const express = require('express');
const User = require('../models/User'); // Модель користувача
const router = express.Router();

// Логін
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {

        // Знайти користувача
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Неправильний логін або пароль' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Неправильний логін або пароль' });
        }


        const token = user.username
        res.json({ token, username: user.username });
    } catch (error) {
        console.error('Помилка логіну:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

module.exports = router;

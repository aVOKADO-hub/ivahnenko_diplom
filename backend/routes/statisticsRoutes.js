const express = require('express');
const router = express.Router();
const Personnel = require('../models/Personnel'); // Модель для бази даних

router.get('/', async (req, res) => {
    try {
        // Всі ранги для кожної категорії
        const soldierRanks = [
            'солдат', 'старший солдат'
        ];
        const sergeantRanks = [
            'молодший сержант', 'сержант', 'старший сержант',
            'головний сержант', 'штаб-сержант', 'майстер-сержант',
            'старший майстер-сержант', 'головний майстер-сержант'
        ];
        const officerRanks = [
            'молодший лейтенант', 'лейтенант', 'старший лейтенант',
            'капітан', 'майор', 'підполковник', 'полковник',
            'бригадний генерал', 'генерал-майор', 'генерал-лейтенант', 'генерал'
        ];

        // Підрахунок за кожною категорією
        const total = await Personnel.countDocuments();
        const soldiers = await Personnel.countDocuments({ rank: { $in: soldierRanks } });
        const sergeants = await Personnel.countDocuments({ rank: { $in: sergeantRanks } });
        const officers = await Personnel.countDocuments({ rank: { $in: officerRanks } });

        res.json({ total, soldiers, sergeants, officers });
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання статистики' });
    }
});


module.exports = router;

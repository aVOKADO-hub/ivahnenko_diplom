const express = require('express');
const router = express.Router();
const Personnel = require('../models/Personnel');

// Отримати всі записи
router.get('/', async (req, res) => {
    const personnel = await Personnel.find();
    res.json(personnel);
});

// Додати запис
router.post('/', async (req, res) => {
    const { name, rank, unit, contact } = req.body;
    const newPersonnel = new Personnel({ name, rank, unit, contact });
    await newPersonnel.save();
    res.status(201).json(newPersonnel);
});

// Редагувати запис
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedPersonnel = await Personnel.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedPersonnel) {
            return res.status(404).json({ message: 'Військовослужбовця не знайдено' });
        }

        res.json(updatedPersonnel);
    } catch (error) {
        console.error('Помилка оновлення військовослужбовця:', error);
        res.status(500).json({ message: 'Не вдалося оновити дані' });
    }
});
// Видалити запис
router.delete('/:id', async (req, res) => {
    await Personnel.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;

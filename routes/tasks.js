const express = require('express');
const router = express.Router();
const connection = require('../models/task');

// 全てのタスクを取得
router.get('/', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.json(results);
    });
});

// 新しいタスクを作成
router.post('/', (req, res) => {
    const { title, level } = req.body;
    const query = 'INSERT INTO tasks (title, level) VALUES (?, ?)';
    connection.query(query, [title, level], (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        }
        res.status(201).json({ id: results.insertId, title, level, completed: false });
    });
});

// 特定のタスクを取得
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Cannot find task' });
            return;
        }
        res.json(results[0]);
    });
});

// タスクを更新
router.patch('/:id', (req, res) => {
    const { title, level, completed } = req.body;
    const query = 'UPDATE tasks SET title = ?, level = ?, completed = ? WHERE id = ?';
    connection.query(query, [title, level, completed, req.params.id], (err, results) => {
        if (err) {
            res.status(400).json({ message: err.message });
            return;
        }
        res.json({ message: 'Task updated' });
    });
});

// タスクを削除
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.json({ message: 'Task deleted' });
    });
});

module.exports = router;
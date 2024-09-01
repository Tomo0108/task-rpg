const connection = require('../db');

// タスクテーブルを作成するクエリ
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        level INT NOT NULL,
        completed BOOLEAN DEFAULT false
    )
`;

// タスクテーブルを作成
connection.query(createTableQuery, (err, results) => {
    if (err) {
        console.error('Error creating tasks table:', err);
        return;
    }
    console.log('Tasks table created or already exists');
});

module.exports = connection;
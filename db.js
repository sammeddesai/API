const mysql = require('mysql');

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Replace with your MySQL username
    password: 'password',   // Replace with your MySQL password
    database: 'school_db'   // Replace with your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    db.end(err => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed gracefully.');
        }
        process.exit();
    });
});

// Export db connection for use in other files
module.exports = db;

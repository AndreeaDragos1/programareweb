
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path'); 

const app = express();
const secretKey = 'secret'; 

app.use(bodyParser.json());

const users = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username }, secretKey);
    res.json({ success: true, token });
});


app.get('/message', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Authentication successfully completed!' });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
}

app.get('/Lab11.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Lab11.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

const PORT = 3015;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    credentials: true
}));

const users = [
    {
        id: 1,
        username: 'testuser',
        passwordHash: '$2b$10$2Vf7uvHcV6i2Np6CSq0PPuaYNGxSeNJ.RfBNGzLht7GBwcc0A5WdK' // hashed 'testpassword'
    }
];

const secretKey = 'yourSecretKey'; // Replace with a strong secret key

app.post('/api/registers', async (req, res) => {
    console.log('Received login request');

    const { Username, Password } = req.body;

    const user = users.find(u => u.username === Username);

    if (!user) {
        console.log('User not found');
        return res.status(401).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(Password, user.passwordHash);
    if (!match) {
        console.log('Incorrect password');
        return res.status(401).json({ error: 'Incorrect password' });
    }

    console.log('Authentication successful');

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey);

    try {
        console.log('Storing login request data');
        const requestData = {
            Username,
            Timestamp: new Date().toISOString(),
        };

        await axios.get('http://localhost:3001/api/login-requests', { params: requestData });

        console.log('Login request data stored');

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.get('/api/login-requests', (req, res) => {
    const requestData = req.query;
    console.log('Received login request data:', requestData);
    res.status(200).json({ message: 'Login request data stored successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
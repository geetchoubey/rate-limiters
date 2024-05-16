const express = require('express');
const { basic, middleware } = require('./rate-limiters');

const app = express();

app.use(middleware(basic()));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'YOLO!' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port', process.env.PORT || 3000);
});
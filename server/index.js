const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8000
const BASE_PATH = process.env.BASE_PATH || "/"

const app = express();


app.use(BASE_PATH, express.static(path.join("../", 'build')));

console.log(`${BASE_PATH}*`)
app.get(`${BASE_PATH}`, function (req, res) {
    res.sendFile(path.join(`${__dirname}/../`, 'build', 'index.html'));
});


app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

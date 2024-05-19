require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./controllers/index.js')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))
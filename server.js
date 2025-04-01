import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import contests from './data/index.js';
import createHomePage from './views/index.js';
import createListTemplate from './views/list.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/public/:id', (req, res) => {
    const fileName = req.params.id;
    const file = path.join(__dirname, "public", fileName)
    res.sendFile(file);
});

app.get('/contests/:id', (req, res) => {
    const contestName = req.params.id;
    const contestData = contests[contestName];
    if (!contestData) {
        return res.status(404).send('Contest not found');
    }
    res.send(createListTemplate(contestData));
})

app.get('/', async (req, res) => {
    const homePage = await createHomePage();
    res.send(homePage);
});

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
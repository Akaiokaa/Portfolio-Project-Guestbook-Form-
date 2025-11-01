import express from 'express';

const app = express();


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const PORT = 3004;

const submissions = [];

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/admin', (req, res) =>{
    res.send(submissions);
});

app.post('/submit-form', (req, res) => {
    const submission = req.body;
    submissions.push(submission);
    console.log(submissions);
    
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});
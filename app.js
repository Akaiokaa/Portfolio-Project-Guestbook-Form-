import express from 'express';

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const PORT = 3004;

const submissions = [];

app.get('/', (req, res) => {
    // res.sendFile(`${import.meta.dirname}/views/home.html`);
    res.render('home');
});

app.get('/admin', (req, res) =>{
    res.send(submissions);
});

app.post('/submit-form', (req, res) => {
    let date = new Date();
    const submission = req.body;
    submission.submissionTime = date.toLocaleString();
    submissions.push(submission);
    console.log(submissions);
    
    res.render('confirmation')
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});
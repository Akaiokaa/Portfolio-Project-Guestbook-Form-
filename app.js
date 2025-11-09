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
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/admin', (req, res) =>{
    res.render('admin', {submissions});
});

app.post('/submit-form', (req, res) => {
    let date = new Date();
    const submission = req.body;
    submission.submissionTime = date.toLocaleString();

    if (!submission.jobT || submission.jobT.trim() === "") {
        submission.jobT = "NA";
    }
    if (!submission.company || submission.company.trim() === "") {
        submission.company = "NA";
    }
    if (!submission.linkedin || submission.linkedin.trim() === "") {
    submission.linkedin = "NA";
    }
    if (!submission.email || submission.email.trim() === "") {
        submission.email = "NA";
    }
    if (!submission.message || submission.message.trim() === "") {
        submission.message = "NA";
    }
    if (!submission.choiceFormat || submission.choiceFormat.trim() === "") {
        submission.choiceFormat = "NA";
    }
    submissions.push(submission);
    console.log(submissions);
    
    res.render('confirmation', {submissions})
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});
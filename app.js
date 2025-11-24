import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const PORT = 3004;

const submissions = [];

const pool = mysql2.createPool({
    host: process.env.DB_HOST,       
    user: process.env.DB_USER,                 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,          	
    port: process.env.DB_PORT                  
}).promise();

app.get('/db-test', async (req, res) => {
    try {
        const [submissions] = await pool.query('SELECT * FROM contacts');
        res.send(submissions);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);

    }
});

app.get('/', (req, res) => {
    // res.sendFile(`${import.meta.dirname}/views/home.html`);
    res.render('home');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/admin', async (req, res) =>{
    try {
        const [submissions] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
        submissions.forEach(order => {

        order.formattedTimestamp = new 

		Date(order.timestamp).toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        });

        res.render('admin', { submissions: submissions });

    } catch(err) {

        console.error('Database error:', err);

        res.status(500).send('Database error: ' + err.message);
    }
});

app.post('/submit-form', async(req, res) => {
     try {
        const submission = req.body;

        submission.timestamp = new Date();

        console.log('New submission received:', submission);
        const addedToList = submission.added === 'on' ? 1 : 0;

        const emailFormat = ['html', 'text', 'NA'].includes(submission.choiceFormat)
            ? submission.choiceFormat
            : 'NA';
        const sql = `INSERT INTO contacts 
                     (fname, lname, job_title, company, linkedin, email, met, met_other, message, added_to_list, email_format) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            submission.fname,
            submission.lname,
            submission.jobT || null,
            submission.company || null,
            submission.linkedin || null,
            submission.email || null,
            submission.met,
            submission.other || null,
            submission.message || null,
            addedToList,
            emailFormat
        ];

        
        const [result] = await pool.execute(sql, params);

        console.log('Order inserted with ID:', result.insertId);

        res.render('confirm', { submissions: [submission] });


    } catch(err) {
        console.error('Error inserting order:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).send('An order with this email already exists.');
        } else {
            res.status(500).send('Sorry, there was an error processing your order. Please try again.');
        }
    }

    // let date = new Date();
    // const submission = req.body;
    // submission.submissionTime = date.toLocaleString();

    // if (!submission.jobT || submission.jobT.trim() === "") {
    //     submission.jobT = "NA";
    // }
    // if (!submission.company || submission.company.trim() === "") {
    //     submission.company = "NA";
    // }
    // if (!submission.linkedin || submission.linkedin.trim() === "") {
    // submission.linkedin = "NA";
    // }
    // if (!submission.email || submission.email.trim() === "") {
    //     submission.email = "NA";
    // }
    // if (!submission.message || submission.message.trim() === "") {
    //     submission.message = "NA";
    // }
    // if (!submission.choiceFormat || submission.choiceFormat.trim() === "") {
    //     submission.choiceFormat = "NA";
    // }
    // submissions.push(submission);
    // console.log(submissions);
    
    // res.render('confirmation', {submissions})
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});
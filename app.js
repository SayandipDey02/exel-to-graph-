const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { render } = require('ejs');
const { hash } = require('crypto');
const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/graphapp').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Add this line for parsing form data
app.use(express.json()); // Add this line for parsing JSON data
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', __dirname + '/views'); // Set the views directory

app.get('/',(req, res)=> {

    res.send("this route is working") 
    
})



app.get('/signin',(req, res)=> {
    res.render('signin.ejs')

})
app.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            
            return res.status(400).send('User already exists. Please log in instead.');
            
        }

        // Create token
        let token = jwt.sign({email: email}, "code");
        res.cookie("token", token);
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const user = new User({
            email: email,
            password: hashedPassword
        });
        
        // Save to MongoDB
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).send('Error during signin');
    }
});

app.get('/login',(req, res)=> {
    res.render('login.ejs')
})
app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Find user in database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Compare password with stored hash
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            let token = jwt.sign({email: email}, "code");
            res.cookie("token", token);
            res.render('read.ejs');
        } else {
            res.status(400).send('Invalid password');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error during login');
    }
});

app.get('/read',(req, res)=> {
    res.render('read.ejs')
})

app.listen(5000, ()=>{
    console.log('server started at port 5000');
})
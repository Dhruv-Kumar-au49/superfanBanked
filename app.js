const express = require('express');
const app = express();
const { urlencoded } = require('express');
app.use(urlencoded())
app.use(express.json())
let cookieParser = require('cookie-parser');
app.use(cookieParser())
const dotenv = require('dotenv');
dotenv.config();
const cors=require('cors')
app.use(cors())

const { initDB } = require('./mongoDB');
initDB();

const { signUp,login,logout } = require('./controllers/authControllers');


app.post('/signup', signUp);
app.post('/login', login);
app.post('/logout', logout);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

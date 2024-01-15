require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

const port = 7000 || process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
        res.json({"message":"pong.."})
})
app.use(require('./routes/payment'))

app.listen(port, () => {
        console.log(`Connected to port : ${port} 🌟`)
})

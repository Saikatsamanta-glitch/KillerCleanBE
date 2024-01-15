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
// shut down server
const shutdown = () => {
  server.close((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
};
process.on('SIGINT', () => {

  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});
process.on('SIGTERM', () => {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

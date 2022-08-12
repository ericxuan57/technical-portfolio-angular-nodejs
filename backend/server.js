require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const db = require('./app/models');
const routes = require('./app/routes');
const cors = require('cors');

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    res.header('Cross-Origin-Opener-Policy', 'same-origin');    
    next();
}

app.use(allowCrossDomain);

// Setup routes.
app.use("/api", routes);

const httpServer = http.createServer(app);

let PORT;
process.env.STATUS === 'production'
  ? (PORT = process.env.PROD_PORT)
  : (PORT = process.env.DEV_PORT);

httpServer.listen(PORT, () => {
  console.log(`Server in ${process.env.STATUS} mode, listening on *:${PORT}`);
});

db.sequelize.sync();

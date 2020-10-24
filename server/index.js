const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const cors = require('cors');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const path = require('path');

const app = express();

require('./database');
app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOption));

require('./routes')(app);

app.use('**', function (req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

const PORT = 3006 || process.env.PORT;

app.listen(PORT, () => {
  // console.info(`[ApiServer] Listening on Port ${PORT}`);
});

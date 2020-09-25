var express = require('express');
var cors = require('cors');
var connectDb = require('./config/db');

var defaultRouter = require('./routes/defaultRoute');

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server running on port' + PORT);
});

connectDb();

app.use(cors());

app.use('/', defaultRouter);

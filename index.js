var express = require('express');
var cors = require('cors');
var connectDb = require('./config/db');

const defaultRouter = require('./routes/defaultRoute');
const userRouter = require('./routes/userRoutes');
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server running on port' + PORT);
});

connectDb();
app.use(express.json());
app.use(cors());

app.use('/', defaultRouter);
app.use('/api/user', userRouter);

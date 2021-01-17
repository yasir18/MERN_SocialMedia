var express = require('express');
var cors = require('cors');
var connectDb = require('./config/db');
var path = require('path');

const defaultRouter = require('./routes/defaultRoute');
const userRouter = require('./routes/userRoutes');
const profileRouter = require('./routes/profileRoutes');
const postRouter = require('./routes/postRoutes');
const app = express();

connectDb();

app.use(express.json());
app.use(cors());
app.use(express.static('uploads/'));

// app.use('/', defaultRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts/', postRouter);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		console.log('hello');
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server running on port ' + PORT);
});

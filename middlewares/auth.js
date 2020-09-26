var jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = async (req, res, next) => {
	let token = req.header('auth-token');
	try {
		if (!token) {
			return res.status(401).json({ msg: 'Token is not provided' });
		}
		jwt.verify(token, config.secret_key, function (err, decoded) {
			if (err) {
				return res.status(401).json({ msg: 'token is not valid' });
			}
			req.user = decoded.user;
			next();
		});
	} catch (error) {
		res.status(500).json({ errors: [error] });
	}
};

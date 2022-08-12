const bcrypt = require('bcrypt');

module.exports = {
	hashPassword: (password) => {
		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(password, salt);

		return hash;
	},
	comparePasswords: (password, hash) => bcrypt.compareSync(password, hash)
};
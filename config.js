exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/chore-score';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
	                        'mongodb://localhost/test-chore-score';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
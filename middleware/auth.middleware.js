// * IMPORTS * //
const jwt = require('jsonwebtoken');

// * AUTH MIDDLEWARE * //
const authenticationMiddleware = async (req, res, next) => {
	
    // GET THE AUTHERIZATION TOKEN FROM THE HEADER
	const authHeader = req.headers.authorization;

	 // CHECK TO SEE IF THERE IS A TOKEN
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({
            success: false,
            data: {
                data: null,
                message: "BAD REQUEST"
            }
             });
	}

	  // SEPERATE THE TOKEN
	const token = authHeader.split(' ')[1];

	try {
		// VERIFY TOKEN
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// ATTACH THE USERNAME TO THE REQ
		req.username = decoded.username;
		next();

	} catch (error) {
		return res.status(401).json({
            success: false,
            data: {
                data: null,
                message: "UNAUTHORIZED"
            }
             });
	}
};

// * EXPORTS * //
module.exports = authenticationMiddleware;
 res.cookie('token', token, { httpOnly: true });

    req.session.token = token; 

    "proxy": "http://localhost:3000",
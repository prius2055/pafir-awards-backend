 res.cookie('token', token, { httpOnly: true });

    req.session.token = token; 

    "proxy": "http://localhost:3000",

    app.use(
  cors({
    origin: 'https://pafir-awards.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
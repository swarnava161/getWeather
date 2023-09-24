const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const weatherRoute = require('./routes/weather');
const userRoute = require('./routes/signup');
const userRouteLogin = require('./routes/login');
const imageUploader= require("./routes/imageUpload");
const app = express();
connectDB();


// Middleware
app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with your frontend domain
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
    })
  );
  app.use(express.json({ limit: '10mb' })); // Increase the limit to the desired size
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes



app.use('/weather', weatherRoute);
app.use('/',userRoute);
app.use('/',userRouteLogin);
app.use('/',imageUploader);
// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

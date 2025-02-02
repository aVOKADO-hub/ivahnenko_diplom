const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const personnelRoutes = require('./routes/personnelRoutes');
const statisticsRouter = require('./routes/statisticsRoutes');
const userRouter = require('./routes/userRoutes')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/personnel', personnelRoutes);
app.use('/api/statistics', statisticsRouter);
app.use('/api/user', userRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const cors = require('cors')

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  prisma.$connect()
    .then(() => {
      console.log('Database connected successfully!');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });
  
  console.log(`Server is running on http://localhost:${PORT}`);
});

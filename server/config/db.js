import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dbConnect = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default dbConnect;
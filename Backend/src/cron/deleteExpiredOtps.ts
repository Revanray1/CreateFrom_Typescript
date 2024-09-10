import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

// Function to delete expired OTPs
const deleteExpiredOtps = async () => {
  try {
    await prisma.otp.deleteMany({
      where: {
        expiresAt: {
          lt: new Date() 
        }
      }
    });
  } catch (error) {
    console.error('Error deleting expired OTPs:', error);
  }
};

// Schedule the cron job to run every minute
cron.schedule('* * * * *', deleteExpiredOtps);

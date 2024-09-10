
import { Request, Response } from 'express';
import prisma from '../prismaClient';
import transporter from '../utils/nodemailerConfig';
import { generateOtp } from '../utils/generateOtp'; 
import { CreateUserRequestBody } from '../typeInterfaces/userInterface'




export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, phoneNumber, email, gender, education, workExperience } = req.body as CreateUserRequestBody;;
  
    if (!firstName || !lastName || !phoneNumber || !email || !gender || !education || !workExperience) {
      res.status(400).send('All required fields must be provided');
      return;
    }
  
    try {
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          phoneNumber,
          email,
          gender,
          education: {
            create: education.map((edu) => ({
              collegeName: edu.collegeName,
              joinedOnYear: edu.joinedOnYear, 
              completedYear: edu.completedYear
            }))
          },
          workExperience: {
            create: workExperience.map((work) => ({
              companyName: work.companyName,
              workJoinedYear: work.workJoinedYear, 
              workRelievedYear: work.workRelievedYear
            }))
          }
        },
        include: {
          education: true,
          workExperience: true
        }
      });
  
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user');
    }
  };



export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;


  if (!email) {
    res.status(400).send('Email is required');
    return;
  }

  const isEmaiValid =  await prisma.user.findUnique({
    where: { email }
  });
  if (!isEmaiValid) {
    res.status(404).json({ message: 'Please Enter Valid Email or Register' });

    // res.status(400).send('Please Enter Valid Email or Register ');
    return; 
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); 

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: 'Your OTP Code', 
    text: `Your OTP code is ${otp}` 
  };

  try {
    await transporter.sendMail(mailOptions);

    // Save OTP to the database
    await prisma.otp.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt }
    });
    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send('Error sending OTP');
  }
};



export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).send('Email and OTP are required');
    return;
  }

  try {
    const otpRecord = await prisma.otp.findUnique({
      where: { email }
    });

    if (!otpRecord) {
      res.status(404).send('Otp Expired');
      return;
    }

    if (otpRecord.otp !== otp) {
      res.status(400).send('Invalid OTP');
      return;
    }
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
        include: {
          education: {
              select: {
                collegeName: true,
                joinedOnYear: true,
                completedYear: true
              }
            },
            workExperience: {
              select: {
                companyName: true,
                workJoinedYear: true,
                workRelievedYear: true
              }
            }
        }
      });
  
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
  
      res.status(200).json({
        message: 'OTP verified successfully',
        userData: user
      });
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).send('Error retrieving user');
    }


  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).send('Error verifying OTP');
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    res.status(400).send('Invalid user ID');
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        education: {
            select: {
              collegeName: true,
              joinedOnYear: true,
              completedYear: true
            }
          },
          workExperience: {
            select: {
              companyName: true,
              workJoinedYear: true,
              workRelievedYear: true
            }
          }
      }
    });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send('Error retrieving user');
  }
};
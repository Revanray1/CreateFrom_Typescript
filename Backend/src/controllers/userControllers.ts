
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
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExist) {
      res.status(400).send({ status: 400, message: "User already exist. Please Sign-in" });
      return;
    }
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

    res.status(201).send({ status: 200, message: "User created successfully" });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ status: 500, message: 'Error creating user' });
  }
};



export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;


  if (!email) {
    res.status(400).send({ status: 400, message: 'Email is required' });
    return;
  }

  const isEmaiValid = await prisma.user.findUnique({
    where: { email }
  });
  if (!isEmaiValid) {
    res.status(404).send({ status: 404, message: 'Mail-ID Does not Exist , Please Enter Valid Email or Register' });
    return;
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

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
    res.status(200).send({ status: 200, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).send({ status: 500, message: 'Error sending OTP' });
  }
};



export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).send({ status: 400, message: 'Email and OTP are required' });
    return;
  }

  try {
    const otpRecord = await prisma.otp.findUnique({
      where: { email }
    });

    if (!otpRecord) {
      res.status(400).send({ status: 400, message: 'Otp Expired.Resend OTP' });
      return;
    }

    if (otpRecord.otp !== otp) {
      res.status(400).send({ status: 400, message: 'Invalid OTP' });
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
        res.status(400).send({ status: 400, message: 'User not found' });
        return;
      }

      res.status(200).json({
        status: 200,
        message: 'OTP verified successfully',
        userData: user
      });
    } catch (error) {
      res.status(500).send({ status: 500, message: 'Error retrieving user' });
    }

  } catch (error) {
    res.status(500).send({ status: 500, message: 'Error verifying OTP' });
  }
};



// export const getUserById = async (req: Request, res: Response): Promise<void> => {
//   const userId = parseInt(req.params.id, 10);

//   if (isNaN(userId)) {
//     res.status(400).send('Invalid user ID');
//     return;
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       include: {
//         education: {
//             select: {
//               collegeName: true,
//               joinedOnYear: true,
//               completedYear: true
//             }
//           },
//           workExperience: {
//             select: {
//               companyName: true,
//               workJoinedYear: true,
//               workRelievedYear: true
//             }
//           }
//       }
//     });

//     if (!user) {
//       res.status(404).send('User not found');
//       return;
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error retrieving user:', error);
//     res.status(500).send('Error retrieving user');
//   }
// };
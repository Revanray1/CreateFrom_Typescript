import rateLimit from 'express-rate-limit';

const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, 
  handler: (req, res, next) => {
    res.status(404).json({
      status: 404,
      timerExceed:true,
      message: 'Too many requests from this IP, please try again after 15 minutes',
    });
  },
  headers: true,    
});

export default otpRateLimiter;

import rateLimit from 'express-rate-limit';

const ONE_MINUTE = 1 * 60 * 1000;
const message =
  'Muita requisições feitas desse IP, tente novamente mais tarde.';

export const rateLimiter = rateLimit({
  windowMs: ONE_MINUTE,
  max: 5,
  message: { message },
});

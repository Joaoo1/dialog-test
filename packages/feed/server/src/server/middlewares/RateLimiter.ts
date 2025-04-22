import rateLimit from 'express-rate-limit';

const ONE_MINUTE = 1 * 60 * 1000;
const message =
  'Muita requisições feitas desse IP, tente novamente mais tarde.';

export const generalRateLimiter = rateLimit({
  windowMs: ONE_MINUTE,
  max: 100,
  message: { message },
});

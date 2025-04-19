const rateLimit = require("express-rate-limit");

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "You have exceeded the 50 requests in 0.5 hrs limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiterUsingThirdParty;

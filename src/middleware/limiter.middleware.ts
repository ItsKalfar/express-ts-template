import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes in milliseconds
  max: parseInt(process.env.RATE_LIMIT_MAX || "100"),
  message: (req: Request, res: Response) => {
    const resetTimeString = res.get("X-RateLimit-Reset");
    const resetTime = resetTimeString ? parseInt(resetTimeString) : 0;
    const retryAfterSeconds: number = Math.ceil(
      (resetTime * 1000 - Date.now()) / 1000
    );
    const retryAfterMinutes: number = Math.ceil(retryAfterSeconds / 60);
    return {
      error: `Too many requests, please try again later. You can retry in ${retryAfterMinutes} minute(s).`,
    };
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default limiter;

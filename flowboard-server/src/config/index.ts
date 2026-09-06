import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  corsOrigins: process.env.CORS_ORIGINS?.split(",") || [],
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  backend_base_url: process.env.BACKEND_BASE_URL,
  default_admin_email: process.env.DEFAULT_ADMIN_EMAIL,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    gen_salt: process.env.GEN_SALT,
    expires_in: process.env.EXPIRES_IN,
    forget_expires_in: process.env.FORGET_EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
  CLOUDINARY: {
    cloudName: process.env.CLOUDNAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  },
};

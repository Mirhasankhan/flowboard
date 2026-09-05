export const emailBody = (fullName: string, otp: string) => {
  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Header -->
     <div style="background-color: #27c074ff; padding: 20px; text-align: center;">
        <img src="https://nyc3.digitaloceanspaces.com/smtech-space/uploads/messages/files/1762406748731-7yj8hrmorob.png" alt="Company Logo" style="height: 80px; margin-bottom: 10px;" />
        <h2 style="color: #fff; margin: 0;">Sign Up Verification</h2>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: center;">
        <p style="font-size: 16px; color: #00c2d1; margin-bottom: 20px;">
          Hi <b>${fullName}</b>,
        </p>
        <p style="font-size: 16px; color: #555;">
          Your verification code is:
        </p>

        <h1 style="color: #00c2d1; font-size: 36px; margin: 15px 0;">${otp}</h1>

        <p style="font-size: 14px; color: #777;">
          This OTP is valid for <b>5 minutes</b>. If you did not request this, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #aaa;">
        &copy; ${new Date().getFullYear()} Home Health. All rights reserved.
      </div>
    </div>
  </div>
  `;
  return html;
};

export const passwordResetEmailBody = (fullName: string, otp: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); overflow: hidden;">

        <!-- Header -->
        <div style="background-color: #27c074ff; padding: 20px; text-align: center;">
          <img
            src="https://nyc3.digitaloceanspaces.com/smtech-space/uploads/messages/files/1762406748731-7yj8hrmorob.png"
            alt="Company Logo"
            style="height: 80px; margin-bottom: 10px;"
          />
          <h2 style="color: #fff; margin: 0;">
            Password Reset
          </h2>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px; color: #00c2d1; margin-bottom: 20px;">
            Hi <b>${fullName}</b>,
          </p>

          <p style="font-size: 16px; color: #555;">
            We received a request to reset your password. Use the verification code below to continue:
          </p>

          <div style="margin: 25px 0;">
            <h1 style="color: #00c2d1; font-size: 36px; letter-spacing: 6px; margin: 0;">
              ${otp}
            </h1>
          </div>

          <p style="font-size: 14px; color: #777;">
            This OTP is valid for <b>5 minutes</b>.
          </p>

          <p style="font-size: 14px; color: #777;">
            If you did not request a password reset, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #aaa;">
          &copy; ${new Date().getFullYear()} Home Health. All rights reserved.
        </div>

      </div>
    </div>
  `;

  return html;
};
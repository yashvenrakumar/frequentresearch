export const sendOtpTempletes = (otp: string): string => {
    return `
  <p>Dear User,</p>
  <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
  <p>Please use it within 1 minute to verify your email and complete the password reset process.</p>
  <p>If you have any questions, feel free to contact our support team.</p>
  <br />
  <p>Best regards,<br />Batch$ Team<br /><a href="https://example.com">https://example.com</a></p>
  `;
  };
  
  export const otpVerifiedTemplate = (): string => {
    return `
      <p>Dear User,</p>
      <p>Your OTP has been successfully verified. You can now proceed with resetting your password or accessing the secured section of the application.</p>
      <p>If you did not request this verification, please contact our support immediately.</p>
      <br />
      <p>Best regards,<br />Batch$ Team<br /><a href="https://example.com">https://example.com</a></p>
    `;
  };

  export const resendOtpTemplate = (otp: string): string => {
    return `
      <p>Dear User,</p>
      <p>Your new One-Time Password (OTP) is: <strong>${otp}</strong></p>
      <p>The previous OTP has been invalidated. Please use this code within 1 minute to complete your request.</p>
      <p>Need help? Reach out to our support team anytime.</p>
      <br />
      <p>Best regards,<br />Batch$ Team<br /><a href="https://example.com">https://example.com</a></p>
    `;
  };
  
  

  export const otpExpiredTemplate = (): string => {
    return `
      <p>Dear User,</p>
      <p>Your OTP has expired. For security reasons, OTPs are only valid for 1 minute.</p>
      <p>Please request a new OTP to continue your process.</p>
      <br />
      <p>Best regards,<br />Batch$ Team<br /><a href="https://example.com">https://example.com</a></p>
    `;
  };
  
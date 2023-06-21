const crypto = require('crypto');
const hashService = require('./hash-service');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    console.log('otp:', otp);
    console.log('phone:', phone);
    const data = await twilio.messages.create({
      to: `+91${phone}`,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your codershouse OTP is ${otp}`,
    });
    console.log('data:', data);

    return data;
  }

  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

module.exports = new OtpService();

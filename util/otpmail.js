const sendGrid = require('@sendgrid/mail')

const API_KEY = `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`;
sendGrid.setApiKey(API_KEY);

const sendOTP = (goTo, otp) => {
    const message = {
        to: goTo,
        from: 'practice.tareque@outlook.com',
        subject: "Password OTP",
        text: `We received a request to reset your abroad-inquery password.
        Enter the following password reset code: ${otp}. If you didn't appy
        to reset your password, ignore this message`,
    }
    return sendGrid.send(message);
}
module.exports = sendOTP;

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH);

exports.sendVerificationEmail = async (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  console.log("done stmp");

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "PDAFacebook - Verify your email",
    html: `<div> <div style=" max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-family: Roboto; font-weight: 600; font-size: 20px; color: #3b5998; " > <img src="https://res.cloudinary.com/dtq7wjpn4/image/upload/v1673163879/PDAFacebook/fb_xysm9h.png" alt="" style="width: 5%" /> <span>Action required: Verify your email</span> </div> <div style=" padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; color: #141823; font-size: 17px; font-family: Roboto; " > <h1>Hi ${name},</h1> <div> <p style="padding: 10px 0"> Thank you for registering with PDAFacebook. Please click on the link below to verify your email address. </p> </div> <a href=${url} style=" width: 200px; padding: 10px 15px; background: #4c649b; color: #fff; text-decoration: none; font-weight: 600; " >Verify Email</a > <br /> <div style="padding-top: 20px"> <span style="margin: 1.5rem 0; color: #898f9c; font-size: small" >PDAFacebook is just another Facebook, once registered, you can experience facebook for free</span > </div> </div> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
  console.log("done send mail");
};

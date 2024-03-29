import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import  bcryptjs  from "bcryptjs";

export const sendEmail = async({email, emailType, userId}:any)  => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString())

        // TODO: Configure mail for usage.
        if(emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId, 
            {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
              { forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }


        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });


          const mailOptions = {
            from: 'gauravgav7@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email": "RESET YOUR PASSWORD", // Subject line
            html: `<p>Click  <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
            // Do Forgot Password in it!
          }

          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}


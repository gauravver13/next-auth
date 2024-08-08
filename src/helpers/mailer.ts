import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs";
import User from '@/models/userModel';

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now()+360000}
        )
        } else if(emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {forgotPassword: hashedToken, forgotPasswordExpiry: Date.now() + 3600000}
        )
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

        const mailOption = {
            // sender address
            from: 'gaurav@email.ai', 
            // list of receivers
            to: email, 
            // Subject line
            subject: emailType === 'VERIFY' ? "Verify your email": "Reset your Password", 
            // plain text body
            // text: "Hello world?", /-mail text-\ 
            // html body
            html: "<b>Hello world?</b>", 
        }

        const mailResponse = await transporter.sendMail(mailOption);

        return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}
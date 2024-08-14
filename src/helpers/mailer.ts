import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs";
import User from '@/models/userModel';

export const sendEmail = async ({email, emailType, userId}:any) => {
    try { 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        
        console.log('dataHashed');
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now()+360000}
        )
        } else if(emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {forgotPassword: hashedToken, forgotPasswordExpiry: Date.now() + 3600000}
        )
        }
    
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.USER,  
              pass: process.env.PASSWORD,
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
            html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "Verify your email": "Reset your password"}
            or copy and paste the link below in your browser.
            </br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, 
        }

        const mailResponse = await transporter.sendMail(mailOption);

        console.log('email sent');
        

        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}
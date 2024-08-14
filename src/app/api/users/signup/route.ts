import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
// import { STATUS_CODES } from "http";

connect()


export async function POST(request: NextRequest) {
    try {
        // userData 
        const reqBody = await request.json()
        
        // Userdata - email, username, password!
        const {email, username, password} = reqBody;
        
        
        console.log(reqBody);
        
        // Validation- if user exist or not 
        const user = await User.findOne({email})

        console.log("User:",user);

        if(user) {
            return NextResponse.json(
                {error: 'User already exists'},
                {status: 400}
            )
        }

        // Password..!
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        console.log('savedUser: ', savedUser);
        

        // send Verification email 
        await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})
        
        return NextResponse.json(
            {
                message: "User verified Successfully",
                success: true,
                status: 200,
                savedUser
            }
        )
        
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500 }
        )

    }
}
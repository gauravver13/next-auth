import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
// import { STATUS_CODES } from "http";

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, username, password} = reqBody;
        //Validation
        console.log(reqBody);

        const user = await User.findOne({email})

        console.log(user);

        if(user) {
            return NextResponse.json(
                {error: 'User already exists'},
                {status: 400}
            )
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

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
import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt  from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }
        console.log("User exist")

        const validPassword = await bcryptjs.compare(password, user.password)
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d'})

        Response.cookies.set("token", token, {
            httpOnly
        })

    } catch (error) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
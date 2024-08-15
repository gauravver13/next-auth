import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {

        //take user from body 
        //taken token from user.
        //find user on the basis of their token 
        //verify user
        // token=null!

        const reqBody = await request.json()
        const { token } = reqBody;

        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry: {$gt: Date.now()}
            }
        )

        if(!user){
            NextResponse.json(
            {
                error: "Invalid Token"
            },
            { 
                status: 400 
            }
        )}

        user.isVerified = true;
        user.verifyToken = null;
        user.verifyTokenExpiry = null;

        console.log(user);
        
        await user.save();

        return NextResponse.json(
            {
                message: "User Verified Successfully",
                success: true,
            },
            {
                status: 200
            }
        )


        // // taken user 
        // const reqBody = await request.json();
        // const { token } = reqBody;
        // console.log(token);

        // // find user from database 
        // const user = await User.findOne(
        //     { 
        //         verifyToken: token,
        //         verifyTokenExpiry: { $gt: Date.now()}
        //     })
        
        // if(!user) {
        //     return NextResponse.json(
        //         { error: "Invalid Token"},
        //         { status: 400 }
        //     )
        // }

        // console.log(user);

        // // Verify User 
        // user.isVerified = true;
        // user.verifyToken = undefined;
        // user.verifyTokenExpiry = undefined;

        // await user.save();

        // return NextResponse.json(
        //     {   message: "Email verified successfully",
        //         success: true
        //     },
        //     { status: 200 }
        // )

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500}
        )
    }
}
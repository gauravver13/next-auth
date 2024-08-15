import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import  jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        //take credentials from req.body = email, password.
        //find user from database
        //validatePassword
        //generate token using user sign token data.
        //response=>cookies.set(token, response);
        //return response

        const reqBody = await request.json()
        const { email, password } = reqBody;

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json(
                {
                    error: "User not exists"
                },
                {
                    status: 400
                }
            )
        }

        console.log(user);
        
        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json(
                {
                    error: "Invalid user Password, Please try again"
                },
                { status: 400 }
            )
        }
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json(
            {
                message: "User Logged in successfully",
                success: true
            },
            {
                status: 200
            }
        )

        response.cookies.set("token", token, 
            { httpOnly: true }
        )

        return response;

        // jwt.sign({
        //     data: 'foobar'
        //   }, 'secret', { expiresIn: '1h' });
                  


        // const reqBody = await request.json();
        // const { email, password } = reqBody;

        // //Validation:
        // console.log(reqBody);

        // const user = await User.findOne({email})

        // if(!user){
        //     return NextResponse.json(
        //         { 
        //             error: "User does not exist",
        //             success: false,
        //         },
        //         {
        //             status: 400
        //         }
        //     )
        // }

        // console.log("User exists:", user)
        
        // const validPassword = await bcryptjs.compare(password, user.password)

        // if(!validPassword){
        //     return NextResponse.json(
        //         { 
        //             error: "Invalid Password, check your credentials!",
        //             success: false,
        //          },
        //          {
        //             status: 400
        //          }
        //     )
        // }

        // const tokenData = {
        //     id: user._id,
        //     username: user.username,
        //     email: user.email
        // }

        // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        // const response = NextResponse.json(
        //     {
        //         message: "Successfully logged In",
        //         success: true
        //     },
        //     { status: 200 }
        // )

        // response.cookies.set("token", token,
        //      { httpOnly: true }
        //     )

        // return response;

    } catch (error: any) {
        return NextResponse.json(
            { 
                error: error.message,
                success: false
            },
            {
                status: 500
            }
        )
    }
}
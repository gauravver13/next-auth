import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request:NextRequest) {
    // Extract data from token
    console.log('get data from token hits');
    
    const userId = await getDataFromToken(request);

    console.log('user id gets');
    
    const user = await User.findOne({_id: userId}).select("-password")

    // If user is not found
    if(!user){
        NextResponse.json(
        {
            error: "Invalid Token, User not found",
            success: false,
        },
        {
            status: 500
        })
    }

    return NextResponse.json(
        {
            message: "User found",
            data: user,
        },
        {
            status: 201
        }
    )

}
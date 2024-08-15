import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    // Extract data from token
    const userId = await getDataFromToken(request);

    const user = User.findOne({_id: userId}).select("-password")

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
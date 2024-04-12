import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt  from "jsonwebtoken"

connect()

export async function POST(request:  NextRequest){
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly:true
        })
        
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
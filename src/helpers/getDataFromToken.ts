import { NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect()

export const getDataFromToken = (request: NextRequest) => {
    try {   
            const token = request.cookies.get("token")?.value || "";
             
            // console.log('token archieved!');
            // console.log(token);
            
            // console.log('towards decoded token:: ');
            const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
            // console.log('decoded Token:');
            
            return decodedToken.id;
            // return token;

    } catch (error: any) {
        console.log('Error found');
        throw new Error(error.message)
    }
}
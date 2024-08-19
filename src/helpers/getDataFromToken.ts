import { NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect()

export const getDataFromToken = (request: NextRequest) => {
    try {
            console.log('token sent');
            
            const token = request.cookies.get("token")?.value || "";
             
            console.log('token archieved!');
            console.log(token);
            
            console.log('towards decoded token:: ');
            const decodedToken:any = jwt.verify(token, process.env.TOKEN!);
            console.log('decoded Token:');
            
            return decodedToken.id;

    } catch (error: any) {
        console.log('Error found');
        throw new Error(error.message)
    }
}
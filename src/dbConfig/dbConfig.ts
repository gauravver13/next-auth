import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('Connected', () => {
            console.log('Mongo DB Connected!');  
        })

        connection.on('error', (error) => {
            console.log('MongoDB Connection Error:' + error);
            process.exit(1)
            
        })

    } catch (error) {
        console.log('Something went wrong in connecting to DB:', error);
    }
}
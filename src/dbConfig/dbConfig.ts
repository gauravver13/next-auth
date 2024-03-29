
import mongooose from "mongoose";

export async function connect(){
    try {
        mongooose.connect(process.env.MONGO_URI!)
        const connection = mongooose.connection

        connection.on('connected', () => {
            console.log('MongoDB Connected');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure db is up and running:' + err);
            process.exit()
            // exit codes 
        })

        
    } catch (error) {
        console.log('Something went wrong is connecting DB');
    }
}
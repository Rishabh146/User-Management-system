import mongoose from 'mongoose';
 
const connectDb = async () => {
    try {
        const connection = await mongoose.connect(
            'mongodb+srv://rishabhgautam:heyZZHw5q06eta5Q@cluster0.mhk4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/usermanagement'
        );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;  // Rethrow the error after logging it
    }
}
 
export default connectDb;
import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })
        console.log(`mongo db connected : ${connect.connection.host}`);
    } catch (error) {
        console.error(`error connecting db ${error.message}`);
        process.exit(1)
    }
}

export default connectDb
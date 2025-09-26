import express from "express"
import assetsRoute from "./routes/assetsRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')
).catch(err => console.error("DB Connection Error", err))

app.use('/api/assets', assetsRoute)

const PORT = 8015;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
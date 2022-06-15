const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth.js')
const blogsRoute = require('./routes/blogs.js')
const usersRoute = require('./routes/users.js');
// const session = require('express-session');
// const MongodbSession = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const port = 8080

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log('mongoDB disconnected!');
})

mongoose.connection.on("connected", () => {
    console.log('mongoDB connected!');
})

// const store = new MongodbSession({
//     uri: process.env.MONGO,
//     collection: "sessions"
// })


app.use(cookieParser())
app.use(express.json())
app.use(cors({credentials: true, origin: true}))

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: store
// }))


app.use("/api/auth", authRoute);
app.use("/api/blogs", blogsRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    })
})

app.listen(port, () => {
    connect();
    console.log(`Blog app listening on port ${port}`)
})

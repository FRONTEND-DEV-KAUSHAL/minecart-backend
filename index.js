const express = require("express")
const app = express();
const cors = require('cors')
require("dotenv").config();
const mongoose = require('mongoose');
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const uri = process.env.DBURL;

app.use(express.json())
app.use(cors())
app.get('/', (req,res) => {
    res.send("<h1>Hello MineCart</h1>")
})

app.use('/auth', userRouter)
app.use('/product', productRouter)

mongoose.connect(uri).then((response) => {
    console.log("DB connected")
}).catch(e => {
    console.log("Mongo DB connection error:", e)
})


app.listen(process.env.PORT, () => {
    console.log("Server started!")
})
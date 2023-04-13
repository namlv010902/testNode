import express  from "express";
import mongoose from "mongoose";
import routerProducts from "./src/routers/products"
import routerAuth from "./src/routers/auth"
const app = express();

app.use(express.json())

app.use("/api",routerProducts)
app.use("/api",routerAuth)

mongoose.connect("mongodb://127.0.0.1:27017/testNode")
.then(()=>{
    console.log("connect success");
})
.catch((error)=>{
    console.log(error);
})

export const viteNodeApp = app
import express, {Application} from "express"
import env from "dotenv"
env.config()
import { db } from "./utils/db"
import { MainApp } from "./MainApp"

const app: Application = express()
const port: number = parseInt(process.env.PORT!)

MainApp(app)

const server = app.listen(process.env.PORT || port, ()=>{
    console.log()
    db()
})

process.on("uncaughtException", (error: Error)=>{
    console.log("uncaughtException")
    console.log("uncaughtException", error)

    process.exit(1)
})
process.on("unandledRejection", (reason: any)=>{
    console.log("unandledRejection")
    console.log("unandledRejection", reason)

    server.close(()=>{
        process.exit(1)
    })
})
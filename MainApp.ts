import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import { HTTP, mainError } from "./error/mainError"
import user from "./Router/userRouter"
import post from "./Router/postRoute"

export const MainApp = (app: Application) =>{
    app.use(express.json())
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"]
    })),
    app.use("/api/v1", user)
    app.use("/api/v1", post)

    app.get("/", (req: Request, res: Response)=>{
        res.status(HTTP.OK).json({
            message: "Awesome code"
        })
    })

    app.all("*", (req: Request, res: Response, next: NextFunction) =>{
        next(
            new mainError({
                name: "Router Error",
                message: `This Error is coming up because this ${req.originalUrl} isn't correct`,
                status: HTTP.BAD_REQUEST,
                success: false
            })
        )
    })
}
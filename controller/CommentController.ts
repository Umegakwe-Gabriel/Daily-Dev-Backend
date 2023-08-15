import express, { Request, Response} from "express"
import userModel from "../model/userModel"
import postModel from "../model/userModel"
import commentModel from "../model/commentModel"
import mongoose from "mongoose"
import { HTTP, mainError } from "../error/mainError"

export const createComment = async(req: any, res: Response)=>{
    try {
        const { userID, postID } = req.params;
        const { content } = req.body;

        const user: any = await userModel.findById(userID)
        const post: any = await postModel.findById(postID)

        if(user) {
            const comment = await commentModel.create({
                content, userID
            })

            post.comment.push(new mongoose.Types.ObjectId(comment._id))
            post.save()
            
            return res.status(HTTP.CREATED).json({
                message: "Comment created", data: comment
            })
        }else{
            return res.status(HTTP.CREATED).json({
                message: "Error"
            })
        }
    } catch (error) {
        new mainError({
            name: "Create comment Error",
            message: "This Error came as a result of you creating this comment",
            status: HTTP.BAD_REQUEST,
            success: false
        })

        return res.status(HTTP.CREATED).json({
            message: "Error"
        })
    }
}

export const getAllComment = async(req: any, res: Response) =>{
    try {
        const comment = await commentModel.find();

        return res.status(HTTP.OK).json({
            message: "get all comment",
            data: comment
        })
    } catch (error) {
        new mainError({
            name: "Create comment Error",
            message: "This Error came as a result of you creating this comment",
            status: HTTP.BAD_REQUEST,
            success: false
        })

        return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
    }
}

export const getPostComment = async(req: any, res: Response) => {
    try {
        const { userID, postID } = req.params;
    const post: any = await postModel.findById(postID).populate({
        path: "comment",
        options: {
            sort: { createdAt: -1}
        }
    })

    return res.status(HTTP.OK).json({message: "post's post", data: post})
    } catch (error) {
        new mainError({
            name: "Get comment Error",
            message: `This Error is came as a result of you creating this User!!!`,
            status: HTTP.BAD_REQUEST,
            success: false,
          });

          
    }
}
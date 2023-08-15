import express, {Request, Response} from "express"
import { HTTP, mainError } from "../error/mainError"
import userModel from "../model/userModel";
import postModel from "../model/PostModel";
import likeModel from "../model/likesModel";
import cloudinary from "../utils/cloudinary";
import mongoose from "mongoose";

export const createPost = async(req: Request, res: Response) => {
    try{
        const {userID} = req.params;
        const { title, content } = req.body;
        const user = await userModel.findById(userID)

        if(user){
            const {secure_url, public_id} = await cloudinary.uploader.upload(req?.file?.path!)
            const post = await postModel.create({
                title, content, image: secure_url, imageID: public_id, userID, user
            })

            user?.post!.push(new mongoose.Types.ObjectId(post._id));
            user.save();

            return res.status(HTTP.CREATED).json({
                message: "post Created", data: post
            })
        }else{
            return res.status(HTTP.BAD_REQUEST).json({
                message: "Error",
            })
        }

    }catch(error){
        new mainError({
            name: "Create Error",
            message: `User password is not correct`,
            status: HTTP.BAD_REQUEST,
            success: false
        })

        return res.status(HTTP.BAD_REQUEST).json({
            message: "User password isn't correct",
        })
    }
}
export const getUserPost = async(req: Request, res: Response) => {
    try{

        const {userID} = req.params;

        const user: any = await userModel.findById(userID).populate({
            path: "post",
            options: {
                sort: { createdAt: -1}
            }
        })

        return res.status(HTTP.CREATED).json({
            message: "get User post", data: user
        })

    }catch(error){
        new mainError({
            name: "one user Error",
            message: `User password is not correct`,
            status: HTTP.BAD_REQUEST,
            success: false
        })

        return res.status(HTTP.BAD_REQUEST).json({
            message: "User password isn't correct",
        })
    }
}

export const getAllPost = async(req: Request, res: Response) => {
    try{
        const post = await postModel.find()

        return res.status(HTTP.CREATED).json({
            message: "all post", data: post
        })
    }catch(error){
        new mainError({
            name: "all post Error",
            message: `User password is not correct`,
            status: HTTP.BAD_REQUEST,
            success: false
        })

        return res.status(HTTP.BAD_REQUEST).json({
            message: "User password isn't correct",
        })
    }
}

export const votePost = async(req: Request, res: Response) => {
    try{

        const {userID, postID} = req.params;
        const post: any = await postModel.findById(postID)
        const user: any = await userModel.findById(userID)

        const like: any = await likeModel.create({
            userID, like: true
        })

        post.vote.push(new mongoose.Types.ObjectId(like._id))
        post.save()

        return res.status(HTTP.CREATED).json({
            message: "user have voted this post", data: like
        })
    }catch(error){
        new mainError({
            name: "all post Error",
            message: `User password is not correct`,
            status: HTTP.BAD_REQUEST,
            success: false
        })

        return res.status(HTTP.BAD_REQUEST).json({
            message: "User password isn't correct",
        })
    }
}

export const unVotePost = async(req: Request, res: Response) => {
    try{

        const {userID, postID, likeID} = req.params;
        const user: any = await userModel.findById(userID)
        const post: any = await postModel.findById(postID)

        const like: any = await likeModel.findByIdAndDelete({
            likeID, like: false
        })

        post.vote.pull(new mongoose.Types.ObjectId(likeID))
        post.save()

        return res.status(HTTP.CREATED).json({
            message: "user have voted this post", data: like
        })
    }catch(error){
        new mainError({
            name: "all post Error",
            message: `User password is not correct`,
            status: HTTP.BAD_REQUEST,
            success: false
        })

        return res.status(HTTP.BAD_REQUEST).json({
            message: "User password isn't correct",
        })
    }
}

export const viewVotedPost = async(req: Request, res: Response) => {
    try{

        const {userID, postID, voteID} = req.params;
        const post: any = await postModel.findById(postID).populate({
            path: "vote",
            options: {
                sort: {createdAt: -1}
            }
        })


        return res.status(HTTP.CREATED).json({
            message: "user have voted this post", data: post
        })
    }catch(error){
        new mainError({
            name: "all post Error",
            message: `User password is not correct`,
            status: HTTP.BAD_REQUEST,
            success: false
        })

        return res.status(HTTP.BAD_REQUEST).json({
            message: "User password isn't correct",
        })
    }
}
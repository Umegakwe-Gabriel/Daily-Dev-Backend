import mongoose from "mongoose";


interface iPost{
    title: string;
    content: string;
    image?: string;
    imageID?: string;
    vote?: {}[];
    user?: {};
    comment?: {}[];
    tags?: Array<string>;
    userID?: string;
}

interface iPostData extends iPost, mongoose.Document{}

const PostModel = new mongoose.Schema<iPost>({

        title:{
            type: String,
        },
        content:{
            type: String,
        },
        image:{
            type: String,
        },
        imageID: {
            type: String
        },
        userID: {
            type: String
        },
        vote:[
            {
            type: mongoose.Types.ObjectId,
            ref: "likes"
        }
    ],
        comment:[{
            type: mongoose.Types.ObjectId,
            ref: "comments"
        }],
        tags:{
            type: Array<String>
        },
        user:{
            type: mongoose.Types.ObjectId,
            ref: "users"
        },
}, {timestamps: true})

export default mongoose.model<iPostData>("posts", PostModel)
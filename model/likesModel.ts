import mongoose from "mongoose";

interface iLike{
    like?: boolean;
    userID?: string;
}

interface iLikeData extends iLike, mongoose.Document{}

const LikeModel = new mongoose.Schema<iLike>({

        like:{
            type: Boolean,
            default: false
        },

        userID: {
            type: String
        },
}, {timestamps: true})

export default mongoose.model<iLikeData>("likes", LikeModel)
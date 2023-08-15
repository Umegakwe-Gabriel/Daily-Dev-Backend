import express from "express"
import image from "../utils/multer"
import { getAllPost, createPost, getUserPost, votePost, unVotePost, viewVotedPost } from "../controller/postController"

const router = express.Router()

router.route("/:userID/register").post(image, createPost)

router.route("/get-all-post").post(getAllPost)

router.route("/:userID/get-user-post").post(getUserPost)

router.route("/:userID/get-user-post").post(getUserPost)

router.route("/:userID/:postID/vote-post").post(votePost)

router.route("/:userID/:postID/:likeID/unvote-post").post(unVotePost)

router.route("/:postID/view-vote-post").get(viewVotedPost)

export default router;
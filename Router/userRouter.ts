import express from "express"
import upload from "../utils/multer"
import { getOneUser, getUser, registerUser, signInUser } from "../controller/userController"
// import { validator } from "../utils/validator"
// import { check } from "express-validator"

const router = express.Router()

router.route("/register").post(upload, registerUser, )

router.route("/sign-in").post(signInUser)

router.route("/users").get(getUser)

router.route("/:userID/get-one-user").post(getOneUser)

export default router;
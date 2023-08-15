import { check } from "express-validator"

export const validator = {
    registerValidator: [
        check("name").withMessage("Please fill in this field").isLength({min: 8}),
        check("email").trim().toLowerCase().isEmail().withMessage("Please Enter your Email"),
        check("password").isLength({min: 10}).matches("/^[A-Za-z0-9 .,'!&]+$/").withMessage("Password doesn't pass")
    ],

    signInValidator: [
        check("email").trim().toLowerCase().isEmail().withMessage("Please Enter your Email"),

        check("password").trim().isLength({min: 10}).matches("/^[A-Za-z0-9 .,'!&]+$/").withMessage("Password doesn't pass")
    ],
}

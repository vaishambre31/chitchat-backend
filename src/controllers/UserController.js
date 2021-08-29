import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import { generateToken, responseStatus } from '../utils/helper.js'
import MESSAGES from "../constants/messages.js"

const RegisterUser = asyncHandler(async (req, res) => {
    let {
        name,
        email,
        mobile,
        password,
    } = req.body;

    const userEmailExists = await User.findOne({ email })
    const userMobileExists = await User.findOne({ mobile })
    if (userEmailExists) {
        return responseStatus(res, MESSAGES.user.user_already_exists_with_email, 400, null)
    }
    if (userMobileExists) {
        return responseStatus(res, MESSAGES.user.user_already_exists_with_mobile, 400, null)
    }

    const newUser = await User.create({
        name,
        email,
        mobile,
        password,
    });
    responseStatus(res, MESSAGES.user.user_created, 201, newUser)
})

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        let newUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            profileImageUrl: user.profileImageUrl,
            coverImageUrl: user.coverImageUrl,
            token: generateToken(user._id)
        }
        responseStatus(res, MESSAGES.status.success, 200, newUser)
    } else {
        responseStatus(res, MESSAGES.auth.invalid_creds, 401, null)
    }
})

const GetProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        let userProfile = {
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            profileImageUrl: user.profileImageUrl,
            coverImageUrl: user.coverImageUrl,
        }
        responseStatus(res, MESSAGES.status.success, 200, userProfile)
    } else {
        responseStatus(res, MESSAGES.user.user_not_found, 404, null)
    }
})

export {
    RegisterUser,
    LoginUser,
    GetProfile
}
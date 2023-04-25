import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../errorHandling/error.js';

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = User({ ...req.body, password: hash })
        await newUser.save()

        res.status(200).send("User has been created...")
    } catch (error) {
        next(error)
    }
}


export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name })


        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) return next(createError(404, "wrong credentials..."))

        //don't send password
        const { password, ...others } = user._doc;


        // token
        const token = jwt.sign({ id: user._id }, process.env.JWT);

        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (error) {
        next(error)
    }
}


// google after completing front end part;

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {

            //user is there send cookies
            const token = jwt.sign({ id: user._id }, process.env.JWT);

            res.cookie('access_token', token, {
                httpOnly: true
            }).status(200).json(user._doc)

        } else {

            //user is not there save user and send cookies
            const newUser = new User({
                ...req.body
            })

            const savedUser = await newUser.save();

            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res.cookie('access_token', token, {
                httpOnly: true
            }).status(200).json(savedUser._doc)

        }
    } catch (error) {
        next(error)
    }
}
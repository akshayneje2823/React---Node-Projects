import express from 'express';
import { signin, signup,googleAuth } from '../Controllers/auth.js';

const router = express.Router()



// Create User
router.post('/signup',signup)

// Sign in 
router.post('/signin',signin)


// Google Auth
router.post('/google',googleAuth)

export default router
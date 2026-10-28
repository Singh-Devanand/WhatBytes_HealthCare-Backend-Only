const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');


async function registerUserController(req, res) {
    try{
        const {username, name, email, password} = req.body;
        const userIdentifier = username || name;

        if(!userIdentifier || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }   

        if(password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        const normalizedUsername = userIdentifier.trim();
        const normalizedEmail = email.trim().toLowerCase();

        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username: normalizedUsername },
                { email: normalizedEmail }
            ]
        });

        if(isUserAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password: passwordHash
        });
        await newUser.save();

        const token = jwt.sign(
            {id: newUser._id, username: newUser.username},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return res
            .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' })
            .status(201)
            .json({
                success: true,
                message: 'User registered successfully',
                token,
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
            });
    } catch (error) {
        console.log("Registration error : " , error);
    }
}

async function loginUserController(req, res) {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await userModel.findOne({ email: normalizedEmail }).select('+password');

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            {id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return res
            .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' })
            .status(200)
            .json({
                success: true,
                message: 'User logged in successfully',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
    } 
    catch(error){
        console.group("login error :" , error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

async function logoutUserController(req, res) {
    const token = req.cookies.token;
    if(!token){
        return res.status(400) .json({ message: 'No token found' });
    }

    try{
        await tokenBlacklistModel.create({ token });

        res.clearCookie("token",{ httpOnly: true, secure: true, sameSite: 'Strict' })

        res.status(200).json({ message: 'User logged out successfully' });
    }
    catch(error){
        console.log("logout error : ", error);
    }
}

module.exports = {registerUserController, loginUserController, logoutUserController};


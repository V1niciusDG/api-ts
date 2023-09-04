import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

 interface IJwtData {
    name: string;
     uid: number;
 }
const sign = (data: IJwtData) => {
    console.log(process.env.JWT_SECRET)
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verify = (token: string) => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid Token");
    }
};

const invalidTokens = new Set();

const addToBlacklist = (token) => {
    invalidTokens.add(token);
}

const isTokenBlacklisted = (token) => {
    return invalidTokens.has(token);
}


export {
    sign,
    verify,
    addToBlacklist,
    isTokenBlacklisted,
};
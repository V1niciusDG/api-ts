import { isTokenBlacklisted, verify } from "./JWTservice";
import httpStatus from 'http-status-codes';


export async function auth(req, res, next) {

    try {
       const authHeader = req.headers.authorization;
       console.log(authHeader);
       const [, token] = authHeader.split(' ');
       if (isTokenBlacklisted(token)) {
         return res.status(httpStatus.BAD_REQUEST).json({ message: 'Token não autorizado.' }); 
     }
       verify(token);
       next();
    } catch (error) {
       console.log(error);
       res.json({ error: "Token não autorizado." }).status(401);
       
    }
 }
import { verify } from "../src/JWTservice";


export async function auth(req, res, next) {
    try {
       const authHeader = req.headers.authorization;
       console.log(authHeader);
       const [, token] = authHeader.split(' ');
       verify(token);
       next();
    } catch (error) {
       console.log(error);
       res.json({ error: "Token não autorizado." }).status(401);
    }
 }
import { Router } from "express";
import receiveData from "../receiveData.json"
import { addToBlacklist, isTokenBlacklisted, sign, verify } from "../security/JWTservice";
import { auth } from "../security/auth";
import httpStatus from 'http-status-codes';
import users from "../users.json";


const router = Router()

router.post('/generate-token', (req, res) => {
    
    const { id, name } = req.body;
    console.log(name);
    console.log(id);
    const jwt = sign({
        uid: id,
        name
    })
    return res.json(jwt)

});

router.post('/validate-token', (req, res) => {  
        
        console.log(req.headers)
        const authHeader = req.headers.authorization;
        const [, token] = authHeader.split(' ');
        if (isTokenBlacklisted(token)) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'Token não autorizado.' }); 
        }
        console.log(token)
        const jwt = verify(token)
        return res.json(jwt);
        
    }
);


router.get('/', auth,(req, res) => {
    res.json(receiveData)
});



router.delete('/black-list', (req, res) => {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');
    
    if (isTokenBlacklisted(token)) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'Token já está na lista negro.' });
    };
    addToBlacklist(token);

    return res.status(httpStatus.OK).json({ message: 'Token revogado com sucesso.' });
});



export { router };



// router.delete('/black-list', (req, res) => {
//     const authHeader = req.headers.authorization;
//     console.log(authHeader);
//     const [, token] = authHeader.split(' ');
//     console.log(token);
//     addToBlacklist(token);
//     return res.json("Token adicionado a lista negra").status(200);
// });

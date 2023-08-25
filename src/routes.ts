import { Router } from "express";
import receiveData from "./receiveData.json"
import { sign, verify } from "../src/JWTservice";
import { auth } from "./auth";
import users from "../src/users.json";


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
    console.log(token)
    const jwt = verify(token)
    return res.json(jwt);
});


router.get('/', auth,(req, res) => {
    res.json(users)
});


export { router };


import express from 'express';
import UserRouter from "./routes/Usuario.js"
import 'dotenv/config';
import cors from 'cors';

const api = express()
const PORT = process.env.API_PORT;

api.use(express.json());
api.use(cors());

api.use("/api/usuario", UserRouter)

api.listen(PORT, ()=>{
    console.log(`Api opened at http://localhost:${PORT}`);
})

api.get('/', (req, res) => {
    res.send('Tudo certo!')
})


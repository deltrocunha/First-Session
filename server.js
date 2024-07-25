import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/*import routes from './routes/userroute.js'*/


const prisma = new PrismaClient()
const app = express()
app.use(express.json())


app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})


app.post('/usuarios', async (req, res) => {

    if (!req.body.name || !req.body.email || req.body.nif) {
        res.status(400).send({
            message: "Preencha todos os campos obrigatórios"
        })

    }
    req.body.senha = await bcrypt.hash(req.body.senha, 10)
    await prisma.user.create({

        data: {
            email: req.body.email,
            name: req.body.name,
            nif: req.body.nif,
            tipousuario: req.body.tipousuario,
            senha: req.body.senha,
            carteira: req.body.carteira
        }

    })

    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id

        },
        data: {
            email: req.body.email,
            name: req.body.name,
            nif: req.body.nif,
            tipousuario: req.body.tipousuario,
            senha: req.body.senha,
            carteira: req.body.carteira
        }

    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }

    })
    res.status(200).json("Usuário Eliminado")
    console.log('Usuário Eliminado');


})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body


    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' })
    }


    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) {
        return res.status(401).json({ error: 'Senha incorreta' })
    }


    const token = jwt.sign({ userId: prisma.user.id }, process.env.SECRET_KEY, {
        expiresIn: 200,
    });


    res.json({ token })
});


app.get('/autentica', authenticate, (req, res) => {
    res.json({ message: 'Você está autenticado!' })
});


function authenticate(req, res, next) {
    const token = req.headers(['x-access-token'] || req.headers['authorization'])
    if (!token) {
        return res.status(401).json({ error: 'Token não encontrado' })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' })
        }
        req.id = decoded.user.id
        next('autentica/prestador')
    });
}

app.post('autentica/inicial', async (req, res) => {

    const user = await prisma.user.findUnique({ where: { email } })

    if (!authenticate) {
        return res.authenticate
    } else if (user.email === (user.tipousuario === "prestador")) {
        res.status(200).send("Bem-Vindo" + user.name)
        async function criarservico (req, res, next){
            await prisma.servico.create({
                data:{
                    namedeservico: req.body.namedeservico,
                    email: user.email,
                    nif: user.nif,
                    preco: req.body.preco

                }

            })
        }

    } else if(user.id === user.tipousuario === "cliente") {
       
        res.status(200).send("Bem-Vindo" + user.name)
        async function contratarservico (req, res, next) {
            await prisma.servico.create({
                data:{
                    namedeservico: req.body.namedeservico,
                    email: user.email,
                    nif: user.nif,
                    preco: req.body.preco

                }
            })
        }
            }
    
        })





app.listen(3000)
/*
yazalde
QpSbcOYsTM82dwBg
*/

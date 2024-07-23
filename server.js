import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
/*import autencontroller from './controllers/autencontroller.js'*/

/*const aut = new autencontroller()*/
const prisma = new PrismaClient()
const app = express()
app.use(express.json())


app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})


app.post('/usuarios', async (req, res) => {

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
        where:{
            id: req.params.id
        }
         
    })
    res.status(200).json("Usuário Eliminado")
    console.log('Usuário Eliminado');


})




app.listen(3000)
/*
yazalde
QpSbcOYsTM82dwBg
*/

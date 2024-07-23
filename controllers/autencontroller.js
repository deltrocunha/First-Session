import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
/*
import * as dotenv from 'dotenvjs'

dotenv.config()

const prisma = new PrismaClient()
const app = express()

const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        prisma.user.findOne({email: req.body.email, nif: req.body.nif}, (error, user) => {
                if(!prisma.user){
                    return res.status(401).json({
                        statusCode: 401,
                        message: "Usuario Nao Cadatrasdo",
                        data: {
                            email: req.body.email,
                            nif: req.body.senha
                        }
                    })

                }

                const validasenha = bcrypt.compareSync(req.body.senha, prisma.user.senha)

                if(!validasenha){
                    res.status(401).json({
                        statusCode: 401,
                        message: "Não Autorizado", 
                })

        }
                if(prisma.user.tipousuario = "Cliente"){
                    
                    

                }

        const chave = jwt.sign({name: prisma.user.name}, SECRET)
        res.status(200).json({
            statusCode: 200,
            message: "Bem-Vindo", 
    })
    })

    }catch(error){
        console.error(error)
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}






export default{
    login
}


*/

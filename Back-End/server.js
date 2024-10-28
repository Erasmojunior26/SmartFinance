import  express  from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            nome: req.body.nome,
            saldo: req.body.saldo
        }
    })

    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            nome: req.body.nome,
            saldo: req.body.saldo
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where:{
            id: req.params.id
       }
    })
    res.status(201).json({message: "Usuário Deletado"})
})

app.listen(1200)
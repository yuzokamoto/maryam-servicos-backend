import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { getAddressInfo } from './services/getAddressInfo'
import transporter from './services/transporter'

dotenv.config()

export const app = express()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log("Server rodando na porta:", process.env.PORT || 3003)
})

app.get("/address", async (req: Request, res: Response) => {
    try {
        const cep = req.body.cep
        const email = req.body.email

        const address = await getAddressInfo(cep)

        if (!address) {
            throw new Error("CEP inválido")
        }

        const info = await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: email,
            subject: "Acerca do endereço",
            text: `Você mora no ${address.estado} na cidade ${address.cidade}.`,
            html: `<p>Você mora no ${address.estado} na cidade ${address.cidade}.</p>`
        })

        res.send({ address, info })

    } catch (error) {
        res.send(error)
    }
})
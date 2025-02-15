import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import linksRouter from './routes/links'
import redirectRouter from './routes/redirect'
import './services/cron'

declare global {
  namespace Express {
    interface Request {
      context: {
        prisma: PrismaClient
      }
    }
  }
}

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const prisma = new PrismaClient();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.context = {
    prisma
  }
  next()
})

app.use('/api/v1/links', linksRouter)
app.use('/api/v1/redirect', redirectRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import AppDataSource from './config/data-source'

dotenv.config()

console.log(process.env)

const app = express()
app.use(express.json())

app.use('/api', userRoutes)

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log('Error during Data Source initialization', error))
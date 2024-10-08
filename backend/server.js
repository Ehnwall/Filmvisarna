import express from 'express'
import router from './src/router/routes.js'

const port = 4000
const app = express()

app.use(express.json())
app.use(router)

app.listen(port, async () => {
    console.log(`Server is alive at http://localhost:${port}`)
})

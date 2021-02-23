import express from 'express'
import routes from './routes'

import { MongoConnect } from './db/MongoConnect'

const app = express()

const mongoUrl = 'mongodb://localhost:27017/project-cars'

MongoConnect.connect(mongoUrl)
  .then(async () => {
    app.use(routes)
    app.use(express.json)
    app.listen(3333, () => console.log(`Server running at http://localhost:3333`))
  })
  .catch(console.error)
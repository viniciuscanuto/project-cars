import express from 'express'
import cors  from  'cors'
import routes from './routes'

import { MongoConnect } from './db/MongoConnect'

const app = express()

const mongoUrl = 'mongodb://localhost:27017/project-cars'

MongoConnect.connect(mongoUrl)
  .then(async () => {
    //app.use(cors())
    app.use(express.json())
    app.use(routes)
    app.listen(3333, () => console.log(`Server running at http://localhost:3333`))
  })
  .catch(console.error)
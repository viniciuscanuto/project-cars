import { Router } from 'express'

import CarController from './controller/CarController'


const routes = Router();

routes.post('/cars', CarController.create)
routes.get('/cars', CarController.index)
routes.get('/cars/:id', CarController.show)
routes.put('/cars/:id', CarController.edit)

export default routes;
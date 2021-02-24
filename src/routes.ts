import { Router, Request, Response} from 'express'
import { MongoConnect } from './db/MongoConnect'
import { MongoClient} from 'mongodb'
import { Car } from './models/Car';
import { CarValidator } from './validator/CarValidator';

import CarController from './controller/CarController'


const routes = Router();

routes.post('/cars', CarController.create)
routes.get('/cars', CarController.index)


export default routes;
import {Request, Response} from 'express'
import { Collection, MongoClient, ObjectId} from 'mongodb'
import { MongoRepository } from '../db/MongoRepository';
import { Car } from '../models/Car';
import { CarValidator } from '../validator/CarValidator';

const uri = 'mongodb://localhost:27017/project-cars'
const dbname = 'project-cars'
const collection = 'car'

/* const client = new MongoClient(uri , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function getCollection(name: string): Promise<Collection>{
  await client.connect()
  return client.db(dbname).collection(name)
}
 */
const mongoRepository = new MongoRepository(uri)


export default {
  async create (request: Request, response: Response){
    const {
      marca,
      model,
      versao,
      ano,
      quilometragem,
      tipo_cambio,
      preco_de_venda
    } = request.body
  
    const dataCar: Car = {
      marca,
      model,
      versao,
      ano,
      quilometragem,
      tipo_cambio,
      preco_de_venda
    }
  
    const carValidator = new CarValidator()
    const isValid = await carValidator.validate(dataCar)

    if(isValid){
      const carCollection = await mongoRepository.getCollection('car')
      const result = await carCollection.insertOne(dataCar);
      
      return response.json({message: 'ok'})
    }else{
      return response.json({message: 'fail'})
    }
  },

  async index(request: Request, response: Response) {
    const carCollection = await mongoRepository.getCollection('car')
    const result = await carCollection.aggregate().toArray()

    return response.json(result)
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const carCollection = await mongoRepository.getCollection('car')
    const result = await carCollection.findOne({ "_id" : new ObjectId(id)})
    return response.json(result)
  },

  async edit(request: Request, response: Response) {

    const { id } = request.params
    const {
      marca,
      model,
      versao,
      ano,
      quilometragem,
      tipo_cambio,
      preco_de_venda
    }: Car = request.body

    const carCollection = await mongoRepository.getCollection('car')
    const result = await carCollection.updateOne({
      "_id" : new ObjectId(id)
      }, {
        $set: {
          marca, 
          model, 
          versao, 
          ano, 
          quilometragem, 
          tipo_cambio, 
          preco_de_venda
        }
      }
    )

    return response.json(result)
  },

  async destroy(request: Request, response: Response) {
    const { id } = request.params

    const carCollection = await mongoRepository.getCollection('car')
    const result = await carCollection.deleteOne({ '_id': new ObjectId(id)}) 
    
    return response.json(result)
  }  
}
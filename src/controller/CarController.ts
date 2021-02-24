import {Request, Response} from 'express'
import { MongoClient} from 'mongodb'
import { Car } from '../models/Car';
import { CarValidator } from '../validator/CarValidator';

const uri = 'mongodb://localhost:27017/project-cars'

const client = new MongoClient(uri , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
      await client.connect();
      const database = client.db("project-cars");
      const collection = database.collection("car");
      // create a document to be inserted
      const { name, age} = request.body
  
      
      const result = await collection.insertOne(dataCar);
      
      return response.json({message: 'ok'})
    }else{
      return response.json({message: 'fail'})
    }
  },
}
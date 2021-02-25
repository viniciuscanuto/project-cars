import {Request, Response} from 'express'
import { ObjectId } from 'mongodb'
import { MongoRepository } from '../db/MongoRepository';
import { Car } from '../models/Car';
import { CarValidator } from '../validator/CarValidator';

interface CarFilter {
  marca: string
  model: string
  versao: string
  ano: number 
  quilometragem: string
  tipo_cambio: string
  preco_de_venda: number
  anoRange: {
    minimo: number
    maximo: number
  }
  preco_de_vendaRange: {
    minimo: number
    maximo: number
  }
}

const uri = 'mongodb://localhost:27017/project-cars'

export default {
  async create (request: Request, response: Response){
    try {
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
        const mongoRepository = new MongoRepository(uri)
        const carCollection = await mongoRepository.getCollection('car')
        await carCollection.insertOne(dataCar);
        return response.status(200).json('Successfully Created')
      }else{
        return response.status(400).json('Invalid Param Error')
      }
    } catch(error) {
      console.log(error)
      response.status(500).json('Internal Server Error')
    }
  },

  async index(request: Request, response: Response) {
    try{
      const mongoRepository = new MongoRepository(uri)
      const carCollection = await mongoRepository.getCollection('car')
      const result = await carCollection.aggregate().toArray()

      return response.status(200).json(result)
    } catch(error) {
      console.log(error)
      response.status(500).json('Internal Server Error')
    }
    
  },

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params

      const mongoRepository = new MongoRepository(uri)
      const carCollection = await mongoRepository.getCollection('car')
      const result = await carCollection.findOne({ "_id" : new ObjectId(id)})
      if(!result) {
        return response.status(404).json('Not Found')
      }
      return response.status(200).json(result)
    } catch(error) {
      console.log(error)
      response.status(500).json('Internal Server Error')
    }
  },

  async edit(request: Request, response: Response) {
    try {
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

      const mongoRepository = new MongoRepository(uri)
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
      })

      return response.status(200).json('Car updated')
    } catch(error) {
      console.log(error)
      response.status(500).json('Internal Server Error')
    }
  },

  async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params

      const mongoRepository = new MongoRepository(uri)
      const carCollection = await mongoRepository.getCollection('car')
      await carCollection.deleteOne({ '_id': new ObjectId(id)}) 
      return response.status(200).json('Car deleted')
    } catch(error) {
      console.log(error)
      response.status(500).json('Internal Server Error')
    }
  },
  
  async showByFilter(request: Request, response: Response) {
    try {
      const {
        marca,
        model,
        versao,
        ano,
        quilometragem,
        tipo_cambio,
        preco_de_venda,
        anoRange,
        preco_de_vendaRange
      }:CarFilter = request.body

      const mongoRepository = new MongoRepository(uri)
      const carCollection = await mongoRepository.getCollection('car')
      const result = await carCollection.aggregate([{
        $match: { 
          $or: [
            {marca: marca}, 
            {model: model},
            {versao: versao},
            {ano: ano},
            {quilometragem: quilometragem},
            {tipo_cambio: tipo_cambio},
            {preco_de_venda: preco_de_venda},
            {ano: {$lte: anoRange.maximo, $gte: anoRange.minimo}},
            {preco_de_venda: {$lte: preco_de_vendaRange.maximo, $gte: preco_de_vendaRange.minimo}},
          ]
        } 
      }]).toArray()
      return response.status(200).json(result)
    }catch(error) {
      console.error
    }
  }
}
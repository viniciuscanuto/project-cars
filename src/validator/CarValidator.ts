import { Car } from '../models/Car'
import * as Yup from 'yup'

export class CarValidator {
  
  async validate(data: Car): Promise<boolean> {
    try {
      
      const schema = Yup.object().shape({
        marca: Yup.string().required(),
        model: Yup.string().required(),
        versao: Yup.string().required(),
        ano: Yup.number().required(),
        quilometragem: Yup.string().required(),
        tipo_cambio: Yup.string().required(),
        preco_de_venda: Yup.number().required()
      });
      return await schema.isValid(data)
      
    } catch(error) {
      console.error
      return false
    }
  }
}
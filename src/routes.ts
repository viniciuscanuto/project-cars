import { Router, Request, Response} from 'express'

const routes = Router();

routes.get('/cars', (req: Request, res: Response) => {
  return res.json({ mensagem: 'teste'})
})

export default routes;
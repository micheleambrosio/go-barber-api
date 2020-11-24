import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController';

const providersController = new ProvidersController();
const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.create);

export default providersRouter;

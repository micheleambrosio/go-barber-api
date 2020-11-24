import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id
    });

    return response.json(providers);
  }
}

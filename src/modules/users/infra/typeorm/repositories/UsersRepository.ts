import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository, Not } from 'typeorm';
import User from '../entities/User';
import { IFindAllProvidersDTO } from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string) {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO) {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      });

      return users;
    }

    users = await this.ormRepository.find();

    return users;
  }

  public async create(data: ICreateUserDTO) {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User) {
    return await this.ormRepository.save(user);
  }
}

export default UsersRepository;

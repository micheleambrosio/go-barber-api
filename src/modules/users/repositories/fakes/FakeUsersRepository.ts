import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { uuid } from 'uuidv4';
import User from '../../infra/typeorm/entities/User';
import { IFindAllProvidersDTO } from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO) {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async findById(id: string) {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string) {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(data: ICreateUserDTO) {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User) {
    const findIndex = this.users.findIndex(findUser => user.id === findUser.id);
    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;

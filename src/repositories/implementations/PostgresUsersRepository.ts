import { User } from '../../entities/User'
import { IUsersRepository } from '../IUserRepository'

export class PostgresUsersRepository implements IUsersRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (user) {
      return user
    }

    return null
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}

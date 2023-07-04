import { User } from '../../entities/User'
import { IMailProvider } from '../../provides/IMailProvider'
import { IUsersRepository } from '../../repositories/IUserRepository'
import { ICrateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute({ email, name, password }: ICrateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = new User({
      email,
      name,
      password,
    })

    await this.usersRepository.save(user)

    await this.mailProvider.sendEmail({
      to: {
        name,
        email,
      },
      from: {
        name: 'App team',
        email: 'app@team.com',
      },
      subject: 'Welcome to App!',
      body: '<p>You can already use the app.</p>',
    })
  }
}

import { randomUUID } from 'node:crypto'

export class User {
  public readonly id?: string
  public name: string
  public email: string
  public password: string

  constructor({ email, name, password }: Omit<User, 'id'>, id?: string) {
    this.name = name
    this.email = email
    this.password = password

    if (!id) {
      this.id = randomUUID()
    }
  }
}

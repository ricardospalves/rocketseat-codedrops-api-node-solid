import type { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { ICrateUserRequestDTO } from './CreateUserDTO'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body as ICrateUserRequestDTO

    try {
      await this.createUserUseCase.execute({
        email,
        name,
        password,
      })

      return response.status(201).send()
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Unexpected error.',
      })
    }
  }
}

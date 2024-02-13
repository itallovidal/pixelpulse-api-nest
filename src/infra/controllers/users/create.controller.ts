import { Body, Controller, Post } from '@nestjs/common'
import {
  createUserDTO,
  ICreateUserDTO,
} from '../../../domain/DTOs/create-user-schema'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateUserUseCase } from '../../../app/useCases/users/createUserUseCase'

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('signup')
  async handle(
    @Body(new ZodValidationPipe(createUserDTO)) payload: ICreateUserDTO,
  ) {
    console.log(payload)
    try {
      await this.createUserUseCase.execute(payload)
      return {
        status: 201,
        message: 'Usuário criado com sucesso!',
      }
    } catch (e) {
      console.log(e)
    }
  }
}

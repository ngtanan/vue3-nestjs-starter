import {
  Controller, Post, Body, HttpCode, HttpStatus, UsePipes, Get, UseInterceptors, ClassSerializerInterceptor
} from '@nestjs/common'
import {
  ApiTags, ApiBody, ApiCreatedResponse
} from '@nestjs/swagger'
import * as Joi from 'joi'

import { JoiValidationPipe } from '../../pipes/validation.pipe'

import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const result = await this.userService.findAll()
    return result
  }

  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'firstName', 'lastName', 'password'],
      properties: {
        email: { type: 'email', example: 'somebody@hotmail.com' },
        firstName: { type: 'string', example: 'Tom' },
        lastName: { type: 'string', example: 'Cruise' },
        password: { type: 'string', example: 'youknowwhatitis' }
      }
    }
  })
  @ApiCreatedResponse()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required()
    })
  }))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto)
    return result.identifiers[0]
  }
}

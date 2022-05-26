import { Injectable } from '@nestjs/common'
import { InsertResult } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email })
  }

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.find()
    console.log('result', result)
    return result
  }

  async create(user: CreateUserDto): Promise<InsertResult> {
    const tmpUser: CreateUserDto = user
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user.password, salt)
    tmpUser.password = hash
    return this.userRepository.insert(tmpUser)
  }
}

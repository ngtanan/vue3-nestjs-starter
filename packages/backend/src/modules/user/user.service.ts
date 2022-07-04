import { Injectable } from '@nestjs/common'
import { InsertResult, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email })
  }

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.find()
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

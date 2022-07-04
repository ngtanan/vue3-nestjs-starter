import { Repository } from 'typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'

describe('UserService', () => {
  let userRepository: Repository<User>
  let userService: UserService

  beforeEach(() => {
    userRepository = new Repository<User>()
    userService = new UserService(userRepository)
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })

  describe('findOne', () => {
    it('shoud be working', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined)
      const data = await userService.findOne('123')
      expect(data).toEqual(undefined)
      expect(userRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })

  describe('findAll', () => {
    it('shoud be working', async () => {
      const user = new User()
      user.userNumber = 1
      user.email = 'test@gmail.com'
      user.firstName = 'test'
      user.lastName = 'test'
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([user])
      const data = await userService.findAll()
      expect(data).toEqual([user])
      expect(userRepository.find).toHaveBeenCalledTimes(1)
    })
  })
})

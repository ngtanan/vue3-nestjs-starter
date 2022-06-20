import { UserService } from './user.service'
import { UserRepository } from './user.repository'

describe('CatsController', () => {
  let userRepository: UserRepository
  let userService: UserService

  beforeEach(() => {
    userRepository = new UserRepository()
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
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([])
      const data = await userService.findAll()
      expect(data).toEqual([])
      expect(userRepository.find).toHaveBeenCalledTimes(1)
    })
  })
})

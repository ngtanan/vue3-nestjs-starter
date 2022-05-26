import { define } from 'typeorm-seeding'

import { User } from '../../modules/user/user.entity'

define(User, () => {
  const user = new User()
  user.firstName = 'Nguyen'
  user.lastName = 'An'
  user.email = 'ntanan1996@gmail.com'
  user.password = 'my-password'

  return user
})

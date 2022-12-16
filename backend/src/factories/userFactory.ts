import { UserEntityType } from '@/core/user';
import UserRepository from '@/repositories/user';
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';

export const userFactory = async (user: Partial<UserEntityType>, create?: boolean): Promise<UserEntityType | null> => {
  const firstName = user.firstName ?? faker.name.firstName();
  const lastName = user.lastName ?? faker.name.lastName();
  let fullName = faker.name.fullName();
  if (!user.fullName) fullName = `${firstName} ${lastName}`;

  const createdUser = {
    userId: user.userId ?? v4(),
    email: user.email ?? faker.internet.email(),
    providerId: user.providerId ?? faker.random.numeric(21),
    emailVerified: user.emailVerified ?? true,
    fullName: fullName,
    firstName: firstName,
    lastName: lastName,
    picture: user.picture ?? ''
  };

  if (create) {
    const userRepository = new UserRepository();
    return await userRepository.findOrCreate(createdUser);
  }

  return createdUser;
};

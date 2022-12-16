import UserRepository from '@/repositories/user';
import { Authenticated } from '@/middleware/authenticated';
import { UserCollectionType } from '@/core/user';

export const getProfile = async (userId: string): Promise<UserCollectionType | null> => {
  const userRepository = new UserRepository();
  return await userRepository.getProfile(userId);
};

export const handler = Authenticated(getProfile);

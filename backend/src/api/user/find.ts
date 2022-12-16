import UserRepository from '@/repositories/user';
import { Authenticated } from '@/middleware/authenticated';
import { UserEntityType } from '@/core/user';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const findUser = async (_userId: string, event: APIGatewayProxyEventV2): Promise<UserEntityType | null> => {
  const { email } = JSON.parse(event.body ?? '');
  const userRepository = new UserRepository();
  return await userRepository.findByEmail(email);
};

export const handler = Authenticated(findUser);

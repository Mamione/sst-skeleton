import UserRepository from '@/repositories/user';
import { Authenticated } from '@/middleware/authenticated';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { MessageResponse } from '@/middleware/apiResponse';

export const updateProfile = async (userId: string, event: APIGatewayProxyEventV2): Promise<MessageResponse | null> => {
  const { firstName, lastName, fullName } = JSON.parse(event.body ?? '');
  const userRepository = new UserRepository();
  return (await userRepository.updateProfile(userId, firstName, lastName, fullName)) ? { message: 'User profile updated.' } : null;
};

export const handler = Authenticated(updateProfile);

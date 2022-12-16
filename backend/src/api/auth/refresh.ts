import { Authenticated } from '@/middleware/authenticated';
import { Session } from '@serverless-stack/node/auth/session';

interface TokenResponse {
  token: string;
}

const inner = async (userId: string): Promise<TokenResponse> => {
  const token = Session.create({
    type: 'user',
    properties: {
      userId
    }
  });

  return { token };
};

export const handler = Authenticated(inner);

import UserRepository from '@/repositories/user';
import { AuthHandler, GoogleAdapter, Session } from '@serverless-stack/node/auth';
import * as dotenv from 'dotenv';
dotenv.config();

declare module '@serverless-stack/node/auth' {
  export interface SessionTypes {
    // You can have multiple session types like api: { apikey: string }
    // for now our only entity is "user"
    user: {
      userId: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      onSuccess: async (response) => {
        // User authenticated successfully (add to db)
        const claims = response.claims();
        const userRepository = new UserRepository();
        const user = await userRepository.findOrCreate({
          email: claims.email ?? '',
          providerId: claims.sub,
          emailVerified: claims.email_verified ? true : false,
          fullName: claims.name ?? '',
          firstName: claims.given_name ?? '',
          lastName: claims.family_name ?? '',
          picture: claims.picture ?? ''
        });
        return Session.parameter({
          redirect: process.env.GOOGLE_REDIRECT_URL + '/login' ?? '',
          type: 'user',
          properties: {
            userId: user?.userId ?? ''
          }
        });
      }
    })
  }
});

import { use, Auth, StackContext } from '@serverless-stack/resources';
import { RestApi } from './RestApi';

export function Authentication({ stack }: StackContext) {
  const api = use(RestApi);
  // <api-url>/auth/google/authorize
  // <api-url>/auth/google/callback <-- add this to your google cloud auth callback permissions
  const auth = new Auth(stack, 'auth', {
    authenticator: {
      handler: 'api/auth/auth.handler'
    }
  });

  auth.attach(stack, { api: api.api });
  return {
    auth
  };
}

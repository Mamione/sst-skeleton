import { use, StackContext, StaticSite } from '@serverless-stack/resources';
import { RestApi } from './RestApi';

export function Web({ stack }: StackContext) {
  const api = use(RestApi);

  const site = new StaticSite(stack, 'site', {
    path: 'web',
    buildOutput: 'dist',
    buildCommand: 'npm run build',
    environment: {
      VITE_API_URL: api.url
    }
  });

  stack.addOutputs({
    API_URL: api.url,
    SITE: site.url
  });

  return site;
}

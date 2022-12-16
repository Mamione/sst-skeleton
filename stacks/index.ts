import { RestApi } from './RestApi';
import { App } from '@serverless-stack/resources';
import { Authentication } from './Authentication';
import { StorageStack } from './Dynamo';
import { Web } from './Web';

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'backend/src',
    bundle: {
      format: 'esm'
    }
  });
  app.stack(StorageStack).stack(RestApi).stack(Authentication).stack(Web);
}

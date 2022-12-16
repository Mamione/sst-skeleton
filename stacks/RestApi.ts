import { StackContext, Api, Config, use, attachPermissionsToRole } from '@serverless-stack/resources';
import { StorageStack } from './Dynamo';
import * as iam from 'aws-cdk-lib/aws-iam';

export function RestApi({ stack }: StackContext) {
  const { table } = use(StorageStack);

  // Create one IAM role to rule them all
  const role = new iam.Role(stack, 'ApiRole', {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    managedPolicies: [
      {
        managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
      }
    ]
  });
  // Attach permissions to role
  attachPermissionsToRole(role, [table]);

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bind: [table],
        role
      }
    },
    routes: {
      /// /entity/action (unless its get then exclude)
      'POST /notouch/modify_defaults': 'api/permissionList/modifyDefaultPermission.handler', // Only super admins
      'GET /user/profile': 'api/user/get.handler',
      'POST /user/find': 'api/user/find.handler',
      'POST /user/update': 'api/user/update.handler',
      'GET /auth/refresh': 'api/auth/refresh.handler',
      'POST /userrole/create': 'api/userRole/create.handler',
      'POST /notification/get': 'api/notification/get.handler',
      'POST /notification/mark': 'api/notification/markRead.handler',
      'POST /permissions/get': 'api/permissionList/get.handler',
      'POST /permissions/create': 'api/permissionList/create.handler',
      'GET /organization/{organizationId}': 'api/organization/get.handler',
      'POST /organization/find': 'api/organization/find.handler',
      'POST /organization/create': 'api/organization/create.handler',
      'POST /organization/update': 'api/organization/update.handler',
      'GET /organization/contests/{organizaitonId}': 'api/organization/getOrganizationContest.handler',
      'GET /nomination/{nominationId}': 'api/nomination/get.handler',
      'POST /nomination/find': 'api/nomination/find.handler',
      'POST /nomination/create': 'api/nomination/create.handler',
      'POST /nomination/update': 'api/nomination/update.handler',
      'GET /salestype/{salesTypeId}': 'api/salesType/get.handler',
      'GET /salestype/campaign/{campaignId}': 'api/salesType/getByCampaign.handler',
      'POST /salestype/create': 'api/salesType/create.handler',
      'POST /salestype/update': 'api/salesType/update.handler',
      'GET /contest/{contestId}': 'api/contest/get.handler',
      'POST /contest/update': 'api/contest/update.handler',
      'POST /entry/nominate': 'api/entryLog/create.handler',
      'POST /nominationcategory/get': 'api/nominationCategory/get.handler',
      'POST /vote/vote': 'api/voteLog/create.handler',
      'POST /votecategory/get': 'api/voteCategory/get.handler',
      'POST /contest/create': 'api/contest/create.handler',
      'GET /contest/delete': 'api/contest/delete.handler',
      'GET /product/get/{productId}': 'api/product/get.handler',
      'POST /product/category/get': 'api/product/getFromProductCategory.handler',
      'POST /product/create': 'api/product/create.handler',
      'POST /product/update': 'api/product/update.handler',
      'POST /product/disable': 'api/product/disable.handler',
      'GET /productbundle/get/{productBundleId}': 'api/productBundle/get.handler',
      'POST /productbundle/create': 'api/productBundle/create.handler',
      'POST /productbundle/update': 'api/productBundle/update.handler',
      'POST /productbundle/delete': 'api/productBundle/delete.handler',
      'GET /productcategory/get/{productCategoryId}': 'api/productCategory/get.handler',
      'POST /productcategory/create': 'api/productCategory/create.handler',
      'POST /productcategory/delete': 'api/productCategory/delete.handler',
      'POST /productvariation/get': 'api/productVariation/get.handler',
      'POST /productvariation/create': 'api/productVariation/create.handler',
      'POST /productvariation/update': 'api/productVariation/update.handler',
      'POST /productvariation/disable': 'api/productVariation/disable.handler',
      'GET /order/{orderId}': 'api/order/get.handler',
      'GET /order/campaign/{campaignId}': 'api/order/getCampaign.handler',
      'POST /order/nomination': 'api/order/getNomination.handler',
      'POST /order/create': 'api/order/create.handler',
      'POST /order/update': 'api/order/update.handler',
      'GET /orderitem/{orderItemId}': 'api/orderItem/get.handler',
      'GET /orderitem/order/{orderId}': 'api/orderItem/get.handler',
      'GET /orderitem/product/{productId}': 'api/orderItem/getProduct.handler',
      'GET /orderitem/user': 'api/orderItem/getUser.handler',
      'POST /orderitem/create': 'api/orderItem/create.handler',
      'GET /approval/get/{approvalId}': 'api/approval/get.handler',
      'POST /approval/create': 'api/approval/create.handler',
      'POST /approval/update': 'api/approval/update.handler',
      'POST /approval/getNomination': 'api/approval/getNomination.handler',
      'POST /approvalmessage/create': 'api/approvalMessage/create.handler'
    }
  });

  const API_URL = new Config.Parameter(stack, 'API_URL', {
    value: api.url
  });

  api.bind([API_URL]);

  stack.addOutputs({
    ApiEndpoint: api.url
  });

  return {
    api: api,
    url: api.url
  };
}

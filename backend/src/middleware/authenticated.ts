import { CheckUserPermission } from '@/helpers/permissionChecker';
import { ApiHandler } from '@serverless-stack/node/api';
import { useSession } from '@serverless-stack/node/auth';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';
import { errorResponse, successResponse, unauthorizedResponse } from './responseTypes';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Authenticated = (lambda: any, permission?: string) =>
  ApiHandler(async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    const session = useSession();
    if (session.type !== 'user') {
      return unauthorizedResponse();
    }
    const { userId } = session.properties;
    if (!userId) return unauthorizedResponse();

    // Check for permissions
    if (permission) {
      const organizationId = event.headers['x-org-perm'];
      if (!organizationId) return unauthorizedResponse();
      const hasPermission = await CheckUserPermission({ userId, organizationId, permission });
      if (!hasPermission) return unauthorizedResponse();
    }

    const data = await lambda(userId, event, context);
    if (data.error) return errorResponse(data.error);
    if (!data) return unauthorizedResponse();

    return successResponse(data);
  });

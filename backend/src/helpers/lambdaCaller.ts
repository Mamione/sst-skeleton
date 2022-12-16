/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters
} from 'aws-lambda';

interface LambdaCaller {
  function: any;
  userId?: string;
  pathParameters?: APIGatewayProxyEventPathParameters;
  queryStringParameters?: APIGatewayProxyEventQueryStringParameters;
  params?: { [key: string]: any };
  headers?: APIGatewayProxyEventHeaders;
}

export const lambdaCaller = (caller: LambdaCaller): Promise<any> => {
  const eventData = {
    version: '',
    routeKey: '',
    rawPath: '',
    requestContext: {} as APIGatewayEventRequestContextV2,
    isBase64Encoded: false
  };

  if (caller.userId) {
    return caller.function(caller.userId, {
      body: JSON.stringify(caller.params),
      headers: caller.headers ?? {},
      queryStringParameters: caller.queryStringParameters,
      pathParameters: caller.pathParameters,
      ...eventData
    });
  }

  return caller.function({
    body: JSON.stringify(caller.params),
    ...eventData
  });
};

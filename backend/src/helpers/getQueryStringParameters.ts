import { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQueryStringParameters = (params?: APIGatewayProxyEventQueryStringParameters): any => params;

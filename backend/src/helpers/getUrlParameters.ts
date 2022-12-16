import { APIGatewayProxyEventPathParameters } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUrlParameters = (params?: APIGatewayProxyEventPathParameters): any => params;

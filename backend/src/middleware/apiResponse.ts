import { ApiHandler } from '@serverless-stack/node/api';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';
import { errorResponse, successResponse } from './responseTypes';
interface ValidationErrorItem {
  attribute: string;
  validationMessage: string;
}
export interface ValidationError {
  message: string;
  errors: ValidationErrorItem[];
}

export type MessageResponse = {
  message: string;
};

export type ErrorResponse = {
  error: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiResponse = (lambda: any) =>
  ApiHandler(async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    const data = await lambda(event, context);
    if (data.error) return errorResponse(data.error);
    return successResponse(data);
  });

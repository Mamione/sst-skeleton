/* eslint-disable @typescript-eslint/no-explicit-any */
export const unauthorizedResponse = () => ({
  statusCode: 401,
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify({ error: 'Unauthorized.' })
});

export const errorResponse = (body:any) => ({
  statusCode: 400,
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify({ error: body })
});

export const successResponse = (body: any) => ({
  statusCode: 200,
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(body)
});


import { StackContext, Table } from '@serverless-stack/resources';

export function StorageStack({ stack }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, 'table', {
    fields: {
      pk: 'string',
      sk: 'string',
      gsi1pk: 'string',
      gsi1sk: 'string',
      gsi2pk: 'string',
      gsi2sk: 'string',
      gsi3pk: 'string',
      gsi3sk: 'string'
    },
    primaryIndex: {
      partitionKey: 'pk',
      sortKey: 'sk'
    },
    globalIndexes: {
      gsi1: {
        partitionKey: 'gsi1pk',
        sortKey: 'gsi1sk'
      },
      gsi2: {
        partitionKey: 'gsi2pk',
        sortKey: 'gsi2sk'
      },
      gsi3: {
        partitionKey: 'gsi3pk',
        sortKey: 'gsi3sk'
      }
    }
  });

  return {
    table
  };
}

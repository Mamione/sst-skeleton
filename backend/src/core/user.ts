import { Entity, EntityItem } from 'electrodb';
import { v4 } from 'uuid';
import { Dynamo } from './dynamo';

// For more complex changes and migrations (like adding a new index)
// we scan and recreate the data doing manual ETL if needed.
// export async function handler() {
//   for (const appt of await AppointmentEntity.scan.go()) {
//     await AppointmentEntity.put(appt).go();
//   }
// }
export const UserEntity = new Entity(
  {
    model: {
      // Schema versions create new fields using the new schema.
      // We would create a new entity UserEntity2 with a version: '2',
      // the SK would change from $user_1 to $user_2.
      // If you use this approach you want to write to both while everything
      // is migrating temporarily since it copies everything from version 1 to 2.
      version: '1',
      entity: 'User',
      service: 'skeleton'
    },
    attributes: {
      userId: {
        type: 'string',
        required: true,
        readOnly: true,
        default: () => v4()
      },
      email: {
        type: 'string',
        required: true
      },
      providerId: {
        type: 'string',
        required: true
      },
      emailVerified: {
        type: 'boolean',
        required: true
      },
      fullName: {
        type: 'string',
        required: true
      },
      firstName: {
        type: 'string',
        required: true
      },
      lastName: {
        type: 'string',
        required: true
      },
      picture: {
        type: 'string',
        required: true,
        default: ''
      }
    },
    indexes: {
      userId: {
        collection: 'user',
        pk: {
          field: 'pk',
          composite: ['userId']
        },
        sk: {
          field: 'sk',
          composite: []
        }
      },
      email: {
        index: 'gsi1',
        pk: {
          field: 'gsi1pk',
          composite: ['email']
        },
        sk: {
          field: 'gsi1sk',
          composite: []
        }
      }
    }
  },
  Dynamo.Configuration
);

export type UserEntityType = EntityItem<typeof UserEntity>;

export type UserCollectionType = { user: UserEntityType[]; userRole: UserRoleEntityType[] };

// We have to manually migrate for any changes even if we add a default.
// We could use workers to run many at the same time but it'll be more costly.
// This can be done on a lambda function.
// async function handler() {
//   for (const user of await UserEntity.scan.go()) {
//     UserEntity.update({
//       userId: user.userId
//     }).data((attr, op) => {
//       op.set(attr.picture, '');
//     });
//   }
// }

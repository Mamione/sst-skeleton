import { UserEntityType } from '@/core/user';
import { userFactory } from '@/factories/userFactory';
import { lambdaCaller } from '@/helpers/lambdaCaller';
import { beforeAll, describe, expect, it } from 'vitest';
import { updateProfile } from './update';

describe("Update a user's profile", () => {
  const email = 'testing@test.io';
  let user: UserEntityType | null;

  beforeAll(async () => {
    user = await userFactory({ email }, true);
  });

  it('Updates a user profile', async () => {
    if (!user) throw new Error('The user was not found or created.');

    const response = await lambdaCaller({
      function: updateProfile,
      userId: user.userId,
      params: {
        firstName: 'Mauricio',
        lastName: 'Amione',
        fullName: 'Mauricio Amione'
      }
    });
    if (!response) throw new Error('Error updating the profile.');

    expect(response.message).toEqual('User profile updated.');
  });
});

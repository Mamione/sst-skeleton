import { UserEntityType } from '@/core/user';
import { userFactory } from '@/factories/userFactory';
import { lambdaCaller } from '@/helpers/lambdaCaller';
import { beforeAll, describe, expect, it } from 'vitest';
import { findUser } from './find';
import { getProfile } from './get';

describe('Get user profile', () => {
  const email = 'testing@test.io';
  let user: UserEntityType | null;

  beforeAll(async () => {
    user = await userFactory({ email }, true);
  });

  it("gets a user's profile using their ID", async () => {
    if (!user) throw new Error('The user was not found or created.');

    const response = await getProfile(user.userId);
    if (!response) throw new Error('Error retrieving the profile.');

    expect(response.user[0].email).toEqual(email);
  });

  it('gets a user using their email', async () => {
    if (!user) throw new Error('The user was not found or created.');

    const response = await lambdaCaller({
      function: findUser,
      userId: user.userId,
      params: {
        email
      }
    });
    if (!response) throw new Error('Error retrieving the profile.');

    expect(response.email).toEqual(email);
  });
});

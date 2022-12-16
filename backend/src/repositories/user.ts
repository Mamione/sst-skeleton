import { YourService } from '@/core/yourService';
import { UserCollectionType, UserEntityType } from '@/core/user';
import logger from '@/helpers/logger';

export default class UserRepository {
  async findOrCreate(user: Omit<UserEntityType, 'userId'>): Promise<UserEntityType | null> {
    try {
      const exists = await YourService.entities.user.query
        .email({
          email: user.email
        })
        .go();

      if (exists.data[0]) {
        // Update the user's picture
        await YourService.entities.user
          .update({
            userId: exists.data[0].userId
          })
          .set({
            picture: user.picture
          })
          .go();
        const result = await YourService.entities.user.query
          .email({
            email: user.email
          })
          .go();
        if (!result.data[0]) throw new Error('Failed to find the updated user.');
        return result.data[0];
      }

      const result = await YourService.entities.user
        .create({
          ...user
        })
        .go();

      return result.data;
    } catch (e) {
      logger(e);
      return null;
    }
  }

  async getProfile(userId: string): Promise<UserCollectionType | null> {
    try {
      const result = await YourService.collections.user({ userId }).go();
      return result.data ? result.data : null;
    } catch (e) {
      logger(e);
      return null;
    }
  }

  async updateProfile(userId: string, firstName?: string, lastName?: string, fullName?: string): Promise<boolean> {
    try {
      const profile = JSON.parse(JSON.stringify({ firstName, lastName, fullName }));
      const result = await YourService.entities.user.update({ userId }).set(profile).go();
      return result.data ? true : false;
    } catch (e) {
      logger(e);
      return false;
    }
  }

  async findByEmail(email: string): Promise<UserEntityType | null> {
    try {
      const result = await YourService.entities.user.query.email({ email }).go();
      return result.data[0] ? result.data[0] : null;
    } catch (e) {
      logger(e);
      return null;
    }
  }
}

import { Service } from 'electrodb';
import { UserEntity } from '../repositories/user';

// Alphabetical order
export const YourService = new Service({
  user: UserEntity
});

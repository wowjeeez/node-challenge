import { CreateUser } from './dto/create.dto';
import { format } from './formatter';
import { to } from '@nc/utils/async';
import { User } from './types';
import { generateUser, readUser } from './data/db-user';
import { InternalError, NotFound } from '@nc/utils/errors';

export async function getUserDetails(userId): Promise<User> {
  const [dbError, rawUser] = await to(readUser(userId));

  if (dbError) {
    throw InternalError('Error fetching data from the DB.');
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return format(rawUser);
}

export async function createUser(dto: CreateUser) {
  const final = await dto.generate();
  const [dbError] = await to(generateUser(final));

  if (dbError) {
    throw InternalError('Error writing data to the DB.');
  }
}

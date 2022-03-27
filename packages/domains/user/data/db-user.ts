import { database } from '@nc/utils/db';

export function readUser(userId) {
  return database().users.findFirst({
    where: {
      id: userId,
    },
  }).then((resp) => resp);
}

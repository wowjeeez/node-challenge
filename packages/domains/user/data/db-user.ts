import { database } from '@nc/utils/db';
export function readUser(userId) {
  return database().users.findFirst({
    where: {
      id: userId,
    },
    select: {
      first_name: true,
      last_name: true,
      company_name: true,
    },
  }).then((resp) => resp);
}

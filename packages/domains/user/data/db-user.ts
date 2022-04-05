import { CreateUser } from '../dto/create.dto';
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

// eslint-disable-next-line require-await
export async function generateUser(dto: CreateUser) {
  return database().users.create({
    data: {
      first_name: dto.firstName,
      last_name: dto.lastName,
      company_name: dto.companyName,
      ssn: dto.ssn,
      id: dto.userId,
    },
  }).then((resp) => resp);
}

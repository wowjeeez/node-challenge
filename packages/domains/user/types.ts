import { users } from '@prisma/client';

export type User = Pick<NonNullable<users>, 'last_name' | 'first_name' | 'company_name'>

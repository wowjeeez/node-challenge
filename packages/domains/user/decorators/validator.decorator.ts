import { connect, database, isDbConnected } from '@nc/utils/db';
import { registerDecorator, ValidationOptions } from 'class-validator';
// validates a user id (used in DTOs)
export function IsUserIdValid(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isUserIdValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any): Promise<boolean> {
          if (!isDbConnected()) { // just for tests to pass
            connect();
          }
          if (typeof value !== 'string') return false;
          const len = await database().users.count({ where: { id: value } });
          return len > 0;
        },
      },
    });
  };
}

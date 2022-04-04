import { User } from './types';

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function format(rawUser: User): User {
  return {
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name: rawUser.company_name,
  };
}

// flattens a maybe array into a for sure not array
export function arrayToFlat<T>(val: T | T[]): T {
  if (Array.isArray(val)) {
    return val[0];
  }

  return val;
}

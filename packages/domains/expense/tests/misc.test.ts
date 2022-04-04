import { capPageSize } from '../data/db-expenses';
import config from 'config';

describe('[Packages | Expense-domain | DB] Query factories', () => {
  test('should cap the page size at 50', () => {
    expect(capPageSize(config.pageSizeCap + 1)).toEqual(config.pageSizeCap);
  });
});
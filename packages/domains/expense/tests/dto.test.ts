import { FetchExpenses } from '../dto/get.dto';
import { to } from '@nc/utils/async';
import { transformAndValidate } from 'class-transformer-validator';

describe('[Packages | Expense-domain | DTO] Fetch DTO', () => {
  test('validation on Fetch should be successful', async () => {
    const query = {
      filterBy: 'date',
      filter: '2021-09-20|2021-09-22',
      userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474', // jeppe
      sortBy: 'date',
    };
    const [err, resp] = await to(transformAndValidate(FetchExpenses, query));
    expect(err).toBeNull();
    expect(resp).toBeInstanceOf(FetchExpenses);
  });

  test('validation on Fetch should not be successful', async () => {
    const query = {
      filterBy: 'date',
      filter: '2021-09-20|2021-09-22',
      sortBy: 'invalidfield',
      userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474c', // jeppe but with a c added
    };
    const [err, resp] = await to(transformAndValidate(FetchExpenses, query));
    expect(err).toBeDefined();
    expect(resp).not.toBeDefined();
  });
});

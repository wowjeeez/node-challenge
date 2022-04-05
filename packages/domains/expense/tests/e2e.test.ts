import { Api } from '../../../../test/acceptance/utils/api';

describe('[Packages | Expense-domain | E2E]', () => {
  test('should filter by merchant name, and find everything that has a c in it (case insensitive)', async () => {
    const res = await Api.get('/expenses/v1/get-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&filterBy=merchname&filter=c').expect(200);
    const passed = res.body.every(({ merchant_name }) => merchant_name.includes('c') || merchant_name.includes('C'));
    expect(passed).toEqual(true);
  });

  test('should filter by date and find everything between 2021 and 2021-09-20', async () => {
    const res = await Api.get('/expenses/v1/get-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&filterBy=date&filter=2021|2021-09-20').expect(200);
    expect(res.body).toHaveLength(1); // safe to leave hardcoded since there wont be any new transactions during that date interval
  });

  test('should order by merchant name (ascending)', async () => {
    const res = await Api.get('/expenses/v1/get-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&orderBy=merchname&ascending=1').expect(200);
    expect(res.body[0].merchant_name).toEqual('Cafe 22');
  });

  test('should paginate the resource, returning only 1', async () => {
    const res = await Api.get('/expenses/v1/get-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&pageSize=1').expect(200);
    expect(res.body).toHaveLength(1);
  });

  test('should add a transaction to jeppe', async () => {
    const res = await Api.post('/expenses/v1/add-expense').send({ userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474', currency: 'USD', merchantName: 'yourfuturecolleauge', amountInCents: 420 }).expect(200);
    expect(res.body).toHaveProperty('created');
  });
});

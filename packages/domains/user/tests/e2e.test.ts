import { Api } from '../../../../test/acceptance/utils/api';

describe('[Packages | User-domain | E2E]', () => {
  test('should fetch a user', async () => {
    const res = await Api.get('/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474').expect(200);
    expect(res.body).toEqual({ first_name: 'Jeppe', last_name: 'Rindom', company_name: 'pleo' });
  });

  test('should not fetch a user', async () => {
    const res = await Api.get('/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a475').expect(500);
    expect(res.body.status).toEqual(401);
  });

  test('should create a new user', async () => {
    const res = await Api.post('/user/v1/create-user').send({ firstName: 'Test', lastName: 'Agent 2', companyName: 'Fleo' }).expect(200);
    expect(res.body).toHaveProperty('created');
  });
});

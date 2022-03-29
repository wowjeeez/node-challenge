import { FetchUser } from '../dto/get.dto';
import { to } from '@nc/utils/async';
import { transformAndValidate } from 'class-transformer-validator';

describe('[Packages | User-domain | DTO] Fetch DTO', () => {
  test('validation on Fetch should be successful', async () => {
    const query = {
      userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474', // jeppe
    };
    const [err, resp] = await to(transformAndValidate(FetchUser, query));
    expect(err).toBeNull();
    expect(resp).toBeInstanceOf(FetchUser);
  });

  test('validation on Fetch should not be successful', async () => {
    const query = {
      userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474c', // jeppe but with a c added
    };
    const [err, resp] = await to(transformAndValidate(FetchUser, query));
    expect(err).toBeDefined();
    expect(resp).not.toBeDefined();
  });
});

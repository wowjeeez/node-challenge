import { Api } from '../utils/api';
import { hook } from '../../../server';
beforeAll(hook);

describe('Given that we have a healthy service', () => {
  describe('Healtcheck', () => {
    test('Healthcheck route should return positively', (done) => {
      Api.get('/healthcheck')
        .expect(200, done);
    });

    test('Readiness route should return positively', (done) => {
      Api.get('/readycheck')
        .expect(200, done);
    });
  });

  describe('Context', () => {
    test('Should return a unique request id in the headers', () => {
      return Api.get('/')
        .expect(404)
        .then((res) => {
          return expect(res.headers['x-request-id']).not.toBeNull();
        });
    });

    test('Should forward inbound request ids in the headers', () => {
      return Api.get('/')
        .set('x-request-id', 'abc')
        .expect(404)
        .then((res) => {
          return expect(res.headers['x-request-id']).toEqual('abc');
        });
    });
  });
});

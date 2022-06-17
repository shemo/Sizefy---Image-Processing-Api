import supertest from 'supertest';

import app from '../index';
//crete a request object
const request = supertest(app);

describe('test basic endpoint server', () => {
  it('get the endpoint', async () => {
    const response = await request.get('/');
    // console.log(response);
    expect(response.status).toBe(200);
  });
});

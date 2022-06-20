import supertest from 'supertest';
import app from '../../index';
import checkCached from '../../utilities/checkCached';
import resize from '../../utilities/resize';

describe('Test endpoints', () => {
  const request = supertest(app);

  it('should get the root endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('should get the image endpoint', async () => {
    const response = await request.get(
      '/image?name=icelandwaterfall.jpg&width=100&height=150'
    );
    expect(response.status).toBe(200);
  });
});

describe('Test checkCached function', () => {
  it('should be true when image name with same width & height found', async () => {
    const result = await checkCached('icelandwaterfall.jpg', 300, 250);
    expect(result).toBeTruthy();
  });

  it('should be false when image name is not found in cached image folder while width & height are right', async () => {
    const result = await checkCached('notFoundImageName.jpg', 100, 200);
    expect(result).toBe(false);
  });
  it('should be false when image name is found in cached image folder while width is not right', async () => {
    const result = await checkCached('icelandwaterfall.jpg', 200, 250);
    expect(result).toBe(false);
  });
  it('should be false when image name is found in cached image folder while height is not right', async () => {
    const result = await checkCached('icelandwaterfall.jpg', 300, 150);
    expect(result).toBe(false);
  });
});

describe('Test resize Function', () => {
  it('should return resized image object if image is not in cached image folder', async () => {
    const result = await resize('palmtunnel.jpg', 200, 500);
    expect(result).toEqual(
      jasmine.objectContaining({
        format: 'jpeg',
        width: 200,
        height: 500,
      })
    );
  });
});

import request from '../utils/ajax.js';

// const dataKeys = ['id', 'name', 'thumbnail', 'age', 'height', 'weight', 'hair_color', 'professions', 'friends'];

describe('API tests', () => {
  test('API endpoint should return an array', async () => {
    const {
      data: {
        data: { children },
      },
    } = await request('GET', 'top.json?limit=10');
    expect(Array.isArray(children)).toBe(true);
  });

  test('API endpoint should return an array with then items (Pagination)', async () => {
    const {
      data: {
        data: { children },
      },
    } = await request('GET', 'top.json?limit=10');
    expect(children).toHaveLength(10);
  });
});

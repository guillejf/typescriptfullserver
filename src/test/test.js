const request = require('supertest')('http://localhost:4000');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const generatePost = () => {
  return { title: faker.internet.userName(), body: faker.lorem.paragraph() };
};

describe('test all endpoint', () => {
  //GET
  describe('GET ALL', () => {
    it('deberia responder con status 200 y ser array', async () => {
      const res = await request.get('/api/post');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('array');
    });
  });
  //POST
  describe('POST ONE', () => {
    it('deberia incorporar un posteo nuevo', async () => {
      const post = generatePost();

      const res = await request.post('/api/post').send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('title', 'body', 'id');
      expect(post.title).to.eql(res.body.title);
      expect(post.body).to.eql(res.body.body);
    });
  });
});

const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');
const app = require('../app');
const blogs = require('../utils/sample_blogs');
const testUser = require('../utils/sample_user');

const api = supertest(app);
let token = null;

describe('api tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.create(testUser);
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
    token = (await api.post('/api/blog/login').send(testUser)).body.token;
  });

  test('get test', async () => {
    const response = await api.get('/api/blog');
    expect(response.body).toHaveLength(blogs.length);
  });

  test('id test', async () => {
    const response = await api.get('/api/blog');
    expect(response.body[0]._id).toBeDefined();
  });

  test('add blogs test', async () => {
    const testBlog = {
      title: "React Tests",
      url: "https://reactpatterns.com/",
      likes: 7,
    };
    const response = await api.post('/api/blog').send(testBlog).set('authorization', `Bearer ${token}`);
    const blog = await Blog.findById(response.body._id);
    expect(blog.title).toEqual('React Tests');
  });

  test('initialize empty likes to 0', async () => {
    const testBlog = {
      title: "React Tests",
      url: "https://reactpatterns.com/",
    };
    const response = await api.post('/api/blog').send(testBlog).set('authorization', `Bearer ${token}`);
    const blog = await Blog.findById(response.body._id);
    expect(blog.likes).toEqual(0);
  });

  test('missing url or title returns status 400', async () => {
    const testBlog = {
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    };
    let response = await api.post('/api/blog').send(testBlog).set('authorization', `Bearer ${token}`);
    expect(response.status).toEqual(400);
    const testBlog2 = {
      title: "React Tests",
      author: "Michael Chan",
      likes: 7,
    };
    response = await api.post('/api/blog').send(testBlog2).set('authorization', `Bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('delete test', async () => {
    await api.delete(`/api/blog/5a422a851b54a676234d17f7`).set('authorization', `Bearer ${token}`);
    const response = await Blog.findById('5a422a851b54a676234d17f7');
    expect(response).toBe(null);
  });

  test('update test', async () => {
    const testBlog = {
      _id: "5a422a851b54a676234d17f7",
      title: "React Test",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    };
    await api.put('/api/blog/5a422a851b54a676234d17f7').send(testBlog).set('authorization', `Bearer ${token}`);
    const response = await Blog.findById('5a422a851b54a676234d17f7');
    expect(response.title).toEqual('React Test');
  });

  test('missing token adding blog returns 401', async () => {
    const testBlog = {
      title: "React Tests",
      url: "https://reactpatterns.com/",
      likes: 7,
    };
    const response = await api.post('/api/blog').send(testBlog);
    expect(response.status).toEqual(401);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

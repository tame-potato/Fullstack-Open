const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
} = require('../utils/list_helper');

const blogs = [
  {
    title: 'Blog A',
    author: 'Author A',
    url: 'urlForBlogA',
    likes: 7,
  },
  {
    title: 'Blog B',
    author: 'Author B',
    url: 'urlForBlogB',
    likes: 30,
  },
  {
    title: 'Blog C',
    author: 'Author A',
    url: 'urlForBlogC',
    likes: 3,
  },
  {
    title: 'Blog D',
    author: 'Author A',
    url: 'urlForBlogD',
    likes: 2,
  },
];

describe('list helper tests', () => {
  test('dummy test', () => {
    const result = dummy(blogs);
    expect(result).toBe(blogs[0]);
  });
  test('totalLikes test', () => {
    const result = totalLikes(blogs);
    expect(result).toBe(42);
  });
  test('favoriteBlog test', () => {
    const result = favoriteBlog(blogs);
    expect(result).toBe(blogs[1].title);
  });
  test('mostLikes test', () => {
    const result = mostLikes(blogs);
    expect(result).toBe(blogs[1].author);
  });
  test('mostBlogs test', () => {
    const result = mostBlogs(blogs);
    expect(result).toBe(blogs[0].author);
  });
});

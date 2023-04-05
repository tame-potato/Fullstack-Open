const dummy = (blogs) => blogs[0];

const totalLikes = (blogs) => {
  const sum = blogs.reduce((runningSum, element) => runningSum + element.likes, 0);
  return sum;
};

const favoriteBlog = (blogs) => {
  let maxLikes = blogs[0];
  blogs.forEach((element) => {
    maxLikes = element.likes > maxLikes.likes ? element : maxLikes;
  });
  return maxLikes.title;
};

const mostLikes = (blogs) => {
  const authorLikes = new Map();
  let max = 0;
  let maxAuthor = '';

  blogs.forEach((element) => {
    const sumLikes = authorLikes.has(element.author)
      ? authorLikes.get(element.author) + element.likes
      : element.likes;
    authorLikes.set(element.author, sumLikes);
    if (sumLikes > max) {
      max = sumLikes;
      maxAuthor = element.author;
    }
  });

  return maxAuthor;
};

const mostBlogs = (blogs) => {
  const authorBlogs = new Map();
  let max = 0;
  let maxAuthor = '';

  blogs.forEach((element) => {
    const sumBlogs = authorBlogs.has(element.author)
      ? authorBlogs.get(element.author) + 1
      : 1;
    authorBlogs.set(element.author, sumBlogs);
    if (sumBlogs > max) {
      max = sumBlogs;
      maxAuthor = element.author;
    }
  });

  return maxAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};

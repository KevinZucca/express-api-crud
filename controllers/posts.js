const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

// get all posts or filtered
exports.index = async (req, res) => {
  const { search, published } = req.query;
  const posts = {};
  if (search) {
    posts.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
    ];
  }
  if (published == "true") {
    const publishedPosts = await prisma.post.findMany({
      where: {
        published: true,
      },
    });
    return res.json(publishedPosts);
  }
  const data = await prisma.post.findMany({
    where: posts,
  });
  return res.json(data);
};

// get single post from slug
exports.show = async (req, res) => {
  const data = await prisma.post.findUnique({
    where: {
      slug: req.params.slug,
    },
  });
  return res.json(data);
};

// create a new post
exports.create = async (req, res) => {
  const data = req.body;
  data.slug = kebabCase(data.title);
  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      image: data.image,
      content: data.content,
      published: data.published,
    },
  });
  res.json(newPost);
};

// edit a post
exports.update = async (req, res) => {
  const data = req.body;
  const updatedPost = await prisma.post.update({
    data: {
      title: data.title,
      slug: data.slug,
      image: data.image,
      content: data.content,
      published: data.published,
    },
    where: {
      slug: data.slug,
    },
  });
  res.json(updatedPost);
};

// delete a post
exports.destroy = async (req, res) => {
  await prisma.post.delete({
    where: {
      slug: req.params.slug,
    },
  });
  res.json("Post eliminato");
};

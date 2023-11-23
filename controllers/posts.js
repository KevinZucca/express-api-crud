const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

// get all posts
exports.index = async (req, res) => {
  const data = await prisma.post.findMany();
  return res.json(data);
};

// get single post from id
exports.show = async (req, res) => {
  const data = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
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

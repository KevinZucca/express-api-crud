const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.show = async (req, res) => {
  const data = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.json(data);
};

exports.index = async (req, res) => {
  const data = await prisma.post.findMany();
  return res.json(data);
};

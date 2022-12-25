import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";
import bcrypt from "bcrypt";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const body = JSON.parse(req.body);
  console.log(req.body);
  const { email, password } = req.body;
  const acc = await prisma.user.findFirst({
    where: {
      email: { equals: email },
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
    },
  });
  if (bcrypt.compareSync(password, acc?.password ?? "")) {
    res.status(200).json({ id: acc?.id, email: acc?.email, name: acc?.name });
    console.log({ id: acc?.id, email: acc?.email, name: acc?.name });
  } else {
    res.status(400).json(null);
  }
};

export default signup;

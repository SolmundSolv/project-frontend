import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";
import bcrypt from "bcrypt";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const { name, email, password } = body;
  const pass = bcrypt.hashSync(password, 10);
  const acc = await prisma.user
    .create({
      data: {
        name: name,
        email: email,
        password: pass,
      },
    })
    .catch((err) => {
      if (err.code === "P2002") {
        res.status(400).json(err.code);
      }
    });
  res.status(200).redirect("/");
};

export default signup;

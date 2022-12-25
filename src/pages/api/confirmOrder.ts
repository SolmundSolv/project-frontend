import type { inferProcedureOutput } from "@trpc/server";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import type { AppRouter } from "../../server/trpc/router/_app";

const confirmOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  let itemsList = "";
  req.body.items.map(
    (i: inferProcedureOutput<AppRouter["product"]["byId"]>, index: number) =>
      (itemsList += `${index + 1}. ${i?.name}\n`)
  );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "konradqxd@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: "prokop.k99@gmail.com",
    subject: `Message from ${req.body.company}: ${req.body.name} ${req.body.email}`,
    text: itemsList,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
};

export default confirmOrder;

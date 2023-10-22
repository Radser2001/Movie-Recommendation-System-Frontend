import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, username, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prismadb.user.create({
      data: {
        email,
        name: username,
        hashedPassword,
        image: "",
        emailVerfied: new Date(),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("hello");
    console.log(error);
    res.status(400).end();
  }
}

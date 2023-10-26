import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    // Extract the genre data from the request body
    const { user_id, genre } = req.body;

    // Validate the genre data if needed

    // Save the genres to the database
    const createdGenres = await prismadb.genre.create({
      data: {
        user_id,
        genre,
      },
    });

    return res.status(201).json(createdGenres);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
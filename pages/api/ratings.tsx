import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    // await serverAuth(req, res);

    // Extract the rating data from the request body
    const { user_id,movie_id, rating } = req.body;

    // Validate the rating data

    // Save the rating to the rating collection
    await prismadb.rating.create({
      data: {
        user_id,
        movie_id,
        rating
      }
    });

    return res.status(201).end(); // Return 201 Created status code if the rating is successfully added
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
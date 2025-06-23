// pages/api/tafseer.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tafseerId, surahNum, ayahNum } = req.query;

  try {
    const response = await fetch(`http://api.quran-tafseer.com/tafseer/${tafseerId}/${surahNum}/${ayahNum}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal server error in proxy." });
  }
}
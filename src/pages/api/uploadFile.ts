import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "../../utils/parse-form";

const uploadFile = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      url: string | string[];
    } | null;
    error: string | null;
  }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }
  // Just after the "Method Not Allowed" code
  try {
    const { files } = await parseForm(req);

    if (!files.media) {
      res.status(400).json({
        data: null,
        error: "No media file found",
      });
      return;
    }
    const file = files.media;
    const url = Array.isArray(file)
      ? file.map((f) => f.filepath)
      : file.filepath;

    res.status(200).json({
      data: {
        url,
      },
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default uploadFile;

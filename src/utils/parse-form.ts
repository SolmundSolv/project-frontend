import type { NextApiRequest } from "next";
import mime from "mime";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return await new Promise(async (resolve, reject) => {
        const uploadDir = "./public/img";

        try {
            await stat(uploadDir);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(e);
                reject(e);
                return;
            }
        }
        let filename = ""; //  To avoid duplicate upload
        const form = formidable({
            maxFiles: 2,
            maxFileSize: 2048 * 2048, // 4mb
            uploadDir,
            filename: (_name, _ext, part) => {
                if (filename !== "") {
                    return filename;
                }

                // const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                filename = `${_name || "unknown"}.${mime.getExtension(part.mimetype || "") || "unknown"}`;
                return filename;
            },
            filter: (part) => {
                return part.name === "media" && (part.mimetype?.includes("image") || false);
            },
        });

        form.parse(req, function (err, fields, files) {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

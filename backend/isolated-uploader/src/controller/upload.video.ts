import AWS from "../config/initAWS";
import { configKeys } from "../config/configKeys";
import { Request, Response } from "express";

export const uploadVidoController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { filename, chunkIndex, uploadId, userId } = req.body;
    console.log("userId: ", userId);
    const s3 = new AWS.S3({
      s3ForcePathStyle: true,
    });
    const bucketName = configKeys.AWS_BUCKET;
    const location = `${userId}/${filename}`;
    const partParams = {
      Bucket: bucketName,
      Key: location,
      UploadId: uploadId,
      PartNumber: parseInt(chunkIndex) + 1,
      Body: Buffer.from(req.file?.buffer as Buffer), // Buffer data is converted to arrya of numbers
    };

    const data = await s3.uploadPart(partParams).promise();
    console.log("data------- ", data);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error uploading chunk:", err);
    res.status(500).send("Chunk could not be uploaded");
  }
};

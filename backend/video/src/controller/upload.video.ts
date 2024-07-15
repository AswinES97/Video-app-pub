import path from "node:path";
import AWS from "../config/initAWS";
import { deleteUploader } from "../util/modifyCluster";
import { appyYaml } from "../util/modifyCluster";
import { generateValidK8sName } from "../util/generatek8sNames";
import { configKeys } from "../config/configKeys";
import { parseYaml } from "../util/yamlParser";
import { Request, Response } from "express";
import { BadRequestError } from "@ticket-common/common";
import {
  checkIfDeploymentExist,
  waitForDeploymentToStabilize,
} from "../util/deploymentCheks";
import { sequelize } from "../config/db";
import { User, Video } from "../model/user";

export const initializerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // // to Validate the generated name
    const dns1035Regex = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
    const validK8sName = generateValidK8sName(dns1035Regex);
    const namespace = "upload";

    if (await checkIfDeploymentExist(validK8sName, namespace)) {
      throw new BadRequestError("Already Uploading");
    } else {
      const { filename, user } = req.body;
      const bucketName = configKeys.AWS_BUCKET;
      const location = `${user.userId}/${filename}`;
      const createParams = {
        Bucket: bucketName,
        Key: location,
        ACL: "public-read",
        // ContentType: "video/*",
      };

      const s3 = new AWS.S3({
        s3ForcePathStyle: true,
      });

      const multipartParams = await s3
        .createMultipartUpload(createParams)
        .promise();
      const uploadId = multipartParams.UploadId;

      // todo :- spwan new process for spinning up the yaml file
      // send response asap without checking the deployment status
      // if you want to check the status of the deployment before sending the actual data,
      // create a new route specifically for that

      const kubeManifests = (await parseYaml(
        path.join(__dirname, "..", "uploader.yaml"),
        validK8sName,
      )) as Array<any>;

      await appyYaml(kubeManifests, namespace);

      const isDeploymentStable = await waitForDeploymentToStabilize(
        validK8sName,
        namespace,
      );
      if (isDeploymentStable === true) {
        setTimeout(() => {
          res.status(200).json({ uploadId, connectId: validK8sName });
        }, 15000);
      }
    }
  } catch (err) {
    console.error("Error initializing upload:", err);
    res.status(500).send("Upload initialization failed");
  }
};

export const uploadComplete = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    console.log("Completing Upload", req.body);
    const userId = req.body.userId; // remove from apigateway too
    const namespace = "upload";
    const validK8sName = req.body.connectId;
    const { filename, totalChunks, uploadId, title, description, author } =
      req.body;
    const location = `${userId}/${filename}`;
    const s3 = new AWS.S3({
      s3ForcePathStyle: true,
    });
    const completeParams: any = {
      Bucket: configKeys.AWS_BUCKET,
      Key: location,
      UploadId: uploadId,
    };

    // Listing parts using promise
    const data = await s3.listParts(completeParams).promise();
    // console.log(data);
    const parts = (data.Parts as Array<any>).map((part) => ({
      ETag: part.ETag,
      PartNumber: part.PartNumber,
    }));

    completeParams.MultipartUpload = {
      Parts: parts,
    };

    // Completing multipart upload using promise
    const uploadResult = await s3
      .completeMultipartUpload(completeParams)
      .promise();

    console.log("data----- ", uploadResult);

    await sequelize.sync({ alter: true });
    const user = await User.create({
      userId,
    });
    const video = await Video.create({
      videoUrl: uploadResult.Location,
      userId,
    });

    console.log("user data: ", user);
    console.log("video data: ", video);

    // TODO:
    // kafka event for transcoder
    res.status(200).json({ message: "Uploaded successfully!!!" });

    const kubeManifests = (await parseYaml(
      path.join(__dirname, "..", "uploader.yaml"),
      validK8sName,
    )) as Array<any>;
    deleteUploader(kubeManifests, namespace);
  } catch (error) {
    console.log("Error completing upload :", error);
    res.status(500).send("Upload completion failed");
  }
};

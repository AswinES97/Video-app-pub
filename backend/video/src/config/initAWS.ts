import { configKeys } from "./configKeys";
import AWS from "aws-sdk";

const initAWSConfig = () => {
  AWS.config.update({
    accessKeyId: configKeys.AWS_ACCESS_KEY_ID,
    secretAccessKey: configKeys.AWS_SECRET_ACCESS_KEY,
    region: configKeys.AWS_REGION,
  });
};

initAWSConfig();

export default AWS;

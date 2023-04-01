const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const {
  getSignedUrl,
} = require("@aws-sdk/s3-request-presigner");

const createPresignedUrlWithClient = async ({ region, bucket, key }) => {
  const client = new S3Client({ region });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

const generateSignS3URL = async (bucket, key) => {
  const REGION = "ap-southeast-1";
  const BUCKET = bucket;
  const KEY = key;

  try {

    const clientUrl = await createPresignedUrlWithClient({
      region: REGION,
      bucket: BUCKET,
      key: KEY,
    });

    console.log("Calling PUT using presigned URL without client");

    console.log("Calling PUT using presigned URL with client");
    return clientUrl;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { generateSignS3URL };

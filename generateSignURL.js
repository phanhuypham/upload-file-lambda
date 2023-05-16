const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
// const { fromIni } = require("@aws-sdk/credential-providers");
// const { HttpRequest } = require("@aws-sdk/protocol-http");
const {
  getSignedUrl,
  // S3RequestPresigner,
} = require("@aws-sdk/s3-request-presigner");
// const { parseUrl } = require("@aws-sdk/url-parser");
// const { formatUrl } = require("@aws-sdk/util-format-url");
// const { Hash } = require("@aws-sdk/hash-node");

// const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
//   const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
//   const presigner = new S3RequestPresigner({
//     credentials: fromIni(),
//     region,
//     sha256: Hash.bind(null, "sha256"),
//   });

//   const signedUrlObject = await presigner.presign(
//     new HttpRequest({ ...url, method: "PUT" })
//   );
//   return formatUrl(signedUrlObject);
// };

const createPresignedUrlWithClient = async ({ region, bucket, key }) => {
  const client = new S3Client({ region });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

const generateSignS3URL = async (bucket, key) => {
  const REGION = "ap-southeast-1";
  const BUCKET = bucket;
  const KEY = key;

  // There are two ways to generate a presigned URL.
  // 1. Use createPresignedUrl without the S3 client.
  // 2. Use getSignedUrl in conjunction with the S3 client and GetObjectCommand.
  try {
    const clientUrl = await createPresignedUrlWithClient({
      region: REGION,
      bucket: BUCKET,
      key: KEY,
    });

    // After you get the presigned URL, you can provide your own file
    return clientUrl;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { generateSignS3URL };

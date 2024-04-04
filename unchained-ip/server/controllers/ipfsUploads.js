const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../middlewares/multers3.js");

const uploadFileOnIpfs = async (filename) => {
  try {
    const responseData = {
      file: filename,
      url: `${"http://localhost:8080"}/${filename}`,
    };
    // If production retrieve file data to get the ipfs CID
    const commandGetObject = new GetObjectCommand({
      Bucket: "2bucket",
      Key: filename,
    });
    const response = await s3.send(commandGetObject);
    responseData.url = `ipfs://${response.Metadata?.cid}`;
    return { data: responseData };
  } catch (error) {
    throw new Error("Unable to upload on ipfs");
  }
};
module.exports = uploadFileOnIpfs;

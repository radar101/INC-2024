const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../middlewares/multers3.js");

const uploadFileOnIpfs = async (filename) => {
  try {
    console.log(filename);
    const responseData = {
      file: filename,
      url: `${"http://localhost:8000"}/${filename}`,
    };
    // If production retrieve file data to get the ipfs CID
    const commandGetObject = new GetObjectCommand({
      Bucket: "2bucket",
      Key: filename,
    });
    const response = await s3.send(commandGetObject);
    responseData.url = `ipfs://${response.Metadata?.cid}`;
    console.log(responseData.url);  
    return response.Metadata?.cid;
  } catch (error) {
    console.log("+++++++++++++++++++", error, "++++++++++++++++++");
    throw new Error("Unable to upload on ipfs");
  }
};
module.exports = uploadFileOnIpfs;

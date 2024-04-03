import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../middlewares/multers3.js"
import { FILE_SERVER_URL } from "../conf/conf.js";





export const uploadFileOnIpfs = async (filename) => {

  try {
    const responseData = {
      file: filename,
      url: `${FILE_SERVER_URL}/${filename}`,
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

}
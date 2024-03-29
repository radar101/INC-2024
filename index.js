import Arweave from "arweave";
import fs from "fs";

async function handler(req, res) {
  const imageData = fs.readFileSync("./map.png");
  const base64Image = imageData.toString("base64");

  const buf = Buffer.from(base64Image, "base64");

  const arweave = Arweave.init({
    host: "arweave.net",  // Use the testnet URL
    port: 443,
    protocol: "https",
    
});


  const arweaveKey = await arweave.wallets.generate();

  fs.writeFileSync("./arweave_wallet.json", JSON.stringify(arweaveKey));

  const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
  arweave.wallets.getBalance(arweaveWallet).then((balance) => {
    let winston = balance;
    let ar = arweave.ar.winstonToAr(balance);

    console.log(winston);
    //125213858712

    console.log(ar);
    //0.125213858712
});

  let transaction = await arweave.createTransaction({ data: buf }, arweaveKey);
  transaction.addTag("Content-Type", "image/png");
  await arweave.transactions.sign(transaction, arweaveKey);
  const response = await arweave.transactions.post(transaction);
  const status = await arweave.transactions.getStatus(transaction.id);
  console.log(response);
  console.log(
    `Completed transaction ${transaction.id} with status code ${status.status}!`
  );

  // #6 This is the tricky part, use the format below to get to the PNG url!
  console.log(`https://www.arweave.net/${transaction.id}?ext=png`)
}

handler();

// import { WarpFactory } from "warp-contracts";

// // Replace with your image file object
// const imageFile = fs.readFileSync("./map.png");

// async function uploadImage() {
//   // Create Warp connection to Arweave testnet
//   const warp = WarpFactory.forTestnet();

//   // Generate a temporary wallet for testing (don't use this in production)
//   const wallet = JSON.parse(fs.readFileSync("./testwallet.json", "utf-8"));

//   // Configure Warp to use the test wallet
//   warp.setProvider(wallet)

//   try {
//     // Upload the image to Arweave
//     const upload = await warp.uploader.upload(imageFile)

//     console.log("Image uploaded successfully! Transaction ID:", upload.id)
//     console.log(`Download URL:, https://arweave.net/${upload.id}`)

//   } catch (error) {
//     console.error("Error uploading image:", error)
//   }
// }

// uploadImage()
import { WarpFactory } from "warp-contracts";
import fs from "fs";
import { DeployPlugin } from "warp-contracts-plugin-deploy";

const environment = "testnet";
let warp;
warp = WarpFactory.forTestnet().use(new DeployPlugin());

async function configureWallet() {
  try {
    return JSON.parse(fs.readFileSync("../testwallet.json", "utf-8"));
  } catch (err) {
    const { jwk } = await warp.generateWallet();
    fs.writeFileSync("../testwallet.json", JSON.stringify(jwk));
    return jwk;
  }
}

export {
    configureWallet, warp
}

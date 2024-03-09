import { warp, configureWallet } from './configureWarpServer.js'
import { transactionId } from '../transactionid.js'
import { v4 as uuid } from 'uuid'

async function createPost() {
  let wallet = await configureWallet()
  const contract = warp.contract(transactionId).connect(wallet)
  await contract.writeInteraction({
    function: "uploadData",
    doc: {
      name: "Hi from first ",
      uid: uuid()
    }
  })
}

createPost()
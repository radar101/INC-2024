async function sendArweaveTransaction(arweave, key) {
    try {
        let transaction = await arweave.createTransaction({
            target: '1TqcWSkwEhRaj68XtuSOspZrc-IUvANwosTK9wmXnrk',
            quantity: arweave.ar.arToWinston('0.0005')
        }, key);
        
        // Sign the transaction with your key before posting
        await arweave.transactions.sign(transaction, key);
        
        // // Post the transaction
        const response = await arweave.transactions.post(transaction);
        console.log(response.data);
    } catch (error) {
        console.error('Error occurred while sending Arweave transaction:', error);
    }
}

module.exports = sendArweaveTransaction;

const express = require('express');
const axios = require('axios');
const crypto = require('crypto')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('message');
  res.json({'mewssage': 'ok'})
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

class Blockchain {
  constructor() {
    this.chain = []
    this.transactions = []
    this.createBlock(1, '0') // Genesis
    this.nodes = new Set()
  }

  createBlock(proof, previousHash) {
    const block = {
      index: this.chain.length + 1,
      timestamp: Date.now().toString(),
      proof,
      previousHash,
      transactions: this.transactions
    }
    this.transactions = []
    thiis.chain.push(block)
    return block
  }

  getPreviousBlock() {
    return this.chain[this.chain.length - 1]
  }

  proofOfWork(previousProof) {
    let newProof = 1
    let checkProof = false
    while (!checkProof) {
      const hashOperation = crypto.createHash('sha256').update(`${newProof**2 - previousProof**2}`).digest('hex')
      if (hashOperation.substring(0,4) === '0000') {
        checkProof = true
      } else {
        newProof++
      }
      return newProof
    }
  }

  hash(block) {
    const encodedBlock = JSON.stringify(block, null, 2)
    return crypto.createHash('sha256').update(encodedBlock).digest('hex')
  }

  isChainValid(chain) {
    let previousBlock = chain[0]
    let blockIndex = 1

    while(blockIndex < chain.length) {
      const currentBlock = chain[blockIndex]
      if (currentBlock.previousBlock !== this.hash(previousBlock)) {
        return false
      }

      const previousProof = previousBlock.proof
      const currentProof = currentBlock.proof
      const hashOperation = crypto.createHash('sha256').update(`${currentProof**2 - previousProof**2}`).digest('hex')
      if (hashOperation.substring(0, 4) !== '0000') {
        return false
      }
      previousBlock = currentBlock
      blockIndex++
    }
    return true
  }

  addTransaction(sender, receiver, amount) {
    this.transactions.push({ sender, receiver, amount })
    const previousBlock = this.getPreviousBlock()
    return previousBlock.index + 1
  }

  addNode(address) {
    const parsedUrl = new URL(address)
  }

}
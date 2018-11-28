/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()
const mnemonic =process.env.memonic
const rinkebyApi = process.env.rinkeby


module.exports = {
  networks:{
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
},
  rinkeby: {
    provider: function() {
      return new HDWalletProvider(mnemonic, rinkebyApi)
    },
    network_id: 3
  }
}
};

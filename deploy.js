const compiledFactory = require('./build/contracts/LeagueFactory.json')
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()

const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const mnemonic =process.env.memonic
const rinkebyApi = process.env.rinkeby

const provider = new HDWalletProvider( mnemonic, rinkebyApi );

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts(); //getting accounts
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)// deploy league factory
    .deploy({data: compiledFactory.bytecode})
    .send({from: accounts[0], gas: '1000000'})
   
    console.log('contract deployed to: ',  result.options.address)


}

deploy()
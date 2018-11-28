var LeagueFactory = artifacts.require("./LeagueFactory.sol");
const compiledFactory = require('../build/contracts/LeagueFactory.json')
let leagueJson = require('../build/contracts/League.json')


const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

contract('LeagueFactory', function(accounts) {
let factory;
let leagueAddress;
let league;
let leagueContract;
let createdCompetion;
  beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();
   
    factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

     await factory.methods.deployLeague().send({ //deploy league
       from: accounts[0],
       gas: '1000000'
     });
     [leagueAddress] = await factory.methods.GetAllLeagues().call();
    //create league   
     league = await new web3.eth.Contract(leagueJson.abi, leagueAddress);
     //create league
     await league.methods.createCompetition(10).send({
       from:accounts[0], 
       gas: '1000000', 
       value: web3.utils.toWei('20', 'ether')
      });

  



  })

  it("deploys factory and league", function(done) {
  assert.ok(factory.options.address) // check if league factory has address
  assert.ok(league.options.address) //check to see if league has address
    done();
  });
  it('sets caller as league manager ', async ()=>{
    const manager = await league.methods.manager().call()
    // console.log('what is in manager? ',manager)
    assert.equal(accounts[0], manager)// check if mamager == accounts[0]
  });
  it('creates a competions ', async()=>{
    createdCompetion = await league.methods.competitions(0).call()
    assert.ok(createdCompetion);
  })
  // it('allows player to join league', async()=>{
  //   await league.methods.joinCompetition(0).send({
  //     from: accounts[1],
  //     gas: '1000000'
  //   })
  //   createdCompetion = await league.methods.competitions().competitor(accounts[1]).call()
  // console.log(createdCompetion)

  // })
  it("pays legue winner", async()=>{
      await league.methods.joinCompetition(0).send({
      from: accounts[1],
      gas: '1000000'
    })

    await league.methods.awardWinner(0, accounts[1]).send({
      from: accounts[0],
      gas: '1000000'
    });
    let managerBal = await web3.eth.getBalance(accounts[0]);
    managerBal = web3.utils.fromWei(managerBal, 'ether')
    let balance = await web3.eth.getBalance(accounts[1]);
   balance = web3.utils.fromWei(balance, 'ether')
    console.log("manager balance ", managerBal)
    console.log('winner bal: ', balance)

  })
});

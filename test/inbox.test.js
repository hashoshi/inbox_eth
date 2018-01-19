const assert = require('assert'); //lib that helps makes assertions about tests i.e. x == y
const ganache = require('ganache-cli'); //establishes local testnet
const Web3 = require('web3'); //always upper case Web3 constructor
const { interface, bytecode } = require('../compile'); //imports bytecode in contract

//creates an instance of web3 and tells it to link to the local testnet/outside networks
const provider = ganache.provider();
const web3 = new Web3(provider);


//allows the variable to be global in file
let accounts;
let inbox;

beforeEach(async() => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //use an account to deploy the contract bytecode
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        //chain function deploy to deploy bytecode with arg string
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        //chain function send to instantiate the smart contract with the 
        //first account for up to 1m gas
        .send({ from: accounts[0], gas: '1000000' })


    //sets the provider for the inbox contract
    inbox.setProvider(provider);
});



describe('Inbox', () => {
    it('contract deployed', () => {
        //checks that the contract deployment returns an address string
        assert.ok(inbox.options.address);
    });

    it('has default message', async() => {
        //checks that the contract deployment has a default message
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });
});
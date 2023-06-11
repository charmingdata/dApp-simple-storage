const { expect } = require("chai");
const { ethers } = require("hardhat");

// differnece between 'before' and 'beforeEach': https://stackoverflow.com/a/21419208/8005777
before(async () => {
  accounts = await ethers.getSigners();
  owner = accounts[0].address;
  addr1 = accounts[1].address;

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy("What is new?"); // constructor argument
  contract = await simpleStorage.deployed();

  console.log(`contract's address: ${contract.address}`);
  console.log(`accounts[0]: ${owner}`);
  console.log(`accounts[1]: ${addr1}`);
});

describe("Simple Storage testing", function () {
  it("Should retrieve the initial sentence set by constructor when contract first deploys", async function () {
    expect(await contract.getSentence()).to.equal("What is new?");
  });

  it("Should retrieve the last sentence added but not the first", async function () {
    await contract.setSentence("This is the last sentence");
    expect(await contract.getSentence()).to.equal("This is the last sentence");
    expect(await contract.getSentence()).to.not.equal("What is new?");
  });

  it("Should have a valid contract address", async function () {
    expect(owner).to.not.be.undefined;
    expect(owner).to.not.be.null;
  });
});

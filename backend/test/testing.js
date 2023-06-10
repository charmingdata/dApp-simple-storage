const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Simple Storage", function () {
  let contract;
  let owner;
  let addr1;
  let addr2;

  async function deployedContractFixture() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy("What is new?");
    contract = await simpleStorage.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
    return { owner, addr1, addr2, contract };
  }

  // differnece between 'before' and 'beforeEach': https://stackoverflow.com/a/21419208/8005777
  before(async function () {
    const {
      contract: deployedContract,
      owner: contractOwner,
      addr1: address1,
      addr2: address2,
    } = await loadFixture(deployedContractFixture);
    contract = deployedContract;
    owner = contractOwner;
    addr1 = address1;
    addr2 = address2;
  });

  it("Should retrieve the initial sentence set by constructor when contract first deploys", async function () {
    expect(await contract.getSentence()).to.equal("What is new?");
  });

  it("Should retrieve the last sentence added to the blockchain", async function () {
    await contract.setSentence("This is the last sentence");
    expect(await contract.getSentence()).to.equal("This is the last sentence");
  });

  it("Should have a valid contract address", async function () {
    expect(owner).to.not.be.undefined;
    expect(owner).to.not.be.null;
  });
});
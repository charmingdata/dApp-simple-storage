const { ethers } = require("hardhat");

async function main() {
  const simpleStorageContract = await ethers.getContractFactory(
    "SimpleStorage"
  );

  // here we deploy the contract
  const deployedContract = await simpleStorageContract.deploy("Hello World!");

  // Wait for it to finish deploying
  await deployedContract.deployed();

  // print the address of the deployed contract
  console.log("SimpleStorage Contract Address:", deployedContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
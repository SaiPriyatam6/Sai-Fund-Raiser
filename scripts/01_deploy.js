const { ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const Donation = await ethers.getContractFactory("Donation", deployer);
  //Deploy the contract
  const donation = await Donation.deploy();
  console.log(
    "Donation contract deployed to:",
    donation.address,
    "by",
    deployer.address
  );

  //If we are running blockchain on localhost, we are just doing 3 sample fundings in the start
  if (developmentChains.includes(network.name)) {
    [signer1, signer2, signer3] = await ethers.getSigners();
    await signer1.sendTransaction({
      to: donation.address,
      value: ethers.utils.parseUnits("0.1", 18),
    });
    await signer2.sendTransaction({
      to: donation.address,
      value: ethers.utils.parseUnits("0.1", 18),
    });
    await signer3.sendTransaction({
      to: donation.address,
      value: ethers.utils.parseUnits("2", 18),
    });
  }
  const data = {
    address: donation.address,
    abi: JSON.parse(donation.interface.format("json")),
  };

  //This writes the ABI and address to the marketplace.json
  fs.writeFileSync(
    "./FundRaiser/src/DonatorDetails.json",
    JSON.stringify(data)
  );
}

// npx hardhat run --network localhost scripts/01_deploy.js

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Donation {
    address immutable i_owner;
    uint256 totalDonations;

    struct Donation {
        address donor;
        uint256 amount;
    }
    Donation donation;
    Donation[] donations;

    constructor() {
        //owner of the contract
        i_owner = msg.sender;
    }

    receive() external payable {
        //Creating a Donation object
        donation = Donation(msg.sender, msg.value);

        //Storing it.
        donations.push(donation);
        totalDonations += msg.value;

        //Redirecting the amount directly to the owner of the contract
        (bool callSuccess, ) = i_owner.call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    function getDonations() external view returns (Donation[] memory) {
        return donations;
    }

    function getTotalDonations() external view returns (uint256) {
        return totalDonations;
    }
}

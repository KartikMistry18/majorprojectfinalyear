// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 private campaignCount = 0;

    event CampaignCreated(uint256 indexed id, address owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 indexed id, address donor, uint256 amount);

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline should be in the future.");

        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;

        emit CampaignCreated(campaignCount, _owner, _title, _target, _deadline);

        campaignCount++;

        return campaignCount - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(_id < campaignCount, "Campaign does not exist");
        require(msg.value > 0, "Donation must be greater than zero");

        campaigns[_id].amountCollected += msg.value;
        campaigns[_id].donators.push(msg.sender);
        campaigns[_id].donations.push(msg.value);

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        require(_id < campaignCount, "Invalid campaign ID.");
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCount);

        for (uint256 i = 0; i < campaignCount; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }

    function getCampaign(uint256 _id) public view returns (
        address, string memory, string memory, uint256, uint256, uint256, address[] memory, uint256[] memory
    ) {
        require(_id < campaignCount, "Invalid campaign ID.");

        Campaign storage c = campaigns[_id];
        return (c.owner, c.title, c.description, c.target, c.deadline, c.amountCollected, c.donators, c.donations);
    }

    function numberofCampaigns() public view returns (uint256) {
        return campaignCount;
    }
}

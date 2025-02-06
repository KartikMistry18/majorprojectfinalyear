import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from "./contants";

// Use Alchemy Sepolia URL for RPC provider
const SEPOLIA_ALCHEMY_URL = "https://eth-sepolia.g.alchemy.com/v2/Lo87KWizL62fSIBcI43XrftyX8Q9Pdc7";

// Helper function to fetch contract instance
const fetchContract = (signerOrProvider) => {
    console.log("crowdfunding address : ", CrowdFundingAddress);
    console.log("crowdfunding ABI  : ", CrowdFundingABI);
    console.log("Signer  : ", signerOrProvider);

    return new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);
};

// Create Context
export const CrowdFundingContext = createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    // Function to create a campaign
    const createCampaign = async (campaign) => {
        try {
            const { title, description, amount, deadline } = campaign;
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);
            console.log("contract", contract)

            console.log("Connected account:", currentAccount);

            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.parseUnits(amount, 18), // ethers.utils.parseUnits(amount, 18) for v5
                new Date(deadline).getTime()
            );

            await transaction.wait();
            console.log("Campaign created successfully:", transaction);
        } catch (error) {
            console.error("Error creating campaign:", error);
        }
    };

    // Fetch all campaigns
    const getCampaigns = async () => {
        try {
            const provider = new ethers.JsonRpcProvider(SEPOLIA_ALCHEMY_URL);
            
            // Verify provider is connected
            const network = await provider.getNetwork();
            console.log("Connected to network:", network.name);
            console.log("Using contract address:", CrowdFundingAddress);
            
            // Check if the address is valid
            if (!ethers.isAddress(CrowdFundingAddress)) {
                throw new Error('Invalid contract address format');
            }

            // Get contract code
            const code = await provider.getCode(CrowdFundingAddress);
            console.log("Contract code at address:", code);

            if (code === '0x') {
                throw new Error(`No contract deployed at address ${CrowdFundingAddress}`);
            }

            const contract = fetchContract(provider);
            const campaigns = await contract.getCampaigns();
            
            console.log("Raw campaigns data:", campaigns);
            
            if (!Array.isArray(campaigns)) {
                console.log("Campaigns is not an array:", campaigns);
                return [];
            }

            return campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));
        } catch (error) {
            console.error("Detailed error in getCampaigns:");
            console.error("Error name:", error.name);
            console.error("Error message:", error.message);
            if (error.data) console.error("Error data:", error.data);
            return [];
        }
    };

    // Fetch campaigns of the current user
    const getUserCampaigns = async () => {
        try {
            const provider = new ethers.JsonRpcProvider(SEPOLIA_ALCHEMY_URL);
            const contract = fetchContract(provider);
            const allCampaigns = await contract.getCampaigns();

            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            const currentUser = accounts[0];

            const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === currentUser);

            return filteredCampaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));
        } catch (error) {
            console.error("Error fetching user campaigns:", error);
            return [];
        }
    };

    // Donate to a campaign
    const donate = async (pId, amount) => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.donateToCampaign(pId, {
                value: ethers.parseEther(amount), // ethers.utils.parseEther(amount) for v5
            });

            await transaction.wait();
            window.location.reload();
            return transaction;
        } catch (error) {
            console.error("Error donating:", error);
        }
    };

    // Fetch donations for a campaign
    const getDonations = async (pId) => {
        try {
            const provider = new ethers.JsonRpcProvider(SEPOLIA_ALCHEMY_URL);
            const contract = fetchContract(provider);
            const donations = await contract.getDonators(pId);
            const numberOfDonations = donations[0].length;

            return donations[0].map((donator, i) => ({
                donator,
                donations: ethers.formatEther(donations[1][i].toString()),
            }));
        } catch (error) {
            console.error("Error fetching donations:", error);
            return [];
        }
    };

    // Check if a wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                console.log("Install Metamask");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    // Connect wallet function
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                console.log("Install Metamask");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error while connecting wallet:", error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};

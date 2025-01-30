import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from "./contants";

// Helper function to fetch contract instance
const fetchContract = (signerOrProvider) => {
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
            const connection = await web3Modal.connect(); // Added `await`
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            console.log("Connected account:", currentAccount);

            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
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
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const campaigns = await contract.getCampaigns();

            return campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            return [];
        }
    };

    // Fetch campaigns of the current user
    const getUserCampaigns = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const allCampaigns = await contract.getCampaigns();

            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            const currentUser = accounts[0];

            const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === currentUser);

            return filteredCampaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
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
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.donateToCampaign(pId, {
                value: ethers.utils.parseEther(amount),
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
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const donations = await contract.getDonators(pId);
            const numberOfDonations = donations[0].length;

            return donations[0].map((donator, i) => ({
                donator,
                donations: ethers.utils.formatEther(donations[1][i].toString()),
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

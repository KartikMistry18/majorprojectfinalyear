
import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from "./contants";

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");


    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection); // Correct for v5
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        console.log("contract", contract);

        console.log("Connected account:", currentAccount);

        try {
            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, "ether"), // Correct for v5
                Math.floor(new Date(deadline).getTime() / 1000) // Convert to seconds
            );

            await transaction.wait();
            console.log("Campaign created successfully:", transaction);
        } catch (error) {
            console.error("Error creating campaign:", error);
        }
    };
    const getCampaigns = async () => {
        try {
            if (!window.ethereum) throw new Error("No Ethereum wallet found");
            const provider = new ethers.providers.JsonRpcProvider(); // Ensure correct provider usage
            const contract = fetchContract(provider); // Pass provider to fetchContract
            const campaigns = await contract.getCampaigns();


            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));

            return parsedCampaigns;
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            return []; // Return empty array in case of error
        }
    };

    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider(); // Correct provider for v5
        const contract = fetchContract(provider); // Pass provider to fetchContract

        try {
            const allCampaigns = await contract.getCampaigns();

            const accounts = await window.ethereum.request({ method: "eth_accounts" }); // Corrected syntax
            const currentUser = accounts[0];

            const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner.toLowerCase() === currentUser.toLowerCase()); // Compare dynamically

            const userData = filteredCampaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));

            return userData;
        } catch (error) {
            console.error("Error fetching user campaigns:", error);
            return []; // Return empty array in case of error
        }
    };
    const donate = async (pId, amount) => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection); // Corrected provider
            const signer = provider.getSigner(); // Corrected signer retrieval

            const contract = fetchContract(signer); // Pass signer

            const transaction = await contract.donateToCampaign(pId, {
                value: ethers.utils.parseEther(amount), // Convert amount to Wei
            });

            await transaction.wait(); // Wait for transaction confirmation

            console.log("Donation successful:", transaction);

            return transaction; // Return transaction details
        } catch (error) {
            console.error("Error donating:", error);
            return null; // Return null on failure
        }
    };
    const getDonations = async (pId) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(); // Use JsonRpcProvider if no user interaction is needed
            const contract = fetchContract(provider);

            const donations = await contract.getDonators(pId);
            const numberOfDonations = donations[0].length;
            const parsedDonations = [];

            for (let i = 0; i < numberOfDonations; i++) {
                parsedDonations.push({
                    donator: donations[0][i],
                    donation: ethers.utils.formatEther(donations[1][i].toString()),
                });
            }

            return parsedDonations;
        } catch (error) {
            console.error("Error fetching donations:", error);
            return []; // Return empty array on failure
        }
    };

    //Check if a wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                console.log("Install MetaMask");

                // Ensure setOpenError and setError exist before calling
                if (typeof setOpenError === "function" && typeof setError === "function") {
                    setOpenError(true);
                    setError("Install MetaMask");
                }

                return false; // Return false when MetaMask is not found
            }

            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
                console.log("Connected Account:", accounts[0]);
                return true; // Return true when wallet is connected
            } else {
                console.log("No account found");
                return false; // Return false when no accounts are found
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            return false; // Return false on error
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                console.log("Install MetaMask");

                // Ensure error handling if state setters exist
                if (typeof setOpenError === "function" && typeof setError === "function") {
                    setOpenError(true);
                    setError("Install MetaMask to connect your wallet.");
                }

                return false; // Return false if MetaMask is not found
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
                console.log("Wallet Connected:", accounts[0]);
                return true; // Return true if connection is successful
            } else {
                console.log("No accounts found");
                return false; // Return false if no accounts were returned
            }
        } catch (error) {
            console.error("Error while connecting wallet:", error);

            if (error.code === 4001) {
                // User rejected request
                console.log("User denied wallet connection.");
            }

            return false; // Return false if an error occurs
        }
        useEffect(() => {
            checkIfWalletConnected();
        }, []);
    }


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
                checkIfWalletConnected,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};


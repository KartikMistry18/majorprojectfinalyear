import React, { useState } from "react";

const Donation = () => {
    const [donors, setDonors] = useState([
        { id: 1, name: "Anonymous", address: "0x4F3a...9dE7" },
        { id: 2, name: "CryptoEnthusiast", address: "0x9A12...8B56" },
        { id: 3, name: "BlockchainGuru", address: "0x7B6C...3EFA" },
    ]);
    const [amount, setAmount] = useState("");

    const handleDonate = () => {
        if (amount.trim() === "") return;
        const newDonor = {
            id: donors.length + 1,
            name: "Anonymous Donor",
            address: `0x${Math.random().toString(16).substr(2, 6)}...${Math.random().toString(16).substr(2, 4)}`
        };
        setDonors([...donors, newDonor]);
        setAmount("");
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Support Our Decentralized Projects</h1>
            <p className="text-gray-600 text-center mb-4">Your contributions help us maintain and grow our decentralized ecosystem.</p>

            <div className="flex justify-center mb-6">
                <input
                    type="number"
                    placeholder="Enter donation amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="px-4 py-2 border rounded-l-md focus:outline-none"
                />
                <button
                    onClick={handleDonate}
                    className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-r-md">
                    Donate
                </button>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-4">Recent Donors</h2>
            <ul className="bg-gray-100 p-4 rounded-lg">
                {donors.map(donor => (
                    <li key={donor.id} className="p-2 border-b last:border-none">
                        <span className="font-semibold">{donor.name}</span> - <span className="text-gray-500">{donor.address}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Donation;

const Members = () => {
    const companies = [
        { id: 1, name: "Blockchain Innovators Ltd.", address: "0x1234abcd5678ef90" },
        { id: 2, name: "Decentralized Solutions Inc.", address: "0x9876dcba4321fe09" },
        { id: 3, name: "CryptoTech Enterprises", address: "0xabcd1234efgh5678" },
        { id: 4, name: "Smart Contracts Ltd.", address: "0x5678abcd1234ef90" },
        { id: 5, name: "SecureChain Systems", address: "0xef901234abcd5678" },
        { id: 6, name: "Kartik BlockChain Solutions", address: "0xef901234abcd5678" },
        { id: 7, name: "Kate BlockChain Company  ", address: "0xef901234abc232323" },
        { id: 8, name: "Priyanshu NFT Company  ", address: "0xef901234abc232323" }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Members</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {companies.map((company) => (
                    <div key={company.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
                        <p className="text-gray-600">Address: {company.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;

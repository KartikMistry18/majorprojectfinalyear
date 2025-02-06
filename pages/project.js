import React, { useState } from "react";

const projects = [
    {
        id: 1,
        title: "Decentralized Voting System",
        description: "A blockchain-based voting platform ensuring transparency and security.",
        details: "This project leverages blockchain technology to create a secure, immutable, and transparent voting process, reducing fraud and increasing voter trust.",
        image: "https://images.unsplash.com/photo-1599579524220-8e32e6e602d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVjZW50cmFsaXplZCUyMHZvdGluZyUyMHN5c3RlbXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 2,
        title: "NFT Marketplace",
        description: "A platform for users to mint, buy, and sell NFTs securely on the blockchain.",
        details: "The NFT Marketplace provides a decentralized environment for creators to tokenize digital assets, ensuring authenticity and ownership.",
        image: "https://images.unsplash.com/photo-1642525027649-00d7397a6d4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TkZUfGVufDB8fDB8fHww"
    },
    {
        id: 3,
        title: "Crypto Crowdfunding",
        description: "A decentralized crowdfunding application using smart contracts.",
        image: "https://media.istockphoto.com/id/1219719976/vector/tiny-male-and-female-characters-bring-golden-coins-to-huge-box-with-man-yelling-to-megaphone.jpg?s=612x612&w=0&k=20&c=fCJQnCJWmOfOBJdKURso9fbqd-CclaisqmjSrYb4-Vw="
    },
    {
        id: 4,
        title: "Supply Chain Management",
        description: "Tracking goods from source to destination using blockchain technology.",
        image: "https://plus.unsplash.com/premium_photo-1683120796013-f2f18451a907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VwcGx5JTIwY2hhaW58ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 5,
        title: "Smart Contract Auditing",
        description: "Ensuring security and reliability of blockchain smart contracts.",
        image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjBjb250cmFjdHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 6,
        title: "Decentralized Identity Management",
        description: "A blockchain-based identity verification system for enhanced privacy and security.",
        image: "https://imgs.search.brave.com/0ysndJU7u5HCXfLqCvTTOG5W_DHkS9Q779z7E2hHkes/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9vbmZp/ZG8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIzLzA2L1do/YXQtaXMtRGVjZW50/cmFsaXNlZC1JZGVu/dGl0eS0xNTAyeDgw/MC0xLmpwZw"
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Our Blockchain Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-lg">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white p-6 rounded-xl shadow-xl">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <button
                            className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded"
                            onClick={() => setSelectedProject(project)}
                        >
                            Learn More
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={() => setSelectedProject(null)}>&times;</button>
                        <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-48 object-cover rounded-md mb-4" />
                        <h2 className="text-xl font-semibold mb-2">{selectedProject.title}</h2>
                        <p className="text-gray-700">{selectedProject.details}</p>
                        <button className="mt-4 bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded" onClick={() => setSelectedProject(null)}>
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
import React, { useState } from "react";

const Hero = ({ titleData, createCampaign }) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });

  const createNewCampaign = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(campaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className="relative">
      <span className="coverLine"></span>
      <img
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt="Background"
      />
      <div className="relative bg-opacity-75 backgroundMain">
        <svg
          className="absolute inset-x-0 bottom text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
                Crypto King <br className="hidden md:block" /> CrowdFunding CK
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                cumque, autem corporis exercitationem ut dicta.
              </p>
              <a
                href="/"
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700 text-gray-200"
              >
                Learn More
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Campaign
                </h3>
                <form onSubmit={createNewCampaign}>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Title</label>
                    <input
                      type="text"
                      value={campaign.title}
                      onChange={(e) =>
                        setCampaign({ ...campaign, title: e.target.value })
                      }
                      placeholder="Title"
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded shadow-xl focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      Description
                    </label>
                    <input
                      type="text"
                      value={campaign.description}
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded shadow-xl focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      Target Amount
                    </label>
                    <input
                      type="number"
                      value={campaign.amount}
                      onChange={(e) =>
                        setCampaign({ ...campaign, amount: e.target.value })
                      }
                      placeholder="Amount"
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded shadow-xl focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Deadline</label>
                    <input
                      type="date"
                      value={campaign.deadline}
                      onChange={(e) =>
                        setCampaign({ ...campaign, deadline: e.target.value })
                      }
                      required
                      className="w-full h-12 px-4 border border-gray-300 rounded shadow-xl focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-12 px-6 font-medium tracking-wide text-purple-accent-700 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-800 focus:outline-none focus:shadow-outline"
                  >
                    Create Campaign
                  </button>
                  <p className="text-xs text-gray-600 sm:text-sm mt-2">
                    Create your campaign and raise funds
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

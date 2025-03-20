import React, { useContext, useEffect, useState } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Card, Hero, PopUp } from "../Components";

const Index = () => {
  const {
    titleData,
    getCampaigns,
    getUserCampaigns,
    createCampaign,
    donate,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);

  // Function to fetch all campaigns
  const fetchCampaigns = async () => {
    try {
      const allData = await getCampaigns();
      const userData = await getUserCampaigns();
      console.log("All Campaigns:", allData);
      console.log("User Campaigns:", userData);
      setAllCampaigns(allData);
      setUserCampaigns(userData);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Modified createCampaign function to refetch data
  const handleCreateCampaign = async (campaignData) => {
    try {
      await createCampaign(campaignData);
      console.log("Campaign Created!");

      // Refetch campaigns after creating a new one
      fetchCampaigns();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <>
      <Hero titleData={titleData} createCampaign={handleCreateCampaign} />

      {/* Refresh Button for Debugging */}
      <button
        onClick={fetchCampaigns}
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Refresh Campaigns
      </button>

      <Card
        title="All Listed Campaigns"
        allCampaign={allCampaigns}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />

      <Card
        title="Your Created Campaigns"
        allCampaign={userCampaigns}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />

      {openModal && donateCampaign && (
        <PopUp
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default Index;

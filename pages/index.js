import React, { useContext, useEffect, useState } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Card, Hero, PopUp } from "../Components";

const index = () => {
  const { titleData, getCampaigns, currentAccount, createCampaign, donate, getUserCampaigns, getDonations } = useContext(CrowdFundingContext);

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();
        setAllCampaign(allData);
        setUserCampaign(userData);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };

    fetchCampaigns();
  }, [getCampaigns, getUserCampaigns]);  // Add dependencies to prevent infinite loop

  // donate Popup Modal
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();
  console.log(donateCampaign);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      <Card
        title="All listed Campaign"
        allCampaign={allCampaign}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />
      <Card
        title="Your Created Campaign"
        allCampaign={userCampaign}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />
      {openModal && (
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

export default index;

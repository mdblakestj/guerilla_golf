import uuid from "uuid";
import database from "../firebase/firebase";

//ADD_campaign
export const addCampaign = campaign => ({
  type: "ADD_CAMPAIGN",
  campaign
});

export const startAddCampaign = (campaignData = {}) => {
  return dispatch => {
    const {
      title = "",
      description = "",
      triggerNumber = 0,
      createdBy = "",
      createdAt = 0,
      members = [],
      imageURL = "",
      launched = false,
      emailList = ""
    } = campaignData;
    const campaign = {
      title,
      description,
      triggerNumber,
      createdAt,
      createdBy,
      members,
      imageURL,
      launched,
      emailList
    };
    database
      .ref("campaigns")
      .push(campaign)
      .then(ref => {
        dispatch(
          addCampaign({
            id: ref.key,
            ...campaign
          })
        );
      });
  };
};

//REMOVE
export const removeCampaign = ({ id } = {}) => ({
  type: "REMOVE_CAMPAIGN",
  id
});
//EDIT
export const editCampaign = (id, updates) => ({
  type: "EDIT_CAMPAIGN",
  id,
  updates
});

export const startEditCampaign = (id, updates) => {
  return dispatch => {
    return database
      .ref(`campaigns/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editCampaign(id, updates));
      });
  };
};

export const setCampaigns = campaign => ({
  type: "SET_CAMPAIGNS",
  campaign
});

export const startSetCampaigns = () => {
  return dispatch => {
    return database
      .ref("campaigns")
      .once("value")
      .then(snapshot => {
        const campaigns = [];
        snapshot.forEach(snapshotChild => {
          campaigns.push({
            id: snapshotChild.key,
            ...snapshotChild.val()
          });
        });
        dispatch(setCampaigns(campaigns));
      });
  };
};

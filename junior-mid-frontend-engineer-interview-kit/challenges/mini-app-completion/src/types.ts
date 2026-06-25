export type CampaignStatus = "active" | "paused" | "completed";

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
};
